"use client";
import Link from "next/link";
import Image from "next/image";
import useCurrentPlan from "@/hooks/use-current-plan";
import { usePathname } from "next/navigation";
import { Home, PenSquare, Hash, Image as ImageIcon, Eraser, Scissors, FileText, FileEditIcon, Users, LogOut } from "lucide-react";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const { user } = useUser();
    const { openUserProfile, signOut } = useClerk();
    const { currentPlanName, isLoadingPlan } = useCurrentPlan();
    
    const navItems = [
        { name: "Dashboard", href: "/Dashboard", icon: Home },
        { name: "Write Article", href: "/Dashboard/write-article", icon: PenSquare },
        { name: "Blog Titles", href: "/Dashboard/blog-titles", icon: Hash },
        { name: "Generate Images", href: "/Dashboard/generate-images", icon: ImageIcon },
        { name: "Remove Background", href: "/Dashboard/remove-background", icon: Eraser },
        { name: "Remove Object", href: "/Dashboard/remove-object", icon: Scissors },
        { name: "Review Resume", href: "/Dashboard/review-resume", icon: FileText },
        { name: "Community", href: "/Dashboard/community", icon: Users },
    ];

    return (
        <>
            <div className="flex min-h-screen bg-zinc-50">
                {/* Sidebar */}
                <aside className="w-16 sm:w-68 bg-white flex flex-col h-screen sticky top-0 border-r border-zinc-200">
                    {/* Logo */ }
                    <div className="h-[68px] px-2 sm:px-6 py-4 border-b border-zinc-200 bg-white flex items-center justify-center sm:justify-start shrink-0">
                        <Link href="/">
                            <div className="hidden sm:block">
                                <Image src="/assets/logo.svg" alt="InsightAI Logo" width={142} height={36} />
                            </div>
                            <div className="sm:hidden block">
                                <img src="/assets/icon1.png" alt="InsightAI Logo"/>
                            </div>
                        </Link>
                    </div>

                    {/* User Profile */}
                    <div className="px-2 sm:px-6 py-6">
                        <SignedIn>
                            <div className="flex flex-col items-center gap-2">
                                <div className="size-8 sm:size-10 rounded-full overflow-hidden">
                                    <Image src={user?.imageUrl || "/assets/user.png"} alt={user?.fullName || "User"} width={40} height={40} className="object-cover" />
                                </div>
                                <p className="hidden sm:block text-sm font-medium text-zinc-900 text-center">
                                    {user?.fullName || user?.primaryEmailAddress?.emailAddress || "Account"}
                                </p>
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <div className="flex flex-col items-center">
                                <div className="size-8 sm:size-10 rounded-full overflow-hidden mb-2">
                                    <Image src="/assets/user.png" alt="Guest" width={40} height={40} className="object-cover" />
                                </div>
                                <p className="hidden sm:block text-sm font-medium text-zinc-900 text-center">Guest</p>
                            </div>
                        </SignedOut>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-2 sm:px-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const IconComponent = item.icon;
                            return (
                                <Link key={item.href} href={item.href}
                                    title={item.name}
                                    className={`flex items-center justify-center sm:justify-start gap-3 px-2 sm:px-2.5 py-2.5 mb-2 rounded-lg transition-all text-sm font-medium ${
                                        isActive 
                                            ? "bg-linear-to-r from-orange-400 to-orange-500 text-white" 
                                            : "text-zinc-700 hover:bg-zinc-50"
                                    }`}
                                >
                                    <IconComponent size={20} strokeWidth={2} className="shrink-0" />
                                    <span className="hidden sm:inline">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Info Footer */}
                    <div className="hidden sm:block p-3 border-t border-zinc-100">
                        <div className="flex items-center gap-2">
                            <div className="size-10 rounded-full overflow-hidden shrink-0">
                                <Image src={user?.imageUrl || "/assets/user.png"} alt={user?.fullName || "User"} width={40} height={40} className="object-cover" />
                            </div>
                            <button type="button" onClick={openUserProfile} className="flex-1 min-w-0 text-left" >
                                <p className="text-xs font-medium text-zinc-900 truncate">
                                    {user?.fullName || "User"}
                                </p>
                                <p className="text-xs text-zinc-500">
                                    {isLoadingPlan ? "Loading..." : `${currentPlanName} Plan`}
                                </p>
                            </button>
                            <button type="button" onClick={() => signOut({ redirectUrl: "/" })} className="text-zinc-400 hover:text-zinc-600 cursor-pointer shrink-0" aria-label="Sign out" title="Sign out" >
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                    {/* Top Navbar */}
                    <header className="h-[68px] bg-white border-b border-zinc-200 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-10">
                        <h1 className="text-base sm:text-lg font-medium text-zinc-800">
                            {navItems.find(item => item.href === pathname)?.name || "Dashboard"}
                        </h1>
                        <div className="flex items-center gap-4">
                            {/* You can add extra navbar items like notifications or a mobile menu toggle here */}
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 bg-zinc-50 overflow-hidden relative">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
