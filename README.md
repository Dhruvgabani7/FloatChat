# FloatChat

FloatChat is a React + Vite frontend paired with a lightweight Express API. It provides a simple local development environment to build and test features that consume dataset endpoints.

## Getting Started

Prerequisites
- Node.js 18+ and npm

Install dependencies
- `cd frontend`
- `npm install`

Run in development
- `npm run server` — starts the API at `http://localhost:3001`
- `npm run dev` — starts the frontend at `http://localhost:5173`

Build and preview
- `npm run build`
- `npm run preview` — serves the built app locally

## API

- `GET /api/health` → `{ ok: true }`
- Additional dataset routes are mounted under `/api` (see `frontend/server/routes/`).

## Project Structure

- `frontend/src/` — React application code
- `frontend/server/index.js` — Express server entry
- `frontend/server/routes/` — API route handlers
- `frontend/public/` — static assets

## Notes

- CORS is enabled for local development.
- Set `PORT` to customize the API port (defaults to `3001`).