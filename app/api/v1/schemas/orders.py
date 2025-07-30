from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from decimal import Decimal
from app.models.base import OrderStatus
from app.api.v1.schemas.auth import User

class OrderBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: Optional[Decimal] = Decimal("0.00")

class OrderCreate(OrderBase):
    pass

class OrderUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[OrderStatus] = None
    operator_id: Optional[int] = None
    price: Optional[Decimal] = None
    estimated_completion_date: Optional[datetime] = None

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
    status: OrderStatus
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

class OrderList(BaseModel):
    id: int
    title: str
    status: OrderStatus
    price: Decimal
    created_at: datetime
    client: User
    operator: Optional[User] = None
    
    class Config:
        from_attributes = True
