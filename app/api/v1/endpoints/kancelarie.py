from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.services.kancelaria_service import KancelariaService
from app.api.v1.schemas.kancelaria import Kancelaria, KancelariaCreate, KancelariaUpdate

router = APIRouter()

@router.post("/", response_model=Kancelaria, status_code=status.HTTP_201_CREATED)
def create_kancelaria(
    kancelaria: KancelariaCreate,
    db: Session = Depends(get_db)
):
    """Tworzy nową kancelarię prawną."""
    service = KancelariaService(db)
    try:
        return service.create_kancelaria(kancelaria)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Błąd podczas tworzenia kancelarii: {str(e)}"
        )

@router.get("/", response_model=List[Kancelaria])
def get_kancelarie(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    aktywna: Optional[bool] = Query(None),
    db: Session = Depends(get_db)
):
    """Zwraca listę wszystkich kancelarii prawnych."""
    service = KancelariaService(db)
    return service.get_kancelarie(skip=skip, limit=limit, aktywna=aktywna)

@router.get("/{kancelaria_id}", response_model=Kancelaria)
def get_kancelaria(
    kancelaria_id: int,
    db: Session = Depends(get_db)
):
    """Pobiera szczegóły konkretnej kancelarii."""
    service = KancelariaService(db)
    kancelaria = service.get_kancelaria(kancelaria_id)
    if not kancelaria:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Kancelaria nie została znaleziona"
        )
    return kancelaria

@router.put("/{kancelaria_id}", response_model=Kancelaria)
def update_kancelaria(
    kancelaria_id: int,
    kancelaria_update: KancelariaUpdate,
    db: Session = Depends(get_db)
):
    """Aktualizuje dane kancelarii."""
    service = KancelariaService(db)
    kancelaria = service.update_kancelaria(kancelaria_id, kancelaria_update)
    if not kancelaria:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Kancelaria nie została znaleziona"
        )
    return kancelaria

@router.delete("/{kancelaria_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_kancelaria(
    kancelaria_id: int,
    db: Session = Depends(get_db)
):
    """Usuwa kancelarię."""
    service = KancelariaService(db)
    if not service.delete_kancelaria(kancelaria_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Kancelaria nie została znaleziona"
        )
