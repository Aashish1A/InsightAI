<div align="center">
  
# 🚀 InsightAI

### Your All-in-One AI-Powered Content & Media Creation Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge)](https://clerk.dev/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## ✨ About

**InsightAI** is a modern, AI-powered SaaS platform that empowers creators, marketers, and professionals to generate high-quality content and media effortlessly. From writing articles to generating images, removing backgrounds, and more – all in one elegant interface.

## 🎯 Features

### 📝 Content Creation
- **AI Article Generator** - Generate comprehensive, high-quality articles by simply providing a title and desired length
- **Blog Title Generator** - Create engaging, SEO-optimized blog titles from keywords and categories
- **Resume Reviewer** - Get AI-powered feedback and suggestions to improve your resume

### 🎨 Image Tools
- **AI Image Generator** - Transform text prompts into stunning visuals using cutting-edge AI models
- **Background Remover** - Remove backgrounds from images with precision
- **Watermark Remover** - Clean up images by removing unwanted watermarks

### 🌐 Community
- **Community Hub** - Connect with other creators, share insights, and collaborate

### 📊 Dashboard
- **Intuitive Dashboard** - Manage all your projects and tools from a centralized, user-friendly interface

## 🎥 Demo

> Add your demo GIF or screenshots here

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm/yarn

### Installation

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
   
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Add your AI API keys here
   # OPENAI_API_KEY=your_openai_key
   # STABILITY_API_KEY=your_stability_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action! 🎉

## 📁 Project Structure

```
InsightAI/
├── app/                    # Next.js App Router
│   ├── Dashboard/         # Dashboard and AI tools pages
│   ├── layout.jsx         # Root layout
│   └── page.jsx           # Landing page
├── components/            # Reusable React components
├── sections/              # Landing page sections
├── data/                  # Static data and configuration
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - UI library
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Motion (Framer Motion)](https://motion.dev/)** - Animation library
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animation
- **[Lenis](https://lenis.studiofreight.com/)** - Smooth scroll library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set

### Authentication
- **[Clerk](https://clerk.dev/)** - Complete user management and authentication

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **pnpm** - Fast, disk space efficient package manager

## 📜 Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## 🎨 Features Showcase

### Landing Page Components
- ✅ Hero Section with smooth animations
- ✅ Interactive Stats Section
- ✅ Features Grid
- ✅ FAQ Section
- ✅ Pricing Plans
- ✅ Testimonials
- ✅ Responsive Navbar
- ✅ Footer

### AI Tools Dashboard
- ✅ Article Writing
- ✅ Blog Title Generation
- ✅ Image Generation
- ✅ Background Removal
- ✅ Watermark Removal
- ✅ Resume Review
- ✅ Community Access

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Aashish Kumar**

- GitHub: [@Aashish1A](https://github.com/Aashish1A)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk Authentication](https://clerk.dev/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">

Made with ❤️ by [Aashish Kumar](https://github.com/Aashish1A)

If you found this project helpful, please give it a ⭐️!

</div>
