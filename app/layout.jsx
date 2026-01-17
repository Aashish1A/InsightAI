import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import LenisScroll from "@/components/lenis";
import Footer from "@/components/footer";

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
});

const urbanist = Urbanist({
    variable: "--font-urbanist",
    subsets: ["latin"],
});

export const metadata = {
    title: {
        default: "InsightAI | AI-powered tools for content, images, and resumes",
        template: "%s | InsightAI",
    },
    description:
        "InsightAI is a full-stack AI SaaS platform offering tools for content generation, image creation, background removal, and resume analysis using modern AI APIs.",
    keywords: [
        "AI SaaS",
        "AI content generator",
        "AI image generator",
        "resume analyzer AI",
        "Next.js AI application",
        "full stack AI project",
        "AI tools platform",
    ],
    authors: [{ name: "Aashish Kumar" }],
    creator: "Aashish Kumar",
    applicationName: "InsightAI",
    appleWebApp: {
        title: "InsightAI",
        capable: true,
        statusBarStyle: "default",
    },
    openGraph: {
        title: "InsightAI | Build smarter with AI-powered tools",
        description:
            "An AI-powered SaaS platform to generate articles, images, analyze resumes, and automate creative workflows.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "InsightAI | AI-powered creative tools",
        description:
            "Generate content, images, and resume insights using a modern full-stack AI SaaS platform.",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <LenisScroll />
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
