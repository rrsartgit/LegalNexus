from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from decimal import Decimal

# Kancelaria schemas
class KancelariaBase(BaseModel):
    nazwa: str
    adres: Optional[str] = None
    telefon: Optional[str] = None
    email: Optional[EmailStr] = None
    nip: Optional[str] = None
    regon: Optional[str] = None
    opis: Optional[str] = None
    aktywna: bool = True

class KancelariaCreate(KancelariaBase):
    pass

class KancelariaUpdate(BaseModel):
    nazwa: Optional[str] = None
    adres: Optional[str] = None
    telefon: Optional[str] = None
    email: Optional[EmailStr] = None
    nip: Optional[str] = None
    regon: Optional[str] = None
    opis: Optional[str] = None
    aktywna: Optional[bool] = None

class Kancelaria(KancelariaBase):
    id: int
    data_utworzenia: datetime
    data_aktualizacji: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Klient schemas
class KlientBase(BaseModel):
    imie: str
    nazwisko: str
    email: Optional[EmailStr] = None
    telefon: Optional[str] = None
    adres: Optional[str] = None
    pesel: Optional[str] = None
    nip: Optional[str] = None
    typ_klienta: str = "osoba_fizyczna"
    aktywny: bool = True

class KlientCreate(KlientBase):
    kancelaria_id: int

class KlientUpdate(BaseModel):
    imie: Optional[str] = None
    nazwisko: Optional[str] = None
    email: Optional[EmailStr] = None
    telefon: Optional[str] = None
    adres: Optional[str] = None
    pesel: Optional[str] = None
    nip: Optional[str] = None
    typ_klienta: Optional[str] = None
    aktywny: Optional[bool] = None

class Klient(KlientBase):
    id: int
    kancelaria_id: int
    data_utworzenia: datetime
    data_aktualizacji: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Sprawa schemas
class SprawaBase(BaseModel):
    numer_sprawy: str
    tytul: str
    opis: Optional[str] = None
    kategoria: Optional[str] = None
    status: str = "aktywna"
    wartosc_sprawy: Optional[Decimal] = None

class SprawaCreate(SprawaBase):
    kancelaria_id: int
    klient_id: int

class SprawaUpdate(BaseModel):
    tytul: Optional[str] = None
    opis: Optional[str] = None
    kategoria: Optional[str] = None
    status: Optional[str] = None
    wartosc_sprawy: Optional[Decimal] = None
    data_zakonczenia: Optional[datetime] = None

class Sprawa(SprawaBase):
    id: int
    kancelaria_id: int
    klient_id: int
    data_rozpoczecia: datetime
    data_zakonczenia: Optional[datetime] = None
    data_utworzenia: datetime
    data_aktualizacji: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Response schemas with relationships
class KancelariaWithRelations(Kancelaria):
    klienci: List[Klient] = []
    sprawy: List[Sprawa] = []

class KlientWithRelations(Klient):
    kancelaria: Optional[Kancelaria] = None
    sprawy: List[Sprawa] = []

class SprawaWithRelations(Sprawa):
    kancelaria: Optional[Kancelaria] = None
    klient: Optional[Klient] = None
