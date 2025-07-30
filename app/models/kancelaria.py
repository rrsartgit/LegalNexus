from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class Kancelaria(Base):
    __tablename__ = "kancelarie"
    
    id = Column(Integer, primary_key=True, index=True)
    nazwa = Column(String(255), nullable=False, index=True)
    adres = Column(Text)
    telefon = Column(String(20))
    email = Column(String(255), index=True)
    nip = Column(String(20), unique=True)
    regon = Column(String(20))
    opis = Column(Text)
    aktywna = Column(Boolean, default=True)
    data_utworzenia = Column(DateTime(timezone=True), server_default=func.now())
    data_aktualizacji = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    klienci = relationship("Klient", back_populates="kancelaria")
    sprawy = relationship("Sprawa", back_populates="kancelaria")

class Klient(Base):
    __tablename__ = "klienci"
    
    id = Column(Integer, primary_key=True, index=True)
    imie = Column(String(100), nullable=False)
    nazwisko = Column(String(100), nullable=False)
    email = Column(String(255), index=True)
    telefon = Column(String(20))
    adres = Column(Text)
    pesel = Column(String(11), unique=True)
    nip = Column(String(20))
    typ_klienta = Column(String(50), default="osoba_fizyczna")  # osoba_fizyczna, firma
    aktywny = Column(Boolean, default=True)
    data_utworzenia = Column(DateTime(timezone=True), server_default=func.now())
    data_aktualizacji = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Foreign keys
    kancelaria_id = Column(Integer, ForeignKey("kancelarie.id"))
    
    # Relationships
    kancelaria = relationship("Kancelaria", back_populates="klienci")
    sprawy = relationship("Sprawa", back_populates="klient")

class Sprawa(Base):
    __tablename__ = "sprawy"
    
    id = Column(Integer, primary_key=True, index=True)
    numer_sprawy = Column(String(50), unique=True, nullable=False)
    tytul = Column(String(255), nullable=False)
    opis = Column(Text)
    kategoria = Column(String(100))  # cywilna, karna, administracyjna, etc.
    status = Column(String(50), default="aktywna")  # aktywna, zawieszona, zakonczona
    data_rozpoczecia = Column(DateTime(timezone=True), server_default=func.now())
    data_zakonczenia = Column(DateTime(timezone=True))
    wartosc_sprawy = Column(Integer)  # w groszach
    data_utworzenia = Column(DateTime(timezone=True), server_default=func.now())
    data_aktualizacji = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Foreign keys
    kancelaria_id = Column(Integer, ForeignKey("kancelarie.id"))
    klient_id = Column(Integer, ForeignKey("klienci.id"))
    
    # Relationships
    kancelaria = relationship("Kancelaria", back_populates="sprawy")
    klient = relationship("Klient", back_populates="sprawy")
