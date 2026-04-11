"use client";

import { InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import AnimatedContent from "./animated-content";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="px-4 md:px-16 lg:px-24 xl:px-32">
            <div className="border-x border-gray-200 px-4 md:px-12 max-w-7xl mx-auto pt-40">
                <div className="flex flex-col md:flex-row items-start justify-between relative p-8 md:p-12 overflow-hidden pb-32 md:pb-42 bg-linear-to-t from-orange-50 to-orange-100 rounded-t-2xl">
                    <Image src="/assets/logo.svg" alt="Logo" width={126} height={35} className="h-62 w-auto absolute -bottom-18 opacity-7 select-none pointer-events-none" />
                    <AnimatedContent distance={40} className="max-w-72">
                        <Image src="/assets/logo.svg" alt="Logo" width={126} height={35} className="h-9" />
                        <p className="text-zinc-500 mt-4 pb-6">For further assistance or additional inquiries, feel free to contact us</p>
                    </AnimatedContent>
                    <div>
                        <p className="uppercase font-semibold text-orange-600 text-base">Social</p>
                        <AnimatedContent className="flex flex-col mt-6 gap-3">
                            <a href="https://x.com/Aashish1A" className="flex items-center gap-2 text-orange-500">
                                <TwitterIcon size={20} />
                                <p>Twitter</p>
                            </a>
                            <a href="https://www.linkedin.com/in/aashish1a/" className="flex items-center gap-2 text-orange-500">
                                <LinkedinIcon size={20} />
                                <p>Linkedin</p>
                            </a>
                            <a href="" className="flex items-center gap-2 text-orange-500">
                                <InstagramIcon size={20} />
                                <p>Instagram</p>
                            </a>
                        </AnimatedContent>
                    </div>

                    {/* Scroll to Top Button */}
                    <button onClick={scrollToTop} className="absolute bottom-0 right-1 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors z-20 cursor-pointer" aria-label="Scroll to top">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                    </button>
                </div>
            </div>
        </footer>
    );
}
