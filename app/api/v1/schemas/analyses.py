from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AnalysisBase(BaseModel):
    document_id: int
    analysis_type: str
    status: str
    result: Optional[str] = None
    assigned_to_user_id: Optional[int] = None
    assigned_to_law_firm_id: Optional[int] = None

class AnalysisCreate(AnalysisBase):
    pass

class AnalysisUpdate(AnalysisBase):
    document_id: Optional[int] = None
    analysis_type: Optional[str] = None
    status: Optional[str] = None

class AnalysisResponse(AnalysisBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
