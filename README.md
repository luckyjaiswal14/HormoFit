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

To run the full stack locally, you need to start both services concurrently. Simply run the following at the root folder:
```bash
npm install
npm run dev
```
*(This uses npm workspaces to boot both `http://localhost:3000` and `http://localhost:3001` automatically).*

## 🌍 Vercel Deployment (Zero-Error Monorepo Guide)

Because HormoFit is decoupled into two optimized microservices natively, you will create **TWO** projects in your Vercel Dashboard targeting this same repository:

### 1. Deploy the Backend API Server
1. Go to Vercel and **Add New Project**.
2. Import this `HormoFit` repository.
3. In the "Configure Project" screen, set the **Root Directory** to `backend`.
4. Leave all build settings as default.
5. Click **Deploy**.
6. Once deployed, copy the production URL (e.g., `https://hormofit-backend.vercel.app`).

### 2. Deploy the Frontend Client
1. Go back to Vercel and **Add New Project**.
2. Import this generic `HormoFit` repository again.
3. This time, set the **Root Directory** to `frontend`.
4. Open the **Environment Variables** tab.
5. Add a new variable: 
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: The backend URL you copied in the previous step (e.g., `https://hormofit-backend.vercel.app`)
6. Click **Deploy**.

Your frontend is perfectly configured to dynamically proxy all `/api` requests to your deployed backend using Next.js Rewrites.
