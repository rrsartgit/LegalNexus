from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.kancelaria import Kancelaria, Klient, Sprawa
from app.api.v1.schemas.kancelaria import (
    KancelariaCreate, KancelariaUpdate,
    KlientCreate, KlientUpdate,
    SprawaCreate, SprawaUpdate
)

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
    
    # Statistics methods
    def get_stats(self) -> dict:
        total_kancelarie = self.db.query(Kancelaria).count()
        active_kancelarie = self.db.query(Kancelaria).filter(Kancelaria.aktywna == True).count()
        total_klienci = self.db.query(Klient).count()
        active_klienci = self.db.query(Klient).filter(Klient.aktywny == True).count()
        total_sprawy = self.db.query(Sprawa).count()
        active_sprawy = self.db.query(Sprawa).filter(Sprawa.status == "aktywna").count()
        
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
            }
        }
