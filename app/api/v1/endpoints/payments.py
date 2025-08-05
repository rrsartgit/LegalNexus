from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from decimal import Decimal

from app.db.session import get_db
from app.models.base import Payment, Order, User, UserRole, OrderStatus, PaymentStatus
from app.api.v1.endpoints.auth import get_current_user
from app.api.v1.schemas.payments import PaymentCreate, PaymentResponse, PaymentUpdate

router = APIRouter()

@router.post("/{order_id}/create-payment-intent", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
def create_payment_intent(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Tworzy intencję płatności dla zlecenia."""
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
    
    # Sprawdź status zlecenia
    if order.status != OrderStatus.AWAITING_PAYMENT:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order is not ready for payment"
        )
    
    # Sprawdź czy płatność już istnieje
    existing_payment = db.query(Payment).filter(
        Payment.order_id == order_id,
        Payment.status.in_([PaymentStatus.PENDING, PaymentStatus.COMPLETED])
    ).first()
    
    if existing_payment:
        if existing_payment.status == PaymentStatus.COMPLETED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Order already paid"
            )
        return existing_payment
    
    # Utwórz nową płatność
    payment = Payment(
        order_id=order_id,
        amount=order.price,
        status=PaymentStatus.PENDING,
        payment_method="stripe"
    )
    db.add(payment)
    db.commit()
    db.refresh(payment)
    
    # W rzeczywistej aplikacji tutaj byłaby integracja ze Stripe
    # stripe_intent = stripe.PaymentIntent.create(
    #     amount=int(order.price * 100),  # Stripe używa centów
    #     currency='pln',
    #     metadata={'order_id': order_id, 'payment_id': payment.id}
    # )
    # payment.payment_gateway_charge_id = stripe_intent.id
    # db.commit()
    
    return payment

@router.post("/{payment_id}/confirm")
def confirm_payment(
    payment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Potwierdza płatność (mock - w rzeczywistości byłby webhook od Stripe)."""
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )
    
    order = db.query(Order).filter(Order.id == payment.order_id).first()
    
    # Sprawdź uprawnienia
    if current_user.role == UserRole.CLIENT and order.client_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    if payment.status == PaymentStatus.COMPLETED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment already completed"
        )
    
    # Potwierdź płatność
    payment.status = PaymentStatus.COMPLETED
    payment.payment_gateway_charge_id = f"mock_charge_{payment_id}"
    
    # Zmień status zlecenia na zakończone
    order.status = OrderStatus.COMPLETED
    
    db.commit()
    
    return {
        "message": "Payment confirmed successfully",
        "payment_id": payment.id,
        "order_id": order.id,
        "status": payment.status
    }

@router.get("/{order_id}/payments", response_model=List[PaymentResponse])
def get_order_payments(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Pobiera historię płatności dla zlecenia."""
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
    
    payments = db.query(Payment).filter(Payment.order_id == order_id).all()
    return payments

@router.get("/stats/revenue")
def get_revenue_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Pobiera statystyki przychodów (tylko dla operatorów/adminów)."""
    if current_user.role not in [UserRole.OPERATOR, UserRole.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    # Całkowity przychód
    total_revenue = db.query(Payment).filter(
        Payment.status == PaymentStatus.COMPLETED
    ).with_entities(Payment.amount).all()
    
    total = sum(payment.amount for payment in total_revenue)
    
    # Liczba opłaconych zleceń
    paid_orders = db.query(Payment).filter(
        Payment.status == PaymentStatus.COMPLETED
    ).count()
    
    # Oczekujące płatności
    pending_payments = db.query(Payment).filter(
        Payment.status == PaymentStatus.PENDING
    ).count()
    
    return {
        "total_revenue": float(total),
        "paid_orders": paid_orders,
        "pending_payments": pending_payments
    }

@router.post("/", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
def create_payment(payment: PaymentCreate, db: Session = Depends(get_db)):
    db_payment = Payment(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

@router.get("/", response_model=List[PaymentResponse])
def get_payments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    payments = db.query(Payment).offset(skip).limit(limit).all()
    return payments

@router.get("/{payment_id}", response_model=PaymentResponse)
def get_payment(payment_id: int, db: Session = Depends(get_db)):
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if payment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment not found")
    return payment

@router.put("/{payment_id}", response_model=PaymentResponse)
def update_payment(payment_id: int, payment: PaymentUpdate, db: Session = Depends(get_db)):
    db_payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if db_payment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment not found")
    for key, value in payment.dict(exclude_unset=True).items():
        setattr(db_payment, key, value)
    db.commit()
    db.refresh(db_payment)
    return db_payment

@router.delete("/{payment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_payment(payment_id: int, db: Session = Depends(get_db)):
    db_payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if db_payment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment not found")
    db.delete(db_payment)
    db.commit()
    return
