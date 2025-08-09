# Legal API Nexus Project

## Professional Full-Stack Legal Management System

A comprehensive legal case management system built with FastAPI backend, Next.js frontend, PostgreSQL database, and AI-powered document analysis.

## 🚀 Features

- **Case Management**: Complete case lifecycle management for law firms
- **Document Analysis**: AI-powered legal document analysis using Google Gemini
- **User Management**: Role-based access control (Client, Operator, Admin)
- **Document Upload**: Secure document storage and management
- **Real-time Updates**: Live case status updates
- **Professional UI**: Modern, responsive interface built with Next.js and Tailwind CSS

## 🏗️ Architecture

### Backend (FastAPI)
- **Domain-Driven Design** architecture
- **Async SQLAlchemy** with PostgreSQL
- **JWT Authentication** with role-based access
- **Alembic** database migrations
- **Google Gemini AI** integration
- **RESTful API** with OpenAPI documentation

### Frontend (Next.js)
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **Zustand** for state management
- **React Hook Form** for form handling

### Database
- **PostgreSQL** with async support
- **Alembic** migrations
- **SQLAlchemy ORM** with relationship mapping

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose
- Google Generative AI API key

### 1. Clone and Setup
```bash
git clone <repository-url>
cd legal-api-nexus-project
cp .env.example .env
```

### 2. Configure Environment
Edit `.env` file and add your Google AI API key:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here
```

### 3. Start the Application
```bash
docker-compose up --build
```

### 4. Initialize Database
```bash
# Create initial migration
docker-compose exec backend alembic revision --autogenerate -m "Initial migration"

# Apply migrations
docker-compose exec backend alembic upgrade head
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Database**: localhost:5432 (postgres/app/app)

## 🛠️ Local Development (without Docker)

### Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Set environment variables
export DATABASE_URL="postgresql+asyncpg://app:app@localhost:5432/app"
export GOOGLE_GENERATIVE_AI_API_KEY="your_api_key"

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
npm install
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1 npm run dev
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

### Case Management
- `GET /api/v1/cases/` - List cases
- `POST /api/v1/cases/` - Create new case
- `GET /api/v1/cases/{id}` - Get case details

### Document Management
- `POST /api/v1/documents/upload/{case_id}` - Upload document
- `GET /api/v1/documents/case/{case_id}` - Get case documents

### Analysis (Admin/Operator only)
- `POST /api/v1/analyses/` - Create analysis
- `GET /api/v1/analyses/case/{case_id}` - Get case analysis
- `POST /api/v1/analyses/generate/{case_id}` - Generate AI analysis

## 🔐 User Roles

1. **CLIENT**: Can create cases, upload documents, view their own data
2. **OPERATOR**: Can view all cases, create analyses, manage documents
3. **ADMIN**: Full system access, user management

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
npm test
```

## 📦 Database Migrations

### Create New Migration
```bash
docker-compose exec backend alembic revision --autogenerate -m "Description"
```

### Apply Migrations
```bash
docker-compose exec backend alembic upgrade head
```

### Rollback Migration
```bash
docker-compose exec backend alembic downgrade -1
```

## 🚀 Production Deployment

### Environment Variables
```env
DATABASE_URL=postgresql+asyncpg://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_GENERATIVE_AI_API_KEY=your-production-api-key
```

### Docker Production Build
```bash
docker-compose -f docker-compose.prod.yml up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/docs`
- Review the database schema in `backend/app/models.py`