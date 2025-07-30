# API Kancelarii Prawnej

Kompleksowe rozwiązanie backendowe do zarządzania kancelariami prawnymi, zbudowane z użyciem FastAPI.

## Funkcjonalności

- ✅ **Zarządzanie kancelariami** - CRUD operations dla kancelarii prawnych
- ✅ **Zarządzanie klientami** - Rejestracja i zarządzanie klientami
- ✅ **Zarządzanie sprawami** - Prowadzenie spraw prawnych
- ✅ **Walidacja danych** - Automatyczna walidacja przy użyciu Pydantic
- ✅ **Dokumentacja API** - Automatyczna dokumentacja Swagger/OpenAPI
- ✅ **Testy jednostkowe** - Kompleksowe testowanie funkcjonalności
- ✅ **Baza danych** - SQLAlchemy ORM z SQLite/PostgreSQL

## Instalacja

### 1. Klonowanie repozytorium
\`\`\`bash
git clone <repository-url>
cd kancelaria
\`\`\`

### 2. Wirtualne środowisko
\`\`\`bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# lub
.\venv\Scripts\activate  # Windows
\`\`\`

### 3. Instalacja zależności
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 4. Konfiguracja środowiska
\`\`\`bash
cp .env.example .env
# Edytuj plik .env zgodnie z potrzebami
\`\`\`

### 5. Uruchomienie aplikacji
\`\`\`bash
uvicorn app.main:app --reload
\`\`\`

Aplikacja będzie dostępna pod adresem:
- API: http://127.0.0.1:8000
- Dokumentacja: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Struktura API

### Kancelarie (`/api/v1/kancelarie`)
- `POST /` - Tworzenie nowej kancelarii
- `GET /` - Lista wszystkich kancelarii
- `GET /{id}` - Szczegóły kancelarii
- `PUT /{id}` - Aktualizacja kancelarii
- `DELETE /{id}` - Usunięcie kancelarii

### Klienci (`/api/v1/klienci`)
- `POST /` - Dodawanie nowego klienta
- `GET /` - Lista wszystkich klientów
- `GET /{id}` - Szczegóły klienta
- `PUT /{id}` - Aktualizacja klienta
- `DELETE /{id}` - Usunięcie klienta

### Sprawy (`/api/v1/sprawy`)
- `POST /` - Rejestracja nowej sprawy
- `GET /` - Lista spraw (z filtrowaniem)
- `GET /{id}` - Szczegóły sprawy
- `PUT /{id}` - Aktualizacja sprawy
- `DELETE /{id}` - Usunięcie sprawy

## Testowanie

\`\`\`bash
pytest app/tests/ -v
\`\`\`

## Struktura projektu

\`\`\`
kancelaria/
├── app/
│   ├── api/v1/
│   │   ├── endpoints/     # Endpointy API
│   │   └── schemas/       # Schematy Pydantic
│   ├── core/             # Konfiguracja
│   ├── db/               # Baza danych
│   ├── models/           # Modele SQLAlchemy
│   ├── services/         # Logika biznesowa
│   ├── tests/            # Testy
│   └── main.py           # Główna aplikacja
├── requirements.txt      # Zależności
├── .env.example         # Przykład konfiguracji
└── README.md           # Dokumentacja
\`\`\`

## Technologie

- **FastAPI** - Nowoczesny framework web
- **SQLAlchemy** - ORM dla bazy danych
- **Pydantic** - Walidacja danych
- **Uvicorn** - Serwer ASGI
- **Pytest** - Framework testowy
- **SQLite/PostgreSQL** - Baza danych
