from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import json
import google.generativeai as genai
import os

from app.database import get_db
from app.models import Analysis, Case, User, UserRole, DocumentOption
from app.schemas import AnalysisCreate, Analysis as AnalysisSchema, DocumentOptionCreate
from app.auth import get_current_active_user

router = APIRouter()

# Configure Gemini AI
genai.configure(api_key=os.getenv("GOOGLE_GENERATIVE_AI_API_KEY"))

@router.post("/", response_model=AnalysisSchema)
async def create_analysis(
    analysis: AnalysisCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Only operators and admins can create analyses
    if current_user.role == UserRole.CLIENT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create analyses"
        )
    
    # Check if case exists
    result = await db.execute(select(Case).where(Case.id == analysis.case_id))
    case = result.scalar_one_or_none()
    
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    # Create analysis
    db_analysis = Analysis(
        case_id=analysis.case_id,
        content=analysis.content,
        summary=analysis.summary,
        recommendations=analysis.recommendations,
        price=analysis.price
    )
    db.add(db_analysis)
    await db.commit()
    await db.refresh(db_analysis)
    
    # Create default document options
    default_options = [
        {
            "name": "Sprzeciw od nakazu zapłaty",
            "description": "Profesjonalnie przygotowany sprzeciw z uzasadnieniem prawnym",
            "price": 89.0,
            "estimated_time": "24h",
            "category": "Pisma procesowe"
        },
        {
            "name": "Wniosek o rozłożenie na raty",
            "description": "Wniosek o rozłożenie należności na raty płatne",
            "price": 59.0,
            "estimated_time": "12h",
            "category": "Wnioski"
        }
    ]
    
    for option_data in default_options:
        db_option = DocumentOption(
            analysis_id=db_analysis.id,
            **option_data
        )
        db.add(db_option)
    
    await db.commit()
    return db_analysis

@router.get("/case/{case_id}", response_model=AnalysisSchema)
async def get_case_analysis(
    case_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check case permissions
    result = await db.execute(select(Case).where(Case.id == case_id))
    case = result.scalar_one_or_none()
    
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    if current_user.role == UserRole.CLIENT and case.client_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this case")
    
    # Get analysis
    result = await db.execute(
        select(Analysis).where(Analysis.case_id == case_id)
    )
    analysis = result.scalar_one_or_none()
    
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return analysis

@router.post("/generate/{case_id}")
async def generate_ai_analysis(
    case_id: int,
    question: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Only operators and admins can generate analyses
    if current_user.role == UserRole.CLIENT:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to generate analyses"
        )
    
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""
        Jesteś profesjonalnym prawnikiem specjalizującym się w prawie polskim.
        Przeanalizuj następujące pytanie prawne i udziel szczegółowej odpowiedzi:
        
        Pytanie: {question}
        
        Proszę o:
        1. Szczegółową analizę prawną
        2. Podsumowanie w 2-3 zdaniach
        3. Konkretne zalecenia działania
        4. Wskazanie możliwych pism do sporządzenia
        
        Odpowiedź powinna być profesjonalna i zgodna z polskim prawem.
        """
        
        response = model.generate_content(prompt)
        
        # Create analysis record
        db_analysis = Analysis(
            case_id=case_id,
            content=response.text,
            summary="Analiza wygenerowana przez AI - wymaga weryfikacji prawnika",
            recommendations=json.dumps([
                "Weryfikacja przez kwalifikowanego prawnika",
                "Analiza dokumentów sprawy",
                "Określenie strategii prawnej"
            ]),
            price=59.0
        )
        db.add(db_analysis)
        await db.commit()
        await db.refresh(db_analysis)
        
        return {
            "message": "Analysis generated successfully",
            "analysis_id": db_analysis.id,
            "content": response.text[:500] + "..." if len(response.text) > 500 else response.text
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating analysis: {str(e)}"
        )