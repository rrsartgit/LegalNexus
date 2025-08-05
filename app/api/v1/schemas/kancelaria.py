from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class SpecializationBase(BaseModel):
    name: str

class SpecializationCreate(SpecializationBase):
    pass

class SpecializationResponse(SpecializationBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class LawFirmBase(BaseModel):
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    description: Optional[str] = None
    is_active: bool = True
    specialization_ids: List[str] = [] # For input/output of IDs

class LawFirmCreate(LawFirmBase):
    pass

class LawFirmUpdate(LawFirmBase):
    name: Optional[str] = None
    is_active: Optional[bool] = None
    specialization_ids: Optional[List[str]] = None

class LawFirmResponse(LawFirmBase):
    id: str
    created_at: datetime
    updated_at: datetime
    # specializations: List[SpecializationResponse] = [] # For detailed output if needed

    class Config:
        orm_mode = True
