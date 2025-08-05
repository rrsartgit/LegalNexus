from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db.base import Base
from app.db.session import get_db
from app.models.order import Order
from app.models.user import User
import pytest

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

def test_create_order(client, db_session):
    # Create a dummy client user
    client_user = User(id=1, email="client@example.com", password="hashedpassword", role="client")
    db_session.add(client_user)
    db_session.commit()
    db_session.refresh(client_user)

    response = client.post(
        "/api/v1/orders/",
        json={
            "client_id": client_user.id,
            "service_type": "Analiza Dokumentów",
            "status": "Nowe",
            "description": "Potrzebna analiza umowy najmu.",
            "price": 150.00,
            "currency": "PLN"
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["service_type"] == "Analiza Dokumentów"
    assert data["status"] == "Nowe"
    assert data["client_id"] == client_user.id

def test_read_orders(client, db_session):
    client_user = User(id=2, email="client2@example.com", password="hashedpassword", role="client")
    db_session.add(client_user)
    db_session.commit()
    db_session.refresh(client_user)

    order = Order(client_id=client_user.id, service_type="Konsultacja", status="W toku")
    db_session.add(order)
    db_session.commit()

    response = client.get("/api/v1/orders/")
    assert response.status_code == 200
    data = response.json()
    assert any(o["service_type"] == "Konsultacja" for o in data)

def test_read_single_order(client, db_session):
    client_user = User(id=3, email="client3@example.com", password="hashedpassword", role="client")
    db_session.add(client_user)
    db_session.commit()
    db_session.refresh(client_user)

    order = Order(client_id=client_user.id, service_type="Pismo Prawne", status="Zakończone")
    db_session.add(order)
    db_session.commit()

    response = client.get(f"/api/v1/orders/{order.id}")
    assert response.status_code == 200
    data = response.json()
    assert data["service_type"] == "Pismo Prawne"

def test_update_order(client, db_session):
    client_user = User(id=4, email="client4@example.com", password="hashedpassword", role="client")
    db_session.add(client_user)
    db_session.commit()
    db_session.refresh(client_user)

    order = Order(client_id=client_user.id, service_type="Reprezentacja", status="Oczekujące")
    db_session.add(order)
    db_session.commit()

    response = client.put(
        f"/api/v1/orders/{order.id}",
        json={"status": "W realizacji", "price": 200.00},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "W realizacji"
    assert data["price"] == 200.00

def test_delete_order(client, db_session):
    client_user = User(id=5, email="client5@example.com", password="hashedpassword", role="client")
    db_session.add(client_user)
    db_session.commit()
    db_session.refresh(client_user)

    order = Order(client_id=client_user.id, service_type="Inne", status="Anulowane")
    db_session.add(order)
    db_session.commit()

    response = client.delete(f"/api/v1/orders/{order.id}")
    assert response.status_code == 204

    response = client.get(f"/api/v1/orders/{order.id}")
    assert response.status_code == 404
