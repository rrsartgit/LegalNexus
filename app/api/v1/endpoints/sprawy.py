from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.services.kancelaria_service import KancelariaService
from app.api.v1.schemas.kancelaria import Sprawa, SprawaCreate, SprawaUpdate

router = APIRouter()

@router.post("/", response_model=Sprawa, status_code=status.HTTP_201_CREATED)
def create_sprawa(
    sprawa: SprawaCreate,
    db: Session = Depends(get_db)
):
    """Rejestruje nową sprawę."""
    service = KancelariaService(db)
    return service.create_sprawa(sprawa)

@router.get("/", response_model=List[Sprawa])
def get_sprawy(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Zwraca listę spraw z możliwością filtrowania."""
    service = KancelariaService(db)
    return service.get_sprawy(skip=skip, limit=limit)

@router.get("/{sprawa_id}", response_model=Sprawa)
def get_sprawa(
    sprawa_id: int,
    db: Session = Depends(get_db)
):
    """Pobiera szczegóły konkretnej sprawy."""
    service = KancelariaService(db)
    sprawa = service.get_sprawa(sprawa_id)
    if not sprawa:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sprawa nie została znaleziona"
        )
    return sprawa

@router.put("/{sprawa_id}", response_model=Sprawa)
def update_sprawa(
    sprawa_id: int,
    sprawa_update: SprawaUpdate,
    db: Session = Depends(get_db)
):
    """Aktualizuje status lub dane sprawy."""
    service = KancelariaService(db)
    sprawa = service.update_sprawa(sprawa_id, sprawa_update)
    if not sprawa:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sprawa nie została znaleziona"
        )
    return sprawa

@router.delete("/{sprawa_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sprawa(
    sprawa_id: int,
    db: Session = Depends(get_db)
):
    """Usuwa sprawę (archiwizuje)."""
    service = KancelariaService(db)
    if not service.delete_sprawa(sprawa_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sprawa nie została znaleziona"
        )
