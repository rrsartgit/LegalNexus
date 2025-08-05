from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.v1.schemas.cases import CaseCreate, CaseResponse, CaseUpdate
from app.models.case import Case

router = APIRouter()

@router.post("/", response_model=CaseResponse, status_code=status.HTTP_201_CREATED)
def create_case(case: CaseCreate, db: Session = Depends(get_db)):
    db_case = Case(**case.dict())
    db.add(db_case)
    db.commit()
    db.refresh(db_case)
    return db_case

@router.get("/", response_model=List[CaseResponse])
def get_cases(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cases = db.query(Case).offset(skip).limit(limit).all()
    return cases

@router.get("/{case_id}", response_model=CaseResponse)
def get_case(case_id: int, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()
    if case is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case not found")
    return case

@router.put("/{case_id}", response_model=CaseResponse)
def update_case(case_id: int, case: CaseUpdate, db: Session = Depends(get_db)):
    db_case = db.query(Case).filter(Case.id == case_id).first()
    if db_case is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case not found")
    for key, value in case.dict(exclude_unset=True).items():
        setattr(db_case, key, value)
    db.commit()
    db.refresh(db_case)
    return db_case

@router.delete("/{case_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_case(case_id: int, db: Session = Depends(get_db)):
    db_case = db.query(Case).filter(Case.id == case_id).first()
    if db_case is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case not found")
    db.delete(db_case)
    db.commit()
    return
