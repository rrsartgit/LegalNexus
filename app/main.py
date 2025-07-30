from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import kancelarie, klienci, sprawy
from app.core.config import settings
from app.db.session import engine
from app.models import kancelaria

# Create database tables
kancelaria.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Kancelarii Prawnej",
    description="Kompleksowe rozwiązanie backendowe do zarządzania kancelariami prawnymi",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://preview-legal-api-nexus-project-*.vusercontent.net"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(kancelarie.router, prefix="/api/v1/kancelarie", tags=["kancelarie"])
app.include_router(klienci.router, prefix="/api/v1/klienci", tags=["klienci"])
app.include_router(sprawy.router, prefix="/api/v1/sprawy", tags=["sprawy"])

@app.get("/")
async def root():
    return {"message": "API Kancelarii Prawnej - v1.0.0", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}
