from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.v1.schemas.kancelaria import LawFirmCreate, LawFirmResponse, LawFirmUpdate
from app.models.kancelaria import LawFirm
from app.services.kancelaria_service import get_law_firm_by_id, get_law_firms, create_law_firm, update_law_firm, delete_law_firm

router = APIRouter()

@router.post("/", response_model=LawFirmResponse, status_code=status.HTTP_201_CREATED)
def create_law_firm_endpoint(law_firm: LawFirmCreate, db: Session = Depends(get_db)):
    return create_law_firm(db=db, law_firm=law_firm)

@router.get("/", response_model=List[LawFirmResponse])
def read_law_firms_endpoint(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    law_firms = get_law_firms(db, skip=skip, limit=limit)
    return law_firms

@router.get("/{law_firm_id}", response_model=LawFirmResponse)
def read_law_firm_endpoint(law_firm_id: int, db: Session = Depends(get_db)):
    db_law_firm = get_law_firm_by_id(db, law_firm_id)
    if db_law_firm is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="LawFirm not found")
    return db_law_firm

@router.put("/{law_firm_id}", response_model=LawFirmResponse)
def update_law_firm_endpoint(law_firm_id: int, law_firm: LawFirmUpdate, db: Session = Depends(get_db)):
    db_law_firm = update_law_firm(db, law_firm_id, law_firm)
    if db_law_firm is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="LawFirm not found")
    return db_law_firm

@router.delete("/{law_firm_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_law_firm_endpoint(law_firm_id: int, db: Session = Depends(get_db)):
    success = delete_law_firm(db, law_firm_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="LawFirm not found")
    return
