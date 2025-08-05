from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from decimal import Decimal
from app.models.base import OrderStatus
from app.api.v1.schemas.auth import User

class OrderBase(BaseModel):
    client_id: int
    service_type: str
    status: str
    description: Optional[str] = None
    assigned_to_user_id: Optional[int] = None
    assigned_to_law_firm_id: Optional[int] = None
    price: Optional[float] = None
    currency: Optional[str] = None

class OrderCreate(OrderBase):
    pass

class OrderUpdate(OrderBase):
    client_id: Optional[int] = None
    service_type: Optional[str] = None
    status: Optional[str] = None

class DocumentInfo(BaseModel):
    id: int
    file_name: str
    original_name: str
    file_size: Optional[int] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class OrderComment(BaseModel):
    id: int
    user_id: int
    content: str
    is_internal: bool
    created_at: datetime
    user: User
    
    class Config:
        from_attributes = True

class Order(OrderBase):
    id: int
    client_id: int
    operator_id: Optional[int] = None
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    estimated_completion_date: Optional[datetime] = None
    
    # Relationships
    client: User
    operator: Optional[User] = None
    documents: List[DocumentInfo] = []
    comments: List[OrderComment] = []
    
    class Config:
        from_attributes = True

class OrderResponse(OrderBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class OrderList(BaseModel):
    id: int
    title: str
    status: str
    price: Optional[float] = None
    created_at: datetime
    client: User
    operator: Optional[User] = None
    
    class Config:
        from_attributes = True
