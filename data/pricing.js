import { RocketIcon, UserIcon, UsersIcon } from "lucide-react";

export const pricing = [
    {
        icon: RocketIcon,
        name: "Free",
        description: "Try InsightAI and explore core AI tools.",
        price: 0,
        clerkPlanId: process.env.NEXT_PUBLIC_CLERK_PLAN_FREE_ID,
        linkText: "Start Free",
        linkUrl: "#",
        features: [
            "Limited article & blog title generation",
            "Basic AI image generation",
            "Resume analysis (limited)",
            "Standard response speed",
            "Community support",
        ],
    },
    {
        icon: UserIcon,
        name: "Starter",
        description: "For students and individuals using AI regularly.",
        price: 19,
        clerkPlanId: process.env.NEXT_PUBLIC_CLERK_PLAN_STARTER_ID,
        linkText: "Get Started",
        linkUrl: "#",
        features: [
            "Unlimited article & blog generation",
            "High-quality AI image generation",
            "Background & object removal",
            "Resume analysis with detailed insights",
            "Priority response speed",
        ],
    },
    {
        icon: UsersIcon,
        name: "Pro",
        type: "popular",
        description: "Best for creators and professionals.",
        price: 49,
        clerkPlanId: process.env.NEXT_PUBLIC_CLERK_PLAN_PRO_ID,
        linkText: "Upgrade to Pro",
        linkUrl: "#",
        features: [
            "All Starter features",
            "Higher usage limits",
            "Advanced image processing",
            "Usage history & downloads",
            "Priority email support",
        ],
    },
];
