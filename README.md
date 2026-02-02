<div align="center">
  
# 🚀 InsightAI

### Your All-in-One AI-Powered Content & Media Creation Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge)](https://clerk.dev/)

[Features](#-features) • [Demo](https://insight-ai-odpm.vercel.app/) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📝 Overview

InsightAI is a modern web application that helps users create professional resumes, check ATS compatibility, generate articles and blog titles, and use AI-powered image tools—all from a single dashboard. Built with Next.js, React, and TailwindCSS, it’s fast, responsive, and easy to use.

---

## 🎯 Key Features

- **Resume Builder:** Create, edit, and review professional resumes.
- **ATS Score Checker:** Analyze your resume for ATS compatibility and get improvement suggestions (dedicated page).
- **Article & Blog Title Generator:** Instantly generate high-quality articles and catchy blog titles.
- **AI Image Tools:** Generate images, remove backgrounds, and erase objects with AI.
- **All-in-One Dashboard:** Access all tools from a single, intuitive dashboard.

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                InsightAI Web App (Next.js)             │  │
│  │  - Dashboard: Resume, Article, Blog, Image Tools       │  │
│  │  - ATS Checker Page                                   │  │
│  │  - Auth, UI, Routing, API Calls                       │  │
│  │  - TailwindCSS, Framer Motion, Clerk Auth             │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                ↕ HTTPS/REST API & External Calls
┌──────────────────────────────────────────────────────────────┐
│                        SERVER SIDE                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │      Next.js API Routes (Server Functions)             │  │
│  │  - Handles AI API requests (OpenAI, Stability, etc.)   │  │
│  │  - ATS Resume Analysis Logic                           │  │
│  │  - User session/auth management                        │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                ↕ External AI APIs / Auth / Storage
┌──────────────────────────────────────────────────────────────┐
│                    THIRD-PARTY SERVICES                     │
│  ┌───────────────┐  ┌───────────────┐  ┌─────────────────┐  │
│  │   OpenAI      │  │ Stability AI  │  │   Clerk Auth    │  │
│  │ (Text/Images) │  │ (Images)      │  │ (User Mgmt)     │  │
│  └───────────────┘  └───────────────┘  └─────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                ↕ Static Assets
┌──────────────────────────────────────────────────────────────┐
│                        STORAGE                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │           Public Assets (Images, Icons, etc.)          │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TailwindCSS 4**
- **Framer Motion, GSAP, Lenis, Lucide React**
- **Clerk** (Authentication)
- **pnpm** (Package manager)

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aashish1A/InsightAI.git
   cd InsightAI
   ```
2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```
3. **Set up environment variables**
   - Create a `.env.local` file in the root directory and add your Clerk and AI API keys.
4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
5. **Open your browser**
   - Go to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
InsightAI/
├── app/                    # Next.js App Router
│   ├── Dashboard/          # Dashboard and AI tools pages
│   ├── ATS-Checker/        # Dedicated ATS score checker page
│   ├── layout.jsx          # Root layout
│   └── page.jsx            # Landing page
├── components/             # Reusable React components
├── sections/               # Landing page sections
├── data/                   # Static data and configuration
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

---

## 👤 Author

**Aashish Kumar**  
[GitHub: @Aashish1A](https://github.com/Aashish1A)

<div align="center">

Made with ❤️ by [Aashish Kumar](https://github.com/Aashish1A)

If you found this project helpful, please give it a ⭐️!

</div>
