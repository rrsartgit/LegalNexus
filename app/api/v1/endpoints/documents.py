import os
import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.session import get_db
from app.models.base import Document, Order, User, UserRole
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

def save_upload_file(upload_file: UploadFile, destination: str) -> None:
    try:
        with open(destination, "wb") as buffer:
            content = upload_file.file.read()
            buffer.write(content)
    finally:
        upload_file.file.close()

@router.post("/{order_id}/upload")
def upload_document(
    order_id: int,
    files: List[UploadFile] = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Wgrywa dokumenty do zlecenia."""
    # Sprawdź czy zlecenie istnieje
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Sprawdź uprawnienia
    if current_user.role == UserRole.CLIENT and order.client_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    uploaded_files = []
    
    for file in files:
        # Sprawdź rozmiar pliku
        if file.size and file.size > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File {file.filename} is too large"
            )
        
        # Sprawdź typ pliku
        file_extension = os.path.splitext(file.filename)[1].lower()
        if file_extension not in settings.ALLOWED_FILE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File type {file_extension} not allowed"
            )
        
        # Generuj unikalną nazwę pliku
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join("uploads", str(order_id), unique_filename)
        
        # Utwórz katalog jeśli nie istnieje
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        # Zapisz plik
        save_upload_file(file, file_path)
        
        # Zapisz informacje o pliku w bazie danych
        db_document = Document(
            order_id=order_id,
            uploaded_by=current_user.id,
            file_name=unique_filename,
            original_name=file.filename,
            file_path=file_path,
            file_size=file.size,
            mime_type=file.content_type
        )
        db.add(db_document)
        uploaded_files.append({
            "filename": file.filename,
            "size": file.size,
            "path": file_path
        })
    
    db.commit()
    
    return {
        "message": f"Successfully uploaded {len(uploaded_files)} files",
        "files": uploaded_files
    }

@router.get("/{order_id}/documents")
def get_order_documents(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Pobiera listę dokumentów dla zlecenia."""
    # Sprawdź czy zlecenie istnieje
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Sprawdź uprawnienia
    if current_user.role == UserRole.CLIENT and order.client_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    documents = db.query(Document).filter(Document.order_id == order_id).all()
    return documents

@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Usuwa dokument."""
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Sprawdź uprawnienia
    order = db.query(Order).filter(Order.id == document.order_id).first()
    if current_user.role == UserRole.CLIENT and order.client_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    # Usuń plik z dysku
    try:
        if os.path.exists(document.file_path):
            os.remove(document.file_path)
    except Exception as e:
        print(f"Error deleting file: {e}")
    
    # Usuń z bazy danych
    db.delete(document)
    db.commit()
    
    return {"message": "Document deleted successfully"}
