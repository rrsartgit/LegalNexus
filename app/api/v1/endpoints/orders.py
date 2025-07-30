from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.db.session import get_db
from app.models.base import Order, User, UserRole, OrderStatus
from app.api.v1.schemas.orders import OrderCreate, OrderUpdate, Order as OrderSchema, OrderList
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=OrderSchema, status_code=status.HTTP_201_CREATED)
def create_order(
    order: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Tworzy nowe zlecenie (tylko dla klientów)."""
    if current_user.role != UserRole.CLIENT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only clients can create orders"
        )
    
    db_order = Order(
        client_id=current_user.id,
        title=order.title,
        description=order.description,
        price=order.price or 0.00
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.get("/", response_model=List[OrderList])
def get_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: Optional[OrderStatus] = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Pobiera listę zleceń (klienci widzą tylko swoje, operatorzy wszystkie)."""
    query = db.query(Order)
    
    if current_user.role == UserRole.CLIENT:
        query = query.filter(Order.client_id == current_user.id)
    
    if status:
        query = query.filter(Order.status == status)
    
    orders = query.offset(skip).limit(limit).all()
    return orders

@router.get("/{order_id}", response_model=OrderSchema)
def get_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Pobiera szczegóły zlecenia."""
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
    
    return order

@router.put("/{order_id}", response_model=OrderSchema)
def update_order(
    order_id: int,
    order_update: OrderUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Aktualizuje zlecenie (operatorzy mogą zmieniać status i przypisanie)."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Sprawdź uprawnienia
    if current_user.role == UserRole.CLIENT:
        if order.client_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        # Klienci mogą edytować tylko podstawowe informacje
        if order_update.status or order_update.operator_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Clients cannot change status or operator"
            )
    
    # Aktualizuj pola
    update_data = order_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(order, field, value)
    
    db.commit()
    db.refresh(order)
    return order

@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Usuwa zlecenie (tylko właściciel lub operator)."""
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
    
    db.delete(order)
    db.commit()

@router.post("/{order_id}/assign")
def assign_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Przypisuje zlecenie do operatora."""
    if current_user.role not in [UserRole.OPERATOR, UserRole.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only operators can assign orders"
        )
    
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    if order.status != OrderStatus.NEW:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order is not in NEW status"
        )
    
    order.operator_id = current_user.id
    order.status = OrderStatus.IN_PROGRESS
    db.commit()
    db.refresh(order)
    
    return {"message": "Order assigned successfully", "order": order}

@router.get("/stats/dashboard")
def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Zwraca statystyki dla dashboardu."""
    if current_user.role == UserRole.CLIENT:
        # Statystyki dla klienta
        total_orders = db.query(Order).filter(Order.client_id == current_user.id).count()
        new_orders = db.query(Order).filter(
            Order.client_id == current_user.id,
            Order.status == OrderStatus.NEW
        ).count()
        in_progress = db.query(Order).filter(
            Order.client_id == current_user.id,
            Order.status == OrderStatus.IN_PROGRESS
        ).count()
        completed = db.query(Order).filter(
            Order.client_id == current_user.id,
            Order.status == OrderStatus.COMPLETED
        ).count()
        
        return {
            "total_orders": total_orders,
            "new_orders": new_orders,
            "in_progress": in_progress,
            "completed": completed
        }
    else:
        # Statystyki dla operatora/admina
        total_orders = db.query(Order).count()
        new_orders = db.query(Order).filter(Order.status == OrderStatus.NEW).count()
        in_progress = db.query(Order).filter(Order.status == OrderStatus.IN_PROGRESS).count()
        awaiting_payment = db.query(Order).filter(Order.status == OrderStatus.AWAITING_PAYMENT).count()
        completed = db.query(Order).filter(Order.status == OrderStatus.COMPLETED).count()
        
        my_orders = db.query(Order).filter(Order.operator_id == current_user.id).count()
        
        return {
            "total_orders": total_orders,
            "new_orders": new_orders,
            "in_progress": in_progress,
            "awaiting_payment": awaiting_payment,
            "completed": completed,
            "my_orders": my_orders
        }
