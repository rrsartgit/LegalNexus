# Legal API Nexus

This project is a comprehensive platform for legal services, including document analysis, legal writing, consultations, and representation. It features a Next.js frontend and a FastAPI backend, integrated with Supabase for authentication and data management.

## Features

- **Document Analysis**: Quick and precise analysis of legal documents.
- **Legal Writing**: Professional preparation of legal documents.
- **Consultations**: Individual consultations with experienced lawyers.
- **Representation**: Representation in court and before administrative bodies.
- **User Management**: Admin panel for managing users and law firms.
- **Order Management**: Client and operator panels for managing legal orders.
- **AI Assistant**: AI-powered assistant for legal queries.

## Technologies Used

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- `@tanstack/react-query` for data fetching
- `@supabase/supabase-js` for authentication

### Backend
- FastAPI
- Python
- SQLAlchemy
- PostgreSQL (via Supabase)
- `uvicorn` for serving the API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Python (v3.9 or higher)
- pip
- Supabase project with PostgreSQL database

### Setup

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/your-repo/legal-api-nexus.git
    cd legal-api-nexus
    \`\`\`

2.  **Backend Setup:**
    \`\`\`bash
    pip install -r requirements.txt
    \`\`\`
    Create a `.env` file in the root directory with your Supabase credentials:
    \`\`\`
    SUPABASE_URL="YOUR_SUPABASE_URL"
    SUPABASE_KEY="YOUR_SUPABASE_ANON_KEY"
    SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
    DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_SUPABASE_REF.supabase.co:5432/postgres"
    \`\`\`
    Run the backend:
    \`\`\`bash
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    \`\`\`

3.  **Frontend Setup:**
    \`\`\`bash
    cd frontend
    npm install
    \`\`\`
    Create a `.env.local` file in the `frontend` directory with your Supabase public credentials:
    \`\`\`
    NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    \`\`\`
    Run the frontend:
    \`\`\`bash
    npm run dev
    \`\`\`

4.  **Access the Application:**
    - Frontend: `http://localhost:3000`
    - Backend API: `http://localhost:8000`

## Project Structure

\`\`\`
.
├── app/                  # FastAPI backend application
│   ├── api/              # API endpoints
│   ├── core/             # Core configurations
│   ├── db/               # Database session management
│   ├── models/           # SQLAlchemy models
│   ├── services/         # Business logic services
│   └── main.py           # FastAPI application entry point
├── frontend/             # Next.js frontend application
│   ├── app/              # Next.js App Router pages and layouts
│   ├── components/       # React components
│   ├── lib/              # Frontend utilities and API clients
│   ├── public/           # Static assets
│   ├── styles/           # Global CSS
│   └── ...
├── public/               # Shared static assets (e.g., placeholder images)
├── scripts/              # Database migration/seeding scripts
├── __tests__/            # Jest tests for frontend and backend
├── .gitignore
├── .gitpod.yml
├── README.md
├── components.json       # shadcn/ui components configuration
├── jest.config.js
├── jest.setup.js
├── middleware.ts         # Next.js middleware
├── next.config.mjs
├── openapi.yaml          # OpenAPI specification for the backend
├── package.json          # Frontend dependencies
├── postcss.config.mjs
├── requirements.txt      # Backend dependencies
├── tailwind.config.ts
└── tsconfig.json
\`\`\`

## Contributing

Contributions are welcome! Please follow standard GitHub flow: fork the repository, create a branch, make your changes, and open a pull request.

## License

This project is licensed under the MIT License.
