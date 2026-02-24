# Full-Stack Portfolio (React + Express + MongoDB)

Production-ready portfolio with blog, projects, contact inbox, and protected admin dashboard. Frontend lives in `frontend/` (client) and backend API in `backend/` (server).

## Features
- Public pages: Home/Hero, About, Services, Projects (filter), Blog, Contact form
- Admin dashboard: JWT-protected CRUD for projects & posts, view/delete messages
- Dark/Light mode with localStorage, responsive, animations (Framer Motion)
- React Router 6, React Query, React Hook Form + Zod validation
- REST API with Express, MongoDB/Mongoose, JWT auth, rate limiting, Helmet, sanitization
- Seed script for admin user + sample projects/posts

## Stack
- Frontend: React 19, Vite, Tailwind v4, React Router, React Query, React Hook Form, Framer Motion
- Backend: Node/Express, MongoDB/Mongoose, JWT, Zod, bcrypt, Helmet, Rate Limit

## Quick Start (local)
1. Install deps (one time): `npm run install:all`
2. Copy env templates:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`
3. Fill envs:
   - `backend/.env`: `MONGO_URL`, `JWT_SECRET`, `CLIENT_URL=http://localhost:5173`
   - `frontend/.env`: `VITE_API_URL=http://localhost:8000/api`
4. Seed admin + sample data (optional):
   ```bash
   cd backend
   npm run seed
   # admin login: admin@example.com / admin123
   ```
5. Run both apps concurrently from repo root:
   ```bash
   npm run dev
   ```
   - API: http://localhost:8000
   - Client: http://localhost:5173

## Scripts
- `npm run dev` (root): start API + client concurrently
- `npm run dev` (backend): start API with nodemon
- `npm run dev` (frontend): start Vite dev server
- `npm run seed` (backend): seed admin + sample projects/posts

## Folder Structure
```
backend/        # Express API (server)
  src/
    config/     # db connection
    controllers/ routes/ models/ middleware/ validators/ utils/
    scripts/seed.js
  .env.example
frontend/       # React client (Tailwind)
  src/
    api/ components/ pages/ providers/ data/
  .env.example
package.json    # root helper scripts (concurrently)
```

## Deployment Notes
- Frontend: Vercel/Netlify (set `VITE_API_URL` env to deployed API URL)
- Backend: Render/Fly.io/Railway (set `MONGO_URL`, `JWT_SECRET`, `CLIENT_URL`)
- Database: MongoDB Atlas (whitelist server IP, enable SRV)
- CORS: set `CLIENT_URL` to the deployed frontend origin

## API Docs
See `API.md` for endpoints and sample requests/responses.

## Contact
Name: [Your Name]  
Email: [your@email.com]  
GitHub: https://github.com/yourusername  
LinkedIn: https://linkedin.com/in/yourusername  
Twitter: https://twitter.com/yourusername
