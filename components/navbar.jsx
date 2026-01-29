"use client";
import { links } from "@/data/links";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AnimatedContent from "./animated-content";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <AnimatedContent reverse>
                <nav className='fixed w-full top-0 z-50 px-4 md:px-16 lg:px-24 xl:px-32 py-4 border-b transition-all duration-300 border-neutral-300'>
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="">
                            <svg width="142" height="36" viewBox="0 0 142 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 1.5H12C6.201 1.5 1.5 6.201 1.5 12v12c0 5.799 4.701 10.5 10.5 10.5h12c5.799 0 10.5-4.701 10.5-10.5V12c0-5.799-4.701-10.5-10.5-10.5" fill="url(#a)"/><path opacity=".95" d="M22.5 9h-9a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3V12a3 3 0 0 0-3-3" fill="#fff"/><path d="M21.75 13.5h-7.5a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5m-1.5 3h-6a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5m-1.5 3h-4.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5" fill="#fdba74"/><path d="m24.75 7.5.9 2.4 2.85.6-2.85.825-.9 2.175-.9-2.175L21 10.5l2.85-.6z" fill="#fff"/><path d="M42.728 27V10.128h3.264V27zm14.19 0v-6.648q0-1.032-.647-1.68-.648-.648-1.68-.648-.672 0-1.2.288a2.17 2.17 0 0 0-.84.816q-.288.528-.288 1.224l-1.224-.624q0-1.368.576-2.376.6-1.032 1.632-1.608 1.056-.576 2.376-.576 1.272 0 2.28.648 1.008.624 1.584 1.656.576 1.008.576 2.184V27zm-7.8 0V15.408h3.145V27zm17.461.264A7.3 7.3 0 0 1 64.635 27a7.6 7.6 0 0 1-1.728-.72 5.6 5.6 0 0 1-1.368-1.152l1.872-1.896q.6.672 1.392 1.008a4.4 4.4 0 0 0 1.752.336q.768 0 1.152-.216.408-.216.408-.648 0-.48-.432-.744-.408-.264-1.08-.432-.672-.192-1.416-.408-.72-.24-1.392-.6a3.25 3.25 0 0 1-1.104-1.032q-.408-.672-.408-1.728 0-1.104.528-1.92.552-.816 1.56-1.272t2.376-.456q1.44 0 2.592.504 1.176.504 1.944 1.512l-1.896 1.896q-.528-.648-1.2-.936a3.45 3.45 0 0 0-1.416-.288q-.696 0-1.08.216-.36.216-.36.6 0 .432.408.672.432.24 1.104.432.672.168 1.392.408.744.216 1.392.624a3.2 3.2 0 0 1 1.08 1.08q.432.672.432 1.728 0 1.704-1.224 2.712-1.224.984-3.336.984M73.26 27V15.408h3.168V27zm1.584-13.464q-.768 0-1.272-.504a1.8 1.8 0 0 1-.504-1.296q0-.744.504-1.272t1.272-.528q.792 0 1.272.528.504.528.504 1.272 0 .768-.504 1.296-.48.504-1.272.504m9.217 18.6q-1.848 0-3.264-.672-1.416-.648-2.256-1.848l1.992-1.992q.672.792 1.488 1.2.84.432 2.016.432 1.464 0 2.304-.744.864-.744.864-2.064v-2.904L87.732 21l-.504-2.544v-3.048h3.12V26.4q0 1.728-.816 3-.792 1.296-2.208 2.016t-3.264.72m-.144-5.448q-1.56 0-2.808-.744a5.5 5.5 0 0 1-1.968-2.088q-.696-1.32-.696-2.952t.696-2.928a5.36 5.36 0 0 1 1.968-2.04q1.248-.768 2.808-.768 1.296 0 2.28.504 1.008.504 1.584 1.392.576.864.624 2.04v3.648a4 4 0 0 1-.648 2.064 3.95 3.95 0 0 1-1.584 1.392q-.984.48-2.256.48m.624-2.856q.864 0 1.488-.36.648-.384 1.008-1.032.36-.672.36-1.512 0-.864-.36-1.512a2.55 2.55 0 0 0-1.008-1.008q-.624-.384-1.488-.384t-1.512.384q-.648.36-1.008 1.032-.36.648-.36 1.488 0 .816.36 1.488.36.648 1.008 1.032t1.512.384M100.911 27v-6.648q0-1.032-.648-1.68t-1.68-.648q-.672 0-1.2.288a2.17 2.17 0 0 0-.84.816q-.288.528-.288 1.224l-1.224-.624q0-1.368.576-2.376a4.14 4.14 0 0 1 1.584-1.608q1.032-.576 2.352-.576t2.328.576a4.14 4.14 0 0 1 1.608 1.584q.576 1.008.576 2.328V27zm-7.8 0V9.648h3.144V27zm15.04 0V10.584h3.144V27zm-2.712-8.832v-2.76h8.568v2.76zM114.863 27l6.792-16.872h2.664L131.087 27h-3.48l-5.232-13.848h1.2L118.271 27zm3.6-3.144V21.12h9.072v2.736zM133.08 27V10.128h3.264V27z" fill="#0f172a"/><path d="m114.863 27 6.792-16.872h2.664L131.087 27h-3.48l-5.232-13.848h1.2L118.271 27zm3.6-3.144V21.12h9.072v2.736zM133.08 27V10.128h3.264V27z" fill="#f97316"/><defs><linearGradient id="a" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#fdba74"/><stop offset=".5" stop-color="#fb923c"/><stop offset="1" stop-color="#f97316"/></linearGradient></defs></svg>
                        </Link>

                        <div className="hidden md:flex gap-3">
                            {links.map((link) => (
                                <Link key={link.name} href={link.href} className="py-1 px-3 hover:text-zinc-500">
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <MenuIcon className="size-6.5" />
                        </button>

                        <Link href="" className="hidden md:inline-block py-2.5 px-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] bg-orange-500 text-white rounded-full">
                            Get Started
                        </Link>
                    </div>
                </nav>
            </AnimatedContent>
            <div className={`fixed top-0 right-0 z-60 w-full bg-white shadow-xl shadow-black/5 transition-all duration-300 ease-in-out ${isMenuOpen ? "h-92 overflow-hidden" : "h-0 overflow-hidden"}`}>
                <div className="flex items-center justify-between p-4">
                    <Image src="/assets/logo.svg" alt="InsightAI Logo" width={126} height={35} />
                    <XIcon className="size-6.5" onClick={() => setIsMenuOpen(false)} />
                </div>
                <div className="flex flex-col gap-4 p-4 text-base">
                    {links.map((link) => (
                        <Link key={link.name} href={link.href} className="py-1 px-3" onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </Link>
                    ))}
                    <Link href="" className="py-2.5 px-6 w-max text-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] bg-linear-to-tl from-orange-600 to-orange-500 text-white rounded-full">
                        Get Started
                    </Link>
                </div>
            </div>
        </>
    );
}
