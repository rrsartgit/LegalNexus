from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import aiofiles
import os
from pathlib import Path

from app.database import get_db
from app.models import Document, Case, User, UserRole, DocumentType
from app.schemas import DocumentCreate, Document as DocumentSchema
from app.auth import get_current_active_user

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/upload/{case_id}")
async def upload_document(
    case_id: int,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if case exists and user has permission
    result = await db.execute(select(Case).where(Case.id == case_id))
    case = result.scalar_one_or_none()
    
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    if current_user.role == UserRole.CLIENT and case.client_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to upload to this case")
    
    # Determine document type
    doc_type = DocumentType.PDF if file.content_type == "application/pdf" else DocumentType.IMAGE
    
    # Save file
    file_path = UPLOAD_DIR / f"{case_id}_{file.filename}"
    async with aiofiles.open(file_path, 'wb') as f:
        content = await file.read()
        await f.write(content)
    
    # Create document record
    db_document = Document(
        case_id=case_id,
        name=file.filename,
        type=doc_type,
        url=str(file_path),
        size=len(content)
    )
    db.add(db_document)
    await db.commit()
    await db.refresh(db_document)
    
    return {"message": "Document uploaded successfully", "document_id": db_document.id}

@router.get("/case/{case_id}", response_model=List[DocumentSchema])
async def get_case_documents(
    case_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check case permissions
    result = await db.execute(select(Case).where(Case.id == case_id))
    case = result.scalar_one_or_none()
    
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    if current_user.role == UserRole.CLIENT and case.client_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this case")
    
    # Get documents
    result = await db.execute(
        select(Document).where(Document.case_id == case_id)
    )
    documents = result.scalars().all()
    return documents