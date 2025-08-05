from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.kancelaria import Kancelaria, Klient, Sprawa, LawFirm, Specialization
from app.api.v1.schemas.kancelaria import (
    KancelariaCreate, KancelariaUpdate,
    KlientCreate, KlientUpdate,
    SprawaCreate, SprawaUpdate,
    LawFirmCreate, LawFirmUpdate
)
import uuid

class KancelariaService:
    def __init__(self, db: Session):
        self.db = db
    
    # Kancelaria methods
    def create_kancelaria(self, kancelaria: KancelariaCreate) -> Kancelaria:
        db_kancelaria = Kancelaria(**kancelaria.dict())
        self.db.add(db_kancelaria)
        self.db.commit()
        self.db.refresh(db_kancelaria)
        return db_kancelaria
    
    def get_kancelaria(self, kancelaria_id: int) -> Optional[Kancelaria]:
        return self.db.query(Kancelaria).filter(Kancelaria.id == kancelaria_id).first()
    
    def get_kancelarie(self, skip: int = 0, limit: int = 100, aktywna: Optional[bool] = None) -> List[Kancelaria]:
        query = self.db.query(Kancelaria)
        if aktywna is not None:
            query = query.filter(Kancelaria.aktywna == aktywna)
        return query.offset(skip).limit(limit).all()
    
    def update_kancelaria(self, kancelaria_id: int, kancelaria_update: KancelariaUpdate) -> Optional[Kancelaria]:
        db_kancelaria = self.get_kancelaria(kancelaria_id)
        if db_kancelaria:
            update_data = kancelaria_update.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_kancelaria, field, value)
            self.db.commit()
            self.db.refresh(db_kancelaria)
        return db_kancelaria
    
    def delete_kancelaria(self, kancelaria_id: int) -> bool:
        db_kancelaria = self.get_kancelaria(kancelaria_id)
        if db_kancelaria:
            self.db.delete(db_kancelaria)
            self.db.commit()
            return True
        return False
    
    # Klient methods
    def create_klient(self, klient: KlientCreate) -> Klient:
        db_klient = Klient(**klient.dict())
        self.db.add(db_klient)
        self.db.commit()
        self.db.refresh(db_klient)
        return db_klient
    
    def get_klient(self, klient_id: int) -> Optional[Klient]:
        return self.db.query(Klient).filter(Klient.id == klient_id).first()
    
    def get_klienci(self, skip: int = 0, limit: int = 100, kancelaria_id: Optional[int] = None, aktywny: Optional[bool] = None) -> List[Klient]:
        query = self.db.query(Klient)
        if kancelaria_id:
            query = query.filter(Klient.kancelaria_id == kancelaria_id)
        if aktywny is not None:
            query = query.filter(Klient.aktywny == aktywny)
        return query.offset(skip).limit(limit).all()
    
    def update_klient(self, klient_id: int, klient_update: KlientUpdate) -> Optional[Klient]:
        db_klient = self.get_klient(klient_id)
        if db_klient:
            update_data = klient_update.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_klient, field, value)
            self.db.commit()
            self.db.refresh(db_klient)
        return db_klient
    
    def delete_klient(self, klient_id: int) -> bool:
        db_klient = self.get_klient(klient_id)
        if db_klient:
            self.db.delete(db_klient)
            self.db.commit()
            return True
        return False
    
    # Sprawa methods
    def create_sprawa(self, sprawa: SprawaCreate) -> Sprawa:
        db_sprawa = Sprawa(**sprawa.dict())
        self.db.add(db_sprawa)
        self.db.commit()
        self.db.refresh(db_sprawa)
        return db_sprawa
    
    def get_sprawa(self, sprawa_id: int) -> Optional[Sprawa]:
        return self.db.query(Sprawa).filter(Sprawa.id == sprawa_id).first()
    
    def get_sprawy(self, skip: int = 0, limit: int = 100, kancelaria_id: Optional[int] = None, klient_id: Optional[int] = None, status: Optional[str] = None) -> List[Sprawa]:
        query = self.db.query(Sprawa)
        if kancelaria_id:
            query = query.filter(Sprawa.kancelaria_id == kancelaria_id)
        if klient_id:
            query = query.filter(Sprawa.klient_id == klient_id)
        if status:
            query = query.filter(Sprawa.status == status)
        return query.offset(skip).limit(limit).all()
    
    def update_sprawa(self, sprawa_id: int, sprawa_update: SprawaUpdate) -> Optional[Sprawa]:
        db_sprawa = self.get_sprawa(sprawa_id)
        if db_sprawa:
            update_data = sprawa_update.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_sprawa, field, value)
            self.db.commit()
            self.db.refresh(db_sprawa)
        return db_sprawa
    
    def delete_sprawa(self, sprawa_id: int) -> bool:
        db_sprawa = self.get_sprawa(sprawa_id)
        if db_sprawa:
            self.db.delete(db_sprawa)
            self.db.commit()
            return True
        return False
    
    # Law Firm methods
    def get_law_firm_by_id(self, law_firm_id: str) -> Optional[LawFirm]:
        return self.db.query(LawFirm).filter(LawFirm.id == law_firm_id).first()

    def get_law_firms(self, skip: int = 0, limit: int = 100) -> List[LawFirm]:
        return self.db.query(LawFirm).offset(skip).limit(limit).all()

    def create_law_firm(self, law_firm: LawFirmCreate) -> LawFirm:
        db_law_firm = LawFirm(
            id=str(uuid.uuid4()), # Generate UUID for the ID
            name=law_firm.name,
            address=law_firm.address,
            phone=law_firm.phone,
            email=law_firm.email,
            website=law_firm.website,
            description=law_firm.description,
            is_active=law_firm.is_active
        )
        self.db.add(db_law_firm)
        self.db.commit()
        self.db.refresh(db_law_firm)

        # Add specializations
        for spec_id in law_firm.specialization_ids:
            specialization = self.db.query(Specialization).filter(Specialization.id == spec_id).first()
            if specialization:
                db_law_firm.specializations.append(specialization)
        self.db.commit()
        self.db.refresh(db_law_firm)
        return db_law_firm

    def update_law_firm(self, law_firm_id: str, law_firm: LawFirmUpdate) -> Optional[LawFirm]:
        db_law_firm = self.db.query(LawFirm).filter(LawFirm.id == law_firm_id).first()
        if db_law_firm:
            for key, value in law_firm.dict(exclude_unset=True).items():
                if key == "specialization_ids":
                    # Clear existing specializations and add new ones
                    db_law_firm.specializations.clear()
                    for spec_id in value:
                        specialization = self.db.query(Specialization).filter(Specialization.id == spec_id).first()
                        if specialization:
                            db_law_firm.specializations.append(specialization)
                else:
                    setattr(db_law_firm, key, value)
            self.db.commit()
            self.db.refresh(db_law_firm)
        return db_law_firm

    def delete_law_firm(self, law_firm_id: str) -> bool:
        db_law_firm = self.db.query(LawFirm).filter(LawFirm.id == law_firm_id).first()
        if db_law_firm:
            self.db.delete(db_law_firm)
            self.db.commit()
            return True
        return False
    
    # Statistics methods
    def get_stats(self) -> dict:
        total_kancelarie = self.db.query(Kancelaria).count()
        active_kancelarie = self.db.query(Kancelaria).filter(Kancelaria.aktywna == True).count()
        total_klienci = self.db.query(Klient).count()
        active_klienci = self.db.query(Klient).filter(Klient.aktywny == True).count()
        total_sprawy = self.db.query(Sprawa).count()
        active_sprawy = self.db.query(Sprawa).filter(Sprawa.status == "aktywna").count()
        total_law_firms = self.db.query(LawFirm).count()
        active_law_firms = self.db.query(LawFirm).filter(LawFirm.is_active == True).count()
        
        return {
            "kancelarie": {
                "total": total_kancelarie,
                "active": active_kancelarie
            },
            "klienci": {
                "total": total_klienci,
                "active": active_klienci
            },
            "sprawy": {
                "total": total_sprawy,
                "active": active_sprawy
            },
            "law_firms": {
                "total": total_law_firms,
                "active": active_law_firms
            }
        }
