import {FileTextIcon, ImageIcon, Wand2Icon, EraserIcon, ScanTextIcon, LayoutDashboardIcon,} from "lucide-react";

export const features = [
    {
        title: "AI Article Generator",
        description:
            "Generate high-quality articles by providing a title and desired length using AI-powered text generation.",
        icon: FileTextIcon,
        cardBg: "bg-blue-100",
        iconBg: "bg-blue-500",
    },
    {
        title: "Blog Title Generator",
        description:
            "Create engaging and SEO-friendly blog titles using keywords and categories powered by AI.",
        icon: Wand2Icon,
        cardBg: "bg-purple-100",
        iconBg: "bg-purple-500",
    },
    {
        title: "AI Image Generator",
        description:
            "Generate high-quality images from text prompts using modern AI image generation models.",
        icon: ImageIcon,
        cardBg: "bg-indigo-100",
        iconBg: "bg-indigo-500",
    },
    {
        title: "Background & Object Remover",
        description:
            "Remove image backgrounds or specific objects by uploading an image and describing what to remove.",
        icon: EraserIcon,
        cardBg: "bg-pink-100",
        iconBg: "bg-pink-500",
    },
    {
        title: "AI Resume Analyzer",
        description:
            "Upload resumes and receive AI-powered analysis with insights, strengths, and improvement suggestions.",
        icon: ScanTextIcon,
        cardBg: "bg-green-100",
        iconBg: "bg-green-500",
    },
    {
        title: "Clean Dashboard Experience",
        description:
            "Access all AI tools from a single, responsive dashboard with a simple and intuitive user experience.",
        icon: LayoutDashboardIcon,
        cardBg: "bg-gray-100",
        iconBg: "bg-gray-700",
    },
];
