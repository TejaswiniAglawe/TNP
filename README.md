# TNP NEXUS — Full-Stack Training & Placement Cell

A scalable Training & Placement Cell portal for managing 10K+ students.

## Project structure

- `frontend/` — React + Vite UI
- `backend/` — Node.js + Express REST API
- `database/` — PostgreSQL schema + 10,248-row demo seed
- `.env.example` — environment variables
- `docs/` — architecture notes

## 1. Run the frontend demo

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

The UI works immediately with generated demo records, so you can demonstrate sorting/filtering without a database.

## 2. Run the backend

Install PostgreSQL, create database `tnp_nexus`, then run:

```bash
psql -U postgres -d tnp_nexus -f database/schema.sql
psql -U postgres -d tnp_nexus -f database/seed.sql
```

Copy `.env.example` to `.env` and update `DATABASE_URL`.

Then:

```bash
cd backend
npm install
npm start
```

API health: http://localhost:4000/api/health

Example API:

`GET /api/students?page=1&limit=50&search=aarav&branch=CSE&status=Placed&sort=cgpa&order=desc`

## Scalability

The frontend demo has 10,248 records. The production API uses server-side pagination, filtering and sorting. PostgreSQL indexes are provided for common filters and a trigram search index is provided for text search.

For larger deployments:
- Use cursor pagination for very deep pages.
- Add Redis for dashboard/analytics caching.
- Add JWT/OIDC authentication and role-based access control.
- Use background jobs for bulk CSV imports.
- Use object storage for resumes/documents rather than DB blobs.
- Add audit logs for placement actions.
- Put API behind a load balancer and run multiple Node instances.
