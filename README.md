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

To run the full stack locally, simply run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser. All API endpoints natively resolve within the Next.js `app/api` directory.

## 🌍 Vercel Deployment (One-Click Deploy)

Since HormoFit is natively configured as a single unified Next.js full-stack application, Vercel will deploy everything in **one single go** with zero errors.

### How to Deploy
1. Push this repository to GitHub.
2. Go to Vercel and **Add New Project**.
3. Import your `HormoFit` repository.
4. Leave the **Root Directory** untouched (default). Vercel will automatically detect `next build`.
5. Add any necessary Environment Variables (like `MONGODB_URI` and `NEXTAUTH_SECRET`).
6. Click **Deploy**.

That's it! Your Frontend React UI and Backend AI Twin Simulator APIs will instantly compile and deploy globally together.
