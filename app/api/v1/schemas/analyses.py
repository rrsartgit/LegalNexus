from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AnalysisBase(BaseModel):
    preview_content: Optional[str] = None
    full_content: str

class AnalysisCreate(AnalysisBase):
    order_id: int

class AnalysisUpdate(BaseModel):
    preview_content: Optional[str] = None
    full_content: Optional[str] = None

class Analysis(AnalysisBase):
    id: int
    order_id: int
    created_by: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class AnalysisPreview(BaseModel):
    id: int
    order_id: int
    preview_content: Optional[str] = None
    has_full_content: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
