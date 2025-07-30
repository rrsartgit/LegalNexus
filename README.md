# Platforma Analizy Dokumentów

System zarządzania zleceniami analizy dokumentów prawnych - platforma SaaS łącząca klientów z operatorami wykonującymi analizy.

## Funkcjonalności

### Dla Klientów
- ✅ Rejestracja i logowanie
- ✅ Tworzenie zleceń analizy dokumentów
- ✅ Wgrywanie plików (PDF, DOC, DOCX, TXT, JPG, PNG)
- ✅ Śledzenie statusu zlecenia
- ✅ Komunikacja z operatorem
- ✅ Podgląd fragmentu analizy przed płatnością
- ✅ Bezpieczne płatności online
- ✅ Dostęp do pełnej analizy po opłaceniu

### Dla Operatorów
- ✅ Panel administracyjny
- ✅ Kolejka zleceń do realizacji
- ✅ Pobieranie dokumentów klientów
- ✅ Zarządzanie statusem zleceń
- ✅ Dodawanie komentarzy i komunikacja z klientami
- ✅ Wklejanie analiz (fragment publiczny + pełna treść)
- ✅ Statystyki i raporty

## Technologie

### Backend
- **FastAPI** - nowoczesny framework webowy Python
- **SQLAlchemy** - ORM do zarządzania bazą danych
- **Pydantic** - walidacja danych
- **JWT** - autoryzacja i uwierzytelnianie
- **SQLite/PostgreSQL** - baza danych
- **Stripe** - obsługa płatności

### Frontend
- **React** - biblioteka UI
- **TypeScript** - typowany JavaScript
- **Tailwind CSS** - stylowanie
- **React Query** - zarządzanie stanem serwera

## Instalacja i Uruchomienie

### Backend

1. **Klonowanie repozytorium**
\`\`\`bash
git clone <repository-url>
cd legal-api-nexus
\`\`\`

2. **Utworzenie środowiska wirtualnego**
\`\`\`bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# lub
venv\Scripts\activate  # Windows
\`\`\`

3. **Instalacja zależności**
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. **Konfiguracja środowiska**
\`\`\`bash
cp .env.example .env
# Edytuj plik .env i ustaw odpowiednie wartości
\`\`\`

5. **Uruchomienie serwera**
\`\`\`bash
uvicorn app.main:app --reload
\`\`\`

API będzie dostępne pod adresem: http://localhost:8000
Dokumentacja API: http://localhost:8000/docs

### Frontend

1. **Przejście do katalogu frontend**
\`\`\`bash
cd frontend
\`\`\`

2. **Instalacja zależności**
\`\`\`bash
npm install
# lub
pnpm install
\`\`\`

3. **Uruchomienie aplikacji**
\`\`\`bash
npm run dev
# lub
pnpm dev
\`\`\`

Aplikacja będzie dostępna pod adresem: http://localhost:3000

## Struktura Projektu

\`\`\`
legal-api-nexus/
├── app/
│   ├── api/v1/
│   │   ├── endpoints/          # Endpointy API
│   │   └── schemas/            # Schematy Pydantic
│   ├── core/                   # Konfiguracja
│   ├── db/                     # Sesja bazy danych
│   ├── models/                 # Modele SQLAlchemy
│   └── tests/                  # Testy
├── frontend/
│   ├── components/             # Komponenty React
│   ├── lib/                    # Utilities i API client
│   └── app/                    # Strony Next.js
├── uploads/                    # Wgrane pliki
├── requirements.txt            # Zależności Python
└── README.md
\`\`\`

## Workflow Zlecenia

1. **Złożenie zlecenia** - Klient tworzy zlecenie i wgrywa dokumenty
2. **Podjęcie przez operatora** - Operator przypisuje zlecenie do siebie
3. **Analiza dokumentów** - Operator analizuje w zewnętrznym narzędziu
4. **Przygotowanie odpowiedzi** - Operator wkleja fragment i pełną analizę
5. **Oczekiwanie na płatność** - Klient widzi fragment i może opłacić
6. **Dostęp do pełnej analizy** - Po płatności klient otrzymuje pełną treść analizy

## API Endpoints

### Autoryzacja
- `POST /api/v1/auth/register` - Rejestracja użytkownika
- `POST /api/v1/auth/login` - Logowanie
- `GET /api/v1/auth/me` - Informacje o aktualnym użytkowniku

### Zlecenia
- `GET /api/v1/orders/` - Lista zleceń
- `POST /api/v1/orders/` - Tworzenie zlecenia
- `GET /api/v1/orders/{id}` - Szczegóły zlecenia
- `PUT /api/v1/orders/{id}` - Aktualizacja zlecenia
- `POST /api/v1/orders/{id}/assign` - Przypisanie zlecenia do operatora

### Dokumenty
- `POST /api/v1/documents/{order_id}/upload` - Wgrywanie plików
- `GET /api/v1/documents/{order_id}/documents` - Lista dokumentów
- `DELETE /api/v1/documents/{id}` - Usuwanie dokumentu

### Analizy
- `POST /api/v1/analyses/` - Tworzenie analizy
- `GET /api/v1/analyses/{order_id}/preview` - Podgląd analizy
- `GET /api/v1/analyses/{order_id}/full` - Pełna analiza (po opłaceniu)

### Płatności
- `POST /api/v1/payments/{order_id}/create-payment-intent` - Tworzenie płatności
- `POST /api/v1/payments/{payment_id}/confirm` - Potwierdzenie płatności

## Testowanie

\`\`\`bash
# Uruchomienie testów
pytest app/tests/

# Testy z pokryciem kodu
pytest --cov=app app/tests/
\`\`\`

## Deployment

### Wymagania produkcyjne
- Python 3.8+
- PostgreSQL (zalecane zamiast SQLite)
- Redis (dla kolejki zadań)
- Nginx (reverse proxy)

### Zmienne środowiskowe produkcyjne
\`\`\`bash
DATABASE_URL=postgresql://user:password@localhost/legal_api
SECRET_KEY=your-production-secret-key
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key
\`\`\`

## Bezpieczeństwo

- ✅ Hashowanie haseł (bcrypt)
- ✅ JWT tokeny z wygasaniem
- ✅ Walidacja uprawnień na poziomie API
- ✅ Bezpieczne przechowywanie plików
- ✅ Walidacja typów plików
- ✅ Ograniczenia rozmiaru plików

## Wsparcie

W przypadku problemów lub pytań:
1. Sprawdź dokumentację API: `/docs`
2. Przejrzyj logi aplikacji
3. Skontaktuj się z zespołem deweloperskim

## Licencja

Projekt jest własnością [Nazwa Firmy]. Wszystkie prawa zastrzeżone.
