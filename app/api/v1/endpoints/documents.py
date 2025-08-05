from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.v1.schemas.documents import DocumentCreate, DocumentResponse, DocumentUpdate
from app.models.document import Document
import shutil
import os

router = APIRouter()

UPLOAD_DIRECTORY = "uploads"

@router.post("/", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def create_document(
    file: UploadFile = File(...),
    document_type: str = "",
    case_id: int = None,
    db: Session = Depends(get_db)
):
    if not os.path.exists(UPLOAD_DIRECTORY):
        os.makedirs(UPLOAD_DIRECTORY)
    
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    db_document = Document(
        filename=file.filename,
        filepath=file_location,
        document_type=document_type,
        case_id=case_id
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

@router.get("/", response_model=List[DocumentResponse])
def get_documents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    documents = db.query(Document).offset(skip).limit(limit).all()
    return documents

@router.get("/{document_id}", response_model=DocumentResponse)
def get_document(document_id: int, db: Session = Depends(get_db)):
    document = db.query(Document).filter(Document.id == document_id).first()
    if document is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    return document

@router.put("/{document_id}", response_model=DocumentResponse)
def update_document(document_id: int, document: DocumentUpdate, db: Session = Depends(get_db)):
    db_document = db.query(Document).filter(Document.id == document_id).first()
    if db_document is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    for key, value in document.dict(exclude_unset=True).items():
        setattr(db_document, key, value)
    db.commit()
    db.refresh(db_document)
    return db_document

@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(document_id: int, db: Session = Depends(get_db)):
    db_document = db.query(Document).filter(Document.id == document_id).first()
    if db_document is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    
    # Remove file from disk
    if os.path.exists(db_document.filepath):
        os.remove(db_document.filepath)
        
    db.delete(db_document)
    db.commit()
    return
