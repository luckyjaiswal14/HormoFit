# HormoFit: The PCOD Operating System

The world’s first AI-powered PCOD Digital Twin platform that predicts risk, simulates hormonal outcomes, and continuously adapts lifestyle, nutrition, mental health, and community knowledge — all in one ecosystem.

## 🧩 System Architecture

The monolithic codebase has been decoupled into a dedicated Microservice architecture.

### 1. Frontend (`/frontend`)
The React user interface built leveraging Next.js (App Router), Tailwind CSS, and Shadcn UI components.
- Handles user views (Dashboard, Tracker, Twin Profile, Community).
- Proxies API requests automatically to the Backend service.

### 2. Backend (`/backend`)
The API and AI engine server built extending Next.js server-side capabilities.
- Handles intelligent computations, Twin Engine simulations.
- Exposes RESTful API endpoints.

## 🚀 Getting Started

To run the full stack locally, you need to start both services concurrently.

**Terminal 1 (Backend API):**
```bash
cd backend
npm install
npm run dev
```
*The backend will boot up automatically on `http://localhost:3001`.*

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm install
npm run dev
```
*The frontend will boot up on `http://localhost:3000`.*

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser. All API requests (e.g., `/api/twin`) will automatically proxy from port `3000` to `3001`.
