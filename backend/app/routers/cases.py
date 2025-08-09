from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models import Case, User, UserRole
from app.schemas import CaseCreate, Case as CaseSchema
from app.auth import get_current_active_user

router = APIRouter()

@router.post("/", response_model=CaseSchema)
async def create_case(
    case: CaseCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_case = Case(
        name=case.name,
        client_id=current_user.id,
        client_notes=case.client_notes
    )
    db.add(db_case)
    await db.commit()
    await db.refresh(db_case)
    return db_case

@router.get("/", response_model=List[CaseSchema])
async def get_cases(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    if current_user.role == UserRole.CLIENT:
        # Clients can only see their own cases
        result = await db.execute(
            select(Case).where(Case.client_id == current_user.id)
        )
    else:
        # Operators and admins can see all cases
        result = await db.execute(select(Case))
    
    cases = result.scalars().all()
    return cases

@router.get("/{case_id}", response_model=CaseSchema)
async def get_case(
    case_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    result = await db.execute(
        select(Case)
        .options(selectinload(Case.documents), selectinload(Case.analysis))
        .where(Case.id == case_id)
    )
    case = result.scalar_one_or_none()
    
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    # Check permissions
    if current_user.role == UserRole.CLIENT and case.client_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this case")
    
    return case