from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.base import Analysis, Order, User, UserRole, OrderStatus
from app.api.v1.schemas.analyses import AnalysisCreate, AnalysisUpdate, Analysis as AnalysisSchema, AnalysisPreview, AnalysisResponse
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=AnalysisResponse, status_code=status.HTTP_201_CREATED)
def create_analysis(
    analysis: AnalysisCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Tworzy analizę dla zlecenia (tylko operatorzy)."""
    if current_user.role not in [UserRole.OPERATOR, UserRole.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only operators can create analyses"
        )
    
    # Sprawdź czy zlecenie istnieje
    order = db.query(Order).filter(Order.id == analysis.order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Sprawdź czy analiza już istnieje
    existing_analysis = db.query(Analysis).filter(Analysis.order_id == analysis.order_id).first()
    if existing_analysis:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Analysis already exists for this order"
        )
    
    # Utwórz analizę
    db_analysis = Analysis(**analysis.dict())
    db.add(db_analysis)
    
    # Zmień status zlecenia na "Gotowe do opłaty"
    order.status = OrderStatus.AWAITING_PAYMENT
    
    db.commit()
    db.refresh(db_analysis)
    return db_analysis

@router.get("/", response_model=List[AnalysisResponse])
def get_analyses(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Pobiera listę analiz (tylko operatorzy i administratorzy)."""
    if current_user.role not in [UserRole.OPERATOR, UserRole.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only operators and admins can view analyses"
        )
    
    analyses = db.query(Analysis).offset(skip).limit(limit).all()
    return analyses

@router.get("/{analysis_id}", response_model=AnalysisResponse)
def get_analysis(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Pobiera analizę (tylko operatorzy i administratorzy)."""
    if current_user.role not in [UserRole.OPERATOR, UserRole.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only operators and admins can view analyses"
        )
    
    analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()
    if analysis is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Analysis not found")
    return analysis

@router.put("/{analysis_id}", response_model=AnalysisResponse)
def update_analysis(
    analysis_id: int,
    analysis_update: AnalysisUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Aktualizuje analizę (tylko operatorzy)."""
    if current_user.role not in [UserRole.OPERATOR, UserRole.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only operators can update analyses"
        )
    
    db_analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()
    if db_analysis is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Analysis not found")
    
    # Aktualizuj pola
    update_data = analysis_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_analysis, field, value)
    
    db.commit()
    db.refresh(db_analysis)
    return db_analysis

@router.delete("/{analysis_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_analysis(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Usuwa analizę (tylko operatorzy)."""
    if current_user.role not in [UserRole.OPERATOR, UserRole.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only operators can delete analyses"
        )
    
    analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )
    
    db.delete(analysis)
    db.commit()
    return

@router.get("/{order_id}/preview", response_model=AnalysisPreview)
def get_analysis_preview(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Pobiera podgląd analizy (fragment publiczny)."""
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
    
    # Pobierz analizę
    analysis = db.query(Analysis).filter(Analysis.order_id == order_id).first()
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )
    
    return AnalysisPreview(
        id=analysis.id,
        order_id=analysis.order_id,
        preview_content=analysis.preview_content,
        has_full_content=bool(analysis.full_content),
        created_at=analysis.created_at
    )

@router.get("/{order_id}/full", response_model=AnalysisSchema)
def get_full_analysis(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Pobiera pełną analizę (tylko po opłaceniu lub dla operatorów)."""
    # Sprawdź czy zlecenie istnieje
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
        # Klient może zobaczyć pełną analizę tylko po opłaceniu
        if order.status != OrderStatus.COMPLETED:
            raise HTTPException(
                status_code=status.HTTP_402_PAYMENT_REQUIRED,
                detail="Payment required to access full analysis"
            )
    
    # Pobierz analizę
    analysis = db.query(Analysis).filter(Analysis.order_id == order_id).first()
    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )
    
    return analysis
