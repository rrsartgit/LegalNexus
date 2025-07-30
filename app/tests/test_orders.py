import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db.session import get_db, Base
from app.models.base import User, UserRole
from app.api.v1.endpoints.auth import get_password_hash

# Test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
def client():
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def test_user(client):
    # Create test user
    db = TestingSessionLocal()
    user = User(
        email="test@example.com",
        password_hash=get_password_hash("testpassword"),
        first_name="Test",
        last_name="User",
        role=UserRole.CLIENT
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    db.close()
    return user

@pytest.fixture
def auth_headers(client, test_user):
    # Login and get token
    response = client.post("/api/v1/auth/login", json={
        "email": "test@example.com",
        "password": "testpassword"
    })
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

def test_create_order(client, auth_headers):
    response = client.post(
        "/api/v1/orders/",
        json={
            "title": "Test Order",
            "description": "Test description",
            "price": 100.00
        },
        headers=auth_headers
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Order"
    assert data["status"] == "NEW"

def test_get_orders(client, auth_headers):
    # Create an order first
    client.post(
        "/api/v1/orders/",
        json={"title": "Test Order", "description": "Test description"},
        headers=auth_headers
    )
    
    response = client.get("/api/v1/orders/", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Test Order"

def test_get_order_by_id(client, auth_headers):
    # Create an order first
    create_response = client.post(
        "/api/v1/orders/",
        json={"title": "Test Order", "description": "Test description"},
        headers=auth_headers
    )
    order_id = create_response.json()["id"]
    
    response = client.get(f"/api/v1/orders/{order_id}", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Order"

def test_unauthorized_access(client):
    response = client.get("/api/v1/orders/")
    assert response.status_code == 401
