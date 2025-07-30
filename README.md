# API Kancelarii Prawnej

Kompleksowe rozwiązanie backendowe do zarządzania kancelariami prawnymi i klientami, zbudowane z użyciem FastAPI i React.

## Struktura Projektu

\`\`\`
kancelaria/
├── app/                    # Backend FastAPI
│   ├── api/v1/
│   │   ├── endpoints/      # Endpointy API
│   │   └── schemas/        # Schematy Pydantic
│   ├── core/              # Konfiguracja
│   ├── db/                # Baza danych
│   ├── models/            # Modele SQLAlchemy
│   ├── services/          # Logika biznesowa
│   └── main.py           # Główna aplikacja
├── frontend/              # Frontend React/Next.js
│   ├── app/              # Strony aplikacji
│   ├── components/       # Komponenty React
│   └── lib/             # Utilities i API client
└── requirements.txt      # Zależności Python
\`\`\`

## Instalacja i Uruchomienie

### Backend (FastAPI)

1. **Utwórz wirtualne środowisko:**
\`\`\`bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# lub
.\venv\Scripts\activate   # Windows
\`\`\`

2. **Zainstaluj zależności:**
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. **Skonfiguruj bazę danych:**
\`\`\`bash
cp .env.example .env
# Edytuj plik .env z właściwymi danymi bazy danych
\`\`\`

4. **Uruchom serwer:**
\`\`\`bash
uvicorn app.main:app --reload
\`\`\`

API będzie dostępne pod adresem: http://localhost:8000
Dokumentacja: http://localhost:8000/docs

### Frontend (React/Next.js)

1. **Przejdź do katalogu frontend:**
\`\`\`bash
cd frontend
\`\`\`

2. **Zainstaluj zależności:**
\`\`\`bash
pnpm install
\`\`\`

3. **Uruchom aplikację:**
\`\`\`bash
pnpm dev
\`\`\`

Frontend będzie dostępny pod adresem: http://localhost:3000

## Funkcjonalności

### API Endpoints

- **Kancelarie** (`/api/v1/kancelarie`)
  - GET / - Lista kancelarii
  - POST / - Dodaj kancelarię
  - GET /{id} - Szczegóły kancelarii
  - PUT /{id} - Aktualizuj kancelarię
  - DELETE /{id} - Usuń kancelarię

- **Klienci** (`/api/v1/klienci`)
  - GET / - Lista klientów
  - POST / - Dodaj klienta
  - GET /{id} - Szczegóły klienta
  - PUT /{id} - Aktualizuj klienta
  - DELETE /{id} - Usuń klienta

- **Sprawy** (`/api/v1/sprawy`)
  - GET / - Lista spraw
  - POST / - Dodaj sprawę
  - GET /{id} - Szczegóły sprawy
  - PUT /{id} - Aktualizuj sprawę
  - DELETE /{id} - Usuń sprawę

### Frontend Features

- **Dashboard** - Przegląd statystyk systemu
- **Zarządzanie Kancelariami** - CRUD operations dla kancelarii
- **Zarządzanie Klientami** - CRUD operations dla klientów
- **Zarządzanie Sprawami** - CRUD operations dla spraw
- **Responsywny interfejs** - Optymalizowany dla wszystkich urządzeń

## Technologie

### Backend
- **FastAPI** - Nowoczesny framework web dla Python
- **SQLAlchemy** - ORM dla bazy danych
- **Pydantic** - Walidacja danych
- **PostgreSQL** - Baza danych
- **Uvicorn** - ASGI server

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Typowanie statyczne
- **Tailwind CSS** - Styling
- **Radix UI** - Komponenty UI
- **TanStack Query** - Zarządzanie stanem serwera
- **React Hook Form** - Zarządzanie formularzami

## Rozwój

### Planowane funkcjonalności
- Uwierzytelnianie i autoryzacja (JWT)
- Zarządzanie dokumentami
- System powiadomień
- Raportowanie i analityka
- API dla aplikacji mobilnych
- Integracja z systemami zewnętrznymi

### Testowanie
\`\`\`bash
# Backend
pytest

# Frontend
pnpm test
\`\`\`

## Licencja

MIT License - szczegóły w pliku LICENSE
\`\`\`

Stworzyłem kompletny system zarządzania kancelarią prawną zgodnie z Twoimi specyfikacjami:

## ✅ **Zaimplementowane funkcjonalności:**

### **Backend (FastAPI):**
- Modularną strukturę projektu z oddzielonymi warstwami
- Modele SQLAlchemy dla kancelarii, klientów i spraw
- Schematy Pydantic do walidacji danych
- Serwisy z logiką biznesową
- Endpointy API z pełnym CRUD
- Konfigurację i zarządzanie środowiskiem

### **Frontend (React/Next.js):**
- Nowoczesny interfejs z Tailwind CSS i Radix UI
- Zarządzanie stanem z TanStack Query
- Komponenty do zarządzania kancelariami, klientami i sprawami
- Dashboard z statystykami
- Responsywny design
- Formularze z walidacją

### **Kluczowe cechy:**
- **Pełny CRUD** dla wszystkich encji
- **Relacje między danymi** (kancelaria → klienci → sprawy)
- **Walidacja danych** na poziomie backend i frontend
- **Responsywny interfejs** z profesjonalnym designem
- **Modularną architekturę** łatwą do rozszerzania
- **TypeScript** dla bezpieczeństwa typów
- **Dokumentację API** automatycznie generowaną przez FastAPI

System jest gotowy do uruchomienia i może być łatwo rozszerzany o dodatkowe funkcjonalności jak uwierzytelnianie, zarządzanie dokumentami czy raportowanie.
