from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.v1.endpoints import auth, orders, documents, analyses, payments, users
from app.core.config import settings
from app.db.session import engine
from app.models import base
import os

# Create database tables
base.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Platforma Analizy Dokumentów",
    description="System zarządzania zleceniami analizy dokumentów prawnych",
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

# Static files for uploaded documents
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(orders.router, prefix="/api/v1/orders", tags=["orders"])
app.include_router(documents.router, prefix="/api/v1/documents", tags=["documents"])
app.include_router(analyses.router, prefix="/api/v1/analyses", tags=["analyses"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["payments"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])

@app.get("/")
async def root():
    return {
        "message": "Platforma Analizy Dokumentów - v1.0.0", 
        "status": "running",
        "description": "System zarządzania zleceniami analizy dokumentów prawnych"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}
