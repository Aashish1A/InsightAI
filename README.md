<div align="center">
  
# 🚀 InsightAI

### Your All-in-One AI-Powered Content & Media Creation Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge)](https://clerk.dev/)
[![Neon](https://img.shields.io/badge/Neon-Database-00E599?style=for-the-badge&logo=postgresql)](https://neon.tech/)

[Features](#-features) • [Demo](https://insight-ai-xi.vercel.app/) • [Installation](#-getting-started) • [Usage](#-features) • [Tech Stack](#-tech-stack)

</div>

---

## 📝 Overview

**InsightAI** is a modern SaaS application that provides a suite of cutting-edge AI tools from a single centralized dashboard. Build professional resumes with ATS compatibility scoring, generate long-form articles, brainstorm blog titles, and utilize advanced AI image manipulation tools—all powered by Next.js, OpenAI, Cloudinary, and Neon Database.

---

## 🎯 Key Features

- 📄 **Resume Builder & Reviewer:** Craft professional resumes with AI-driven feedback.
- 🎯 **ATS Score Checker:** Analyze parsed PDFs (using `pdf-parse`) against ATS guidelines.
- ✍️ **AI Copywriting:** Instantly generate high-quality articles and catchy blog titles via OpenAI.
- 🎨 **AI Image Generation & Editing:** Create images from text, remove backgrounds, and erase objects seamlessly powered by external AI and Cloudinary.
- 🌐 **Community Feed & Dashboard:** Publish your AI creations to a community board, like others' creations, and manage your personal history.
- ✨ **Smooth Animations:** Buttery-smooth UI interactions using GSAP, Framer Motion, and Lenis for smooth scrolling.

---

## 🏗️ System Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                InsightAI Web App (Next.js)             │  │
│  │  - Dashboard: Resume, Article, Blog, Image Tools       │  │
│  │  - Community Feed & Creations UI                       │  │
│  │  - TailwindCSS, GSAP, Framer Motion, Lenis             │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                ↕ HTTPS/REST API & Server Actions
┌──────────────────────────────────────────────────────────────┐
│                        SERVER SIDE                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │      Next.js App Router (API Routes & Server Actions)  │  │
│  │  - Handles AI Integrations (OpenAI)                    │  │
│  │  - ATS Parsing & Scoring Logic (pdf-parse)             │  │
│  │  - Manage Database Queries (Neon Serverless)           │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                ↕ External AI APIs / Auth / Database / Storage
┌──────────────────────────────────────────────────────────────┐
│                    THIRD-PARTY SERVICES                     │
│  ┌───────────────┐  ┌───────────────┐  ┌─────────────────┐  │
│  │   OpenAI      │  │ Cloudinary    │  │   Clerk Auth    │  │
│  │ (Text/Images) │  │ (Image Store) │  │ (User Security) │  │
│  └───────────────┘  └───────────────┘  └─────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                Neon DB (Serverless Postgres)           │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

#### Frontend Layer
- **Framework:** [Next.js 16.1](https://nextjs.org/) (App Directory)
- **UI & Styling:** [React 19](https://reactjs.org/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://framer.com/motion), [GSAP](https://gsap.com/), [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll)
- **Icons:** [Lucide React](https://lucide.dev/)

#### Backend & Database Layer
- **Database:** [Neon Database (Serverless Postgres)](https://neon.tech/)
- **Authentication:** [Clerk Auth](https://clerk.com/)
- **Image Processing/Hosting:** [Cloudinary](https://cloudinary.com/)
- **AI Integrations:** [OpenAI API](https://openai.com/)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and **pnpm** installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Aashish1A/InsightAI.git
cd InsightAI
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and configure the following required services:

```env
# CLERK AUTHENTICATION
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# NEON DATABASE (PostgreSQL)
DATABASE_URL=your_neon_db_connection_string

# OPENAI
OPENAI_API_KEY=your_openai_api_key

# CLIPDROP
CLIPDROP_API_KEY=your_clipdrop_api_key

# CLOUDINARY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the development server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Pages & API routes)
│   ├── api/ai/           # API routes for OpenAI and Cloudinary tasks
│   ├── api/user/         # API routes for user actions & community features
│   ├── ATS-Checker/      # PDF parsing and ATS scoring page
│   ├── Dashboard/        # Core user dashboard and tool interfaces
│   └── resume-builder/   # Interactive resume building tool
├── components/           # Reusable React components (Navbar, animated UI)
├── data/                 # Static data sets (pricing, faqs, features)
├── hooks/                # Custom React hooks (e.g., use-current-plan.js)
├── lib/                  # Configurations & DB connections (Auth, Cloudinary, Neon DB)
└── sections/             # Larger page sections for the landing page
```

---

## 👤 Author

**Aashish Kumar**  
[GitHub: @Aashish1A](https://github.com/Aashish1A)

<div align="center">

Made with ❤️ by [Aashish Kumar](https://github.com/Aashish1A)

If you found this project helpful, please give it a ⭐️!

</div>
