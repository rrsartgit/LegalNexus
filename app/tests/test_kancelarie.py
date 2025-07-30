import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db.session import get_db, Base

# Test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_kancelaria():
    response = client.post(
        "/api/v1/kancelarie/",
        json={
            "nazwa": "Test Kancelaria",
            "adres": "ul. Testowa 1, Warszawa",
            "telefon": "123456789",
            "email": "test@kancelaria.pl",
            "nip": "1234567890"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["nazwa"] == "Test Kancelaria"
    assert data["email"] == "test@kancelaria.pl"

def test_get_kancelarie():
    response = client.get("/api/v1/kancelarie/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_get_kancelaria():
    # First create a kancelaria
    create_response = client.post(
        "/api/v1/kancelarie/",
        json={
            "nazwa": "Test Kancelaria 2",
            "email": "test2@kancelaria.pl"
        }
    )
    kancelaria_id = create_response.json()["id"]
    
    # Then get it
    response = client.get(f"/api/v1/kancelarie/{kancelaria_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["nazwa"] == "Test Kancelaria 2"

def test_update_kancelaria():
    # First create a kancelaria
    create_response = client.post(
        "/api/v1/kancelarie/",
        json={
            "nazwa": "Test Kancelaria 3",
            "email": "test3@kancelaria.pl"
        }
    )
    kancelaria_id = create_response.json()["id"]
    
    # Then update it
    response = client.put(
        f"/api/v1/kancelarie/{kancelaria_id}",
        json={"nazwa": "Updated Kancelaria"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["nazwa"] == "Updated Kancelaria"

def test_delete_kancelaria():
    # First create a kancelaria
    create_response = client.post(
        "/api/v1/kancelarie/",
        json={
            "nazwa": "Test Kancelaria 4",
            "email": "test4@kancelaria.pl"
        }
    )
    kancelaria_id = create_response.json()["id"]
    
    # Then delete it
    response = client.delete(f"/api/v1/kancelarie/{kancelaria_id}")
    assert response.status_code == 204
    
    # Verify it's deleted
    get_response = client.get(f"/api/v1/kancelarie/{kancelaria_id}")
    assert get_response.status_code == 404
