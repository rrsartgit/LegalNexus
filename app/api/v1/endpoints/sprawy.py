from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
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
    try:
        return service.create_sprawa(sprawa)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Błąd podczas tworzenia sprawy: {str(e)}"
        )

@router.get("/", response_model=List[Sprawa])
def get_sprawy(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    kancelaria_id: Optional[int] = Query(None),
    klient_id: Optional[int] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """Zwraca listę spraw z możliwością filtrowania."""
    service = KancelariaService(db)
    return service.get_sprawy(
        skip=skip, 
        limit=limit, 
        kancelaria_id=kancelaria_id, 
        klient_id=klient_id, 
        status=status
    )

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

@router.get("/stats/summary")
def get_stats_summary(db: Session = Depends(get_db)):
    """Zwraca statystyki systemu."""
    service = KancelariaService(db)
    return service.get_stats()
