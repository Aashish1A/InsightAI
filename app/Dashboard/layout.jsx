"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, PenSquare, Hash, Image as ImageIcon, Eraser, Scissors, FileText, FileEditIcon, LogOut } from "lucide-react";
import { Protect, SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const { user } = useUser();
    const { openUserProfile, signOut } = useClerk();
    
    const navItems = [
        { name: "Dashboard", href: "/Dashboard", icon: Home },
        { name: "Create Resume", href: "/Dashboard/resume-builder", icon: FileEditIcon },
        { name: "Write Article", href: "/Dashboard/write-article", icon: PenSquare },
        { name: "Blog Titles", href: "/Dashboard/blog-titles", icon: Hash },
        { name: "Generate Images", href: "/Dashboard/generate-images", icon: ImageIcon },
        { name: "Remove Background", href: "/Dashboard/remove-background", icon: Eraser },
        { name: "Remove Object", href: "/Dashboard/remove-watermark", icon: Scissors },
        { name: "Review Resume", href: "/Dashboard/review-resume", icon: FileText },
    ];

    return (
        <>
            <div className="flex min-h-screen bg-zinc-50">
                {/* Sidebar */}
                <aside className="w-68 bg-white flex flex-col h-screen sticky top-0">
                    {/* Logo */}
                    <div className="px-6 py-4 border-b border-zinc-200 bg-white flex items-center justify-start">
                        <Link href="/">
                            <Image src="/assets/logo.svg" alt="InsightAI Logo" width={142} height={36} />
                        </Link>
                    </div>

                    {/* User Profile */}
                    <div className="px-6 py-6">
                        <SignedIn>
                            <div className="flex flex-col items-center gap-2">
                                <div className="size-10 rounded-full overflow-hidden">
                                    <Image src={user?.imageUrl || "/assets/user.png"} alt={user?.fullName || "User"} width={40} height={40} className="object-cover" />
                                </div>
                                <p className="text-sm font-medium text-zinc-900">
                                    {user?.fullName || user?.primaryEmailAddress?.emailAddress || "Account"}
                                </p>
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <div className="flex flex-col items-center">
                                <div className="size-10 rounded-full overflow-hidden mb-2">
                                    <Image src="/assets/user.png" alt="Guest" width={40} height={40} className="object-cover" />
                                </div>
                                <p className="text-sm font-medium text-zinc-900">Guest</p>
                            </div>
                        </SignedOut>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const IconComponent = item.icon;
                            return (
                                <Link key={item.href} href={item.href}
                                    className={`flex items-center gap-3 px-2.5 py-2.5 mb-1 rounded-lg transition-all text-sm font-medium ${
                                        isActive 
                                            ? "bg-linear-to-r from-orange-400 to-orange-500 text-white" 
                                            : "text-zinc-700 hover:bg-zinc-50"
                                    }`}
                                >
                                    <IconComponent size={18} strokeWidth={2} />
                                    <span className="">{item.name}</span>
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
                                    <Protect plan="premium" fallback="Free Plan">
                                        Premium Plan
                                    </Protect>
                                </p>
                            </button>
                            <button type="button" onClick={() => signOut({ redirectUrl: "/" })} className="text-zinc-400 hover:text-zinc-600 cursor-pointer shrink-0" aria-label="Sign out" title="Sign out" >
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </>
    );
}
