from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.models import UserRole, CaseStatus, DocumentType

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: Optional[UserRole] = UserRole.CLIENT

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Case schemas
class CaseBase(BaseModel):
    name: str
    client_notes: Optional[str] = None

class CaseCreate(CaseBase):
    pass

class Case(CaseBase):
    id: int
    client_id: int
    status: CaseStatus
    operator_notes: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Document schemas
class DocumentBase(BaseModel):
    name: str
    type: DocumentType
    size: int

class DocumentCreate(DocumentBase):
    case_id: int
    url: str

class Document(DocumentBase):
    id: int
    case_id: int
    url: str
    uploaded_at: datetime

    class Config:
        from_attributes = True

# Analysis schemas
class AnalysisBase(BaseModel):
    content: str
    summary: str
    recommendations: str
    price: float

class AnalysisCreate(AnalysisBase):
    case_id: int

class Analysis(AnalysisBase):
    id: int
    case_id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Document Option schemas
class DocumentOptionBase(BaseModel):
    name: str
    description: str
    price: float
    estimated_time: str
    category: str

class DocumentOptionCreate(DocumentOptionBase):
    analysis_id: int

class DocumentOption(DocumentOptionBase):
    id: int
    analysis_id: int

    class Config:
        from_attributes = True

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None