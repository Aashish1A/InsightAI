import {FileTextIcon, ImageIcon, Wand2Icon, EraserIcon, ScanTextIcon, LayoutDashboardIcon, FileEditIcon, SearchCheckIcon} from "lucide-react";

export const features = [
    {
        title: "AI Resume Builder",
        description:
            "Create professional, ATS-optimized resumes with AI assistance. Choose from templates and get intelligent content suggestions.",
        icon: FileEditIcon,
        cardBg: "bg-orange-100",
        iconBg: "bg-orange-500",
    },
    {
        title: "ATS Resume Scanner",
        description:
            "Scan your resume for ATS compatibility. Get a detailed score with keyword analysis and formatting recommendations.",
        icon: SearchCheckIcon,
        cardBg: "bg-teal-100",
        iconBg: "bg-teal-500",
    },
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
