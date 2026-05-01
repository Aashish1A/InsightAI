# 🏛️ InsightAI - System Architecture Detailed Guide

This document provides a comprehensive breakdown of the InsightAI platform's system architecture. It is designed to help new developers understand the core technologies, data flows, infrastructure, and logical boundaries of the application.

---

## 1. High-Level Architecture Overview

InsightAI is built as a **Full-Stack Serverless Application** utilizing the **Next.js App Router (React 19)**. The architecture follows a Jamstack paradigm, offloading specific domain responsibilities (like Authentication, Database, and Media Storage) to specialized SaaS providers, while maintaining application routing, server-side data fetching, and API aggregation within the Next.js boundary.

### System Diagram

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                               │
│  ┌─────────────────┐ ┌───────────────────┐ ┌─────────────────────────┐  │
│  │   UI & Layout   │ │ State Management  │ │   Client Interactivity  │  │
│  │ Tailwind, GSAP, │ │ Redux Toolkit     │ │ React Hooks, Animations │  │
│  │ Framer Motion   │ │ React Context     │ │ (Lenis Scroll, Lucide)  │  │
│  └────────┬────────┘ └────────┬──────────┘ └────────────┬────────────┘  │
└───────────┼───────────────────┼─────────────────────────┼───────────────┘
            │                   │                         │
            ▼                   ▼                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS SERVER (Edge/Node)                       │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                    API Route Handlers (app/api/)                  │  │
│  │  ┌───────────────┐ ┌────────────────┐ ┌─────────┐ ┌───────────┐   │  │
│  │  │ /resumes/*    │ │ /ai/*          │ │ /user/* │ │ /other/*  │   │  │
│  │  │ Postgres CRUD │ │ OpenAI/Clipgrp │ │  Feeds  │ │ ATS Parse │   │  │
│  │  └──────┬────────┘ └──────┬─────────┘ └────┬────┘ └─────┬─────┘   │  │
│  └─────────┼─────────────────┼────────────────┼────────────┼─────────┘  │
└────────────┼─────────────────┼────────────────┼────────────┼────────────┘
             │                 │                │            │
┌────────────▼────────┐ ┌──────▼────────┐ ┌─────▼──────┐ ┌───▼────────────┐
│      DATABASE       │ │  AI SERVICES  │ │   MEDIA    │ │ AUTHENTICATION │
│ ┌─────────────────┐ │ │ ┌───────────┐ │ │ ┌────────┐ │ │ ┌────────────┐ │
│ │ Neon Serverless │ │ │ │  OpenAI   │ │ │ │ImageKit│ │ │ │   Clerk    │ │
│ │  (PostgreSQL)   │ │ │ │ Clipdrop  │ │ │ │Cloudin.│ │ │ │  (OAuth &  │ │
│ └─────────────────┘ │ │ └───────────┘ │ │ └────────┘ │ │ │  Session)  │ │
└─────────────────────┘ └───────────────┘ └────────────┘ └──────────────┘
```

---

## 2. Core Technological Stack

### Frontend (Client-Side)
- **Next.js (App Directory):** Handles routing, SSR (Server-Side Rendering), and CSR (Client-Side Rendering).
- **React 19:** View layer and component architecture.
- **Redux Toolkit:** Used for complex global state management (like User sessions synced from auth, builder form states).
- **Tailwind CSS v4:** Utility-first styling for rapid UI development components.
- **Animations:** 
  - GSAP & Framer Motion for micro-interactions and page transitions.
  - Lenis for buttery smooth scrolling mechanics.
- **Form & Navigation Tools:** `react-router-dom` paradigms adapted to Next.js where needed, and Lucide React for standardized iconography.

### Backend (Server-Side)
- **Next.js API Routes (`app/api/*`):** Acts as the BFF (Backend-for-Frontend) layer. Handles secure API proxying, payload validation, and database operations safely isolated from the client.
- **Serverless Edge:** Deployed to platforms like Vercel, allowing API endpoints to scale independently to zero.

### Database Layer
- **Neon Database (@neondatabase/serverless):** A serverless PostgreSQL database. Selected for its fast connection times natively tailored for serverless/edge environments. 
- **Raw SQL Layer:** `lib/db.js` handles schema pooling. The structure favors raw `jsonb` queries against a relational structure for supreme flexibility (e.g., dynamic nested schema arrays in `resumes` for education and experience).

### Third-Party Microservices
- **Clerk:** Identity and Access Management (IAM). Issues JWTs securely interceptable on Edge servers via `auth()`.
- **ImageKit & Cloudinary:** Media processing layers. Takes user uploads (like profile icons, generated AI shots), normalizes shapes (via transformation pipelines like `w-300,h-300,fo-face`), and hosts them.
- **OpenAI & Clipdrop:** Powers the AI generation elements (Text-based prompts for blogging, ATS checks, and object removal tooling).

---

## 3. Data & User Flows

### A. Authentication Flow
1. **Unauthenticated User:** Browses landing page. Clicks "Sign In".
2. **Clerk Overlay:** Redirects to Clerk’s secure authentication UI / Social OAuth.
3. **Session Genesis:** Clerk issues a secure HTTP-only cookie and JWT.
4. **Server Validation:** When the user accesses `/dashboard`, Next.js middleware or Server Components invoke `auth()` to instantly verify access and pull the User ID.
5. **Redux Hydration:** The verified User ID is synced locally to the Redux store to manage instantaneous client-side UI shifts without constant refetching.

### B. Resume Builder Flow
1. **Initialization:** User clicks "Build Resume".
2. **Action (`GET /api/resumes/...`):** The Application fetches the user's previously stored document mapping. 
3. **Client Store:** Redux / local React State (`useState`) hydrates with the complex JSON representing sections (Education, Projects, etc.).
4. **Live Edition:** User alters fields. The UI updates locally to show real-time previews across modular templates (`ModernTemplate`, `ClassicTemplate`).
5. **Image Processing:** If the user uploads a profile picture, a `FormData` envelope pushes it to `PUT /api/resumes/update`. The Next.js API intercepts it, pipes the buffer securely to **ImageKit**, receives a CDN URL, and attaches that URL to the DB payload.
6. **Save to DB:** Next.js sends the final JSON payload to Neon Postgres. Neon evaluates the COALESCE constraints and seamlessly parses sub-trees directly into `jsonb` fields (`personal_info`, `experience`).

### C. AI Generation Flow (Copywriting & Editing)
1. **Prompt Invocation:** User submits a prompt (e.g., "Write an article about Next.js architectures").
2. **Backend Proxy:** The Next.js API (`/api/ai/generate-article`) receives the request. This keeps API keys absolutely invisible to browser-side network inspectors.
3. **LLM Connection:** The backend sends the context system configurations to the OpenAI endpoint.
4. **Streaming/Resolution:** OpenAI provides the payload back to the backend, which parses, formats properly, and returns to the client.
5. **Database Logging (Optional):** The generated content is stored in a generic `creations` or content log attached to the User's ID for history playback.

---

## 4. Logical Boundary Breakdown 

| Directory Context | Role Overview |
|-------------------|---------------|
| `app/(pages)` | Next.js Page components. Mix of CSR (`"use client"`) for interactivity, and SSR for secure data layout. |
| `app/api/*` | Backend route handlers matching pure REST protocols (`GET`, `POST`, `PUT`, `DELETE`). |
| `components/*` | Highly reusable fragments. Inputs, specific resume form blocks (`EducationForm.js`), complex visual interactions. |
| `lib/*` | Infrastructure adapters. Where Neon DB pools, ImageKit configs, and auth utilities are initialized using environment variables. |
| `public/assets/templates`| Pre-built Resume JSX structural layers that read standardized JSON datasets and apply CSS dynamically. |

---

## 5. Scalability Considerations

- **Stateless APIs:** Every Next.js route relies purely on the passed Server Component context or JWT. Horizontal scaling requires zero session-sync complexity.
- **Serverless PostgreSQL:** Neon auto-scales compute up during heavy reads and auto-suspends during downtime to optimize cloud expenses perfectly. 
- **JSONB Flexibility:** By heavily utilizing `JSONB` native to Postgres rather than strict 1NF relational mapping across 12 distinct tables (Resume -> Edu, Resume -> Proj), resume fetches and update mutations occur in standard O(1) query time without immense JOIN overhead.