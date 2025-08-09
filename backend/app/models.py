from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Enum, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class UserRole(str, enum.Enum):
    CLIENT = "CLIENT"
    OPERATOR = "OPERATOR"
    ADMIN = "ADMIN"

class CaseStatus(str, enum.Enum):
    NEW = "NEW"
    ANALYZING = "ANALYZING"
    ANALYSIS_READY = "ANALYSIS_READY"
    DOCUMENTS_READY = "DOCUMENTS_READY"
    COMPLETED = "COMPLETED"

class DocumentType(str, enum.Enum):
    PDF = "PDF"
    IMAGE = "IMAGE"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.CLIENT)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    cases = relationship("Case", back_populates="client")

class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    client_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(Enum(CaseStatus), default=CaseStatus.NEW)
    client_notes = Column(Text, nullable=True)
    operator_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    client = relationship("User", back_populates="cases")
    documents = relationship("Document", back_populates="case")
    analysis = relationship("Analysis", back_populates="case", uselist=False)

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=False)
    name = Column(String, nullable=False)
    type = Column(Enum(DocumentType), nullable=False)
    url = Column(String, nullable=False)
    size = Column(Integer, nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    case = relationship("Case", back_populates="documents")

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=False)
    content = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)
    recommendations = Column(Text, nullable=False)  # JSON string
    price = Column(Float, nullable=False)
    status = Column(String, default="completed")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    case = relationship("Case", back_populates="analysis")
    document_options = relationship("DocumentOption", back_populates="analysis")

class DocumentOption(Base):
    __tablename__ = "document_options"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    estimated_time = Column(String, nullable=False)
    category = Column(String, nullable=False)
    
    # Relationships
    analysis = relationship("Analysis", back_populates="document_options")