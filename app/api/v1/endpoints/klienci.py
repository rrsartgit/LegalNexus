from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.services.kancelaria_service import KancelariaService
from app.api.v1.schemas.kancelaria import Klient, KlientCreate, KlientUpdate

router = APIRouter()

@router.post("/", response_model=Klient, status_code=status.HTTP_201_CREATED)
def create_klient(
    klient: KlientCreate,
    db: Session = Depends(get_db)
):
    """Dodaje nowego klienta."""
    service = KancelariaService(db)
    return service.create_klient(klient)

@router.get("/", response_model=List[Klient])
def get_klienci(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Zwraca listę wszystkich klientów."""
    service = KancelariaService(db)
    return service.get_klienci(skip=skip, limit=limit)

@router.get("/{klient_id}", response_model=Klient)
def get_klient(
    klient_id: int,
    db: Session = Depends(get_db)
):
    """Pobiera szczegóły konkretnego klienta."""
    service = KancelariaService(db)
    klient = service.get_klient(klient_id)
    if not klient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Klient nie został znaleziony"
        )
    return klient

@router.put("/{klient_id}", response_model=Klient)
def update_klient(
    klient_id: int,
    klient_update: KlientUpdate,
    db: Session = Depends(get_db)
):
    """Aktualizuje dane klienta."""
    service = KancelariaService(db)
    klient = service.update_klient(klient_id, klient_update)
    if not klient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Klient nie został znaleziony"
        )
    return klient

@router.delete("/{klient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_klient(
    klient_id: int,
    db: Session = Depends(get_db)
):
    """Usuwa klienta."""
    service = KancelariaService(db)
    if not service.delete_klient(klient_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Klient nie został znaleziony"
        )
