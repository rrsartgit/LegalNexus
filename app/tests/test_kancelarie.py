from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db.base import Base
from app.db.session import get_db
from app.models.kancelaria import LawFirm, Specialization, law_firm_specializations
import pytest
import uuid

# Setup test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="module")
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def db_session(setup_database):
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        yield db_session
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()

def test_create_law_firm(client, db_session):
    # Create a specialization first
    spec_id = str(uuid.uuid4())
    specialization = Specialization(id=spec_id, name="Prawo Cywilne")
    db_session.add(specialization)
    db_session.commit()
    db_session.refresh(specialization)

    response = client.post(
        "/api/v1/law-firms/",
        json={
            "name": "Kancelaria Testowa",
            "address": "Testowa 1",
            "phone": "123456789",
            "email": "test@example.com",
            "website": "http://test.com",
            "description": "Opis testowy",
            "is_active": True,
            "specialization_ids": [spec_id]
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Kancelaria Testowa"
    assert data["email"] == "test@example.com"
    assert spec_id in data["specialization_ids"]

def test_read_law_firms(client, db_session):
    law_firm_id = str(uuid.uuid4())
    law_firm = LawFirm(id=law_firm_id, name="Kancelaria A", email="a@example.com")
    db_session.add(law_firm)
    db_session.commit()

    response = client.get("/api/v1/law-firms/")
    assert response.status_code == 200
    data = response.json()
    assert any(lf["name"] == "Kancelaria A" for lf in data)

def test_read_single_law_firm(client, db_session):
    law_firm_id = str(uuid.uuid4())
    law_firm = LawFirm(id=law_firm_id, name="Kancelaria B", email="b@example.com")
    db_session.add(law_firm)
    db_session.commit()

    response = client.get(f"/api/v1/law-firms/{law_firm_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Kancelaria B"

def test_update_law_firm(client, db_session):
    law_firm_id = str(uuid.uuid4())
    law_firm = LawFirm(id=law_firm_id, name="Kancelaria C", email="c@example.com")
    db_session.add(law_firm)
    db_session.commit()

    response = client.put(
        f"/api/v1/law-firms/{law_firm_id}",
        json={"name": "Kancelaria C Updated", "is_active": False},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Kancelaria C Updated"
    assert data["is_active"] == False

def test_delete_law_firm(client, db_session):
    law_firm_id = str(uuid.uuid4())
    law_firm = LawFirm(id=law_firm_id, name="Kancelaria D", email="d@example.com")
    db_session.add(law_firm)
    db_session.commit()

    response = client.delete(f"/api/v1/law-firms/{law_firm_id}")
    assert response.status_code == 204

    response = client.get(f"/api/v1/law-firms/{law_firm_id}")
    assert response.status_code == 404
