from fastapi import FastAPI
from app.api.v1.endpoints import users, kancelarie, orders, analyses, documents, payments, auth
from app.db.base import Base
from app.db.session import engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Legal API Nexus",
    description="API for managing legal services, users, law firms, orders, and documents.",
    version="1.0.0",
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(kancelarie.router, prefix="/api/v1/law-firms", tags=["law-firms"])
app.include_router(orders.router, prefix="/api/v1/orders", tags=["orders"])
app.include_router(analyses.router, prefix="/api/v1/analyses", tags=["analyses"])
app.include_router(documents.router, prefix="/api/v1/documents", tags=["documents"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["payments"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Legal API Nexus"}
