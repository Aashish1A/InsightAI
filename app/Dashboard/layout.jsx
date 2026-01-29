"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, PenSquare, Hash, Image as ImageIcon, Eraser, Scissors, FileText, MoreVertical, FileEditIcon } from "lucide-react";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    
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
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <aside className="w-68 bg-white flex flex-col h-screen sticky top-0">
                    {/* Logo */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <Link href="/">
                            <svg width="126" height="35" viewBox="0 0 126 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.845 10.455 40.43 25h-3.075l2.415-14.545zm4.15 8.238L45.944 25h-3.019l1.818-10.91h2.877l-.313 1.926h.12a3.84 3.84 0 0 1 1.464-1.513q.952-.554 2.166-.554 1.137 0 1.896.497.768.498 1.08 1.413.32.917.107 2.195L52.975 25h-3.026l1.073-6.406q.163-1.002-.256-1.563-.412-.568-1.328-.568-.61 0-1.122.263a2.3 2.3 0 0 0-.86.767a3 3 0 0 0-.461 1.2m18.712-1.491-2.748.17a1.35 1.35 0 0 0-.2-.646 1.2 1.2 0 0 0-.503-.462q-.327-.17-.824-.17-.746 0-1.328.34-.584.343-.66.874a.6.6 0 0 0 .177.576q.24.234.973.397l1.917.398q1.535.327 2.216 1.087.69.76.49 1.988a3.44 3.44 0 0 1-.916 1.825q-.738.776-1.875 1.208-1.136.426-2.521.426-2.224 0-3.38-.909-1.159-.91-1.116-2.464l2.955-.157q.035.668.468 1.009.434.333 1.187.34.844.015 1.434-.347.597-.37.675-.895a.61.61 0 0 0-.213-.597q-.263-.227-.966-.376l-1.818-.377q-1.548-.32-2.223-1.143-.675-.825-.462-2.095a3.3 3.3 0 0 1 .845-1.74q.683-.732 1.755-1.123 1.08-.39 2.435-.39 2.124 0 3.197.873 1.08.874 1.03 2.38M66.576 25l1.818-10.91h3.025L69.601 25zm3.643-12.33q-.674 0-1.115-.447a1.27 1.27 0 0 1-.355-1.08q.079-.639.61-1.08a1.83 1.83 0 0 1 1.208-.447q.675 0 1.101.448.426.44.355 1.08-.07.624-.604 1.079a1.8 1.8 0 0 1-1.2.447m6.039 16.648q-1.477 0-2.465-.405-.98-.397-1.491-1.086a2.85 2.85 0 0 1-.554-1.549l2.87-.376q.077.334.297.618.228.284.647.454.426.17 1.1.17.988 0 1.72-.482.731-.476.901-1.598l.327-1.996h-.128q-.27.455-.738.86-.462.405-1.13.66-.66.256-1.527.256-1.235 0-2.145-.568-.9-.576-1.306-1.755-.398-1.186-.1-2.997.313-1.854 1.122-3.096.81-1.244 1.918-1.861a4.7 4.7 0 0 1 2.308-.618q.916 0 1.478.312.568.306.873.767.306.455.433.895h.121l.298-1.832h3.005l-1.833 11.016q-.22 1.398-1.058 2.33-.83.936-2.11 1.405-1.278.477-2.833.476m1.136-6.747q.724 0 1.3-.362.582-.37.973-1.051.39-.69.547-1.648.156-.96-.007-1.662-.156-.71-.611-1.1-.447-.392-1.18-.392-.752 0-1.32.405-.569.398-.945 1.108a5.4 5.4 0 0 0-.518 1.64q-.157.945-.014 1.634.149.682.59 1.059.44.369 1.185.369m11.378-3.878L87.721 25h-3.019l2.415-14.545h2.933l-.909 5.56h.121a3.9 3.9 0 0 1 1.442-1.512q.916-.554 2.166-.554 1.137 0 1.896.497.768.49 1.087 1.413.32.917.107 2.195L94.795 25h-3.019l1.066-6.406q.162-1.01-.263-1.57-.42-.56-1.335-.56-.618 0-1.137.262a2.4 2.4 0 0 0-.873.767a2.86 2.86 0 0 0-.462 1.2m16.01-4.602-.376 2.273h-6.577l.384-2.273zm-4.652-2.614h3.026l-1.69 10.17q-.072.42.021.654a.56.56 0 0 0 .305.32q.22.092.526.092.213 0 .433-.035l.334-.064.114 2.251a9 9 0 0 1-.689.17q-.427.093-1.009.114-1.109.043-1.875-.291-.767-.34-1.1-1.044-.334-.703-.143-1.768zM107.499 25h-3.296l7.437-14.545h3.963L118.202 25h-3.295l-1.769-11.222h-.113zm.753-5.717h7.784l-.412 2.4h-7.784zm17.191-8.829L123.028 25h-3.075l2.415-14.545z" fill="#111827"/><path d="M17.5 5.25 7 17.5M17.5 5.25 28 17.5m-21 0 10.5 12.25M28 17.5 17.5 29.75" stroke="#ff6900" strokeWidth="1.5"/><path d="M17.5 7.875a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25M7 20.125a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25m21 0a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25m-10.5 12.25a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25M17.5 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" fill="#ff6900"/></svg>  
                        </Link>
                    </div>

                    {/* User Profile */}
                    <div className="px-6 py-6">
                        <div className="flex flex-col items-center">
                            <div className="w-15 h-15 rounded-full overflow-hidden mb-2">
                                <Image  src="/assets/user.png"  alt="Aashish Kumar"  width={60}  height={60} className="object-cover" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">Aashish Kumar</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const IconComponent = item.icon;
                            return (
                                <Link key={item.href} href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg transition-all text-sm font-medium ${
                                        isActive 
                                            ? "bg-linear-to-r from-indigo-500 to-violet-500 text-white" 
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    <IconComponent size={18} strokeWidth={2} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Info Footer */}
                    <div className="p-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                                A
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-900 truncate">Aashish Kumar</p>
                                <p className="text-xs text-gray-500">Premium Plan</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 shrink-0">
                                <MoreVertical size={16} />
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
