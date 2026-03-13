import AnimatedContent from "@/components/animated-content";
import CustomIcon from "@/components/custom-icon";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { SparkleIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="bg-[url('/assets/hero-gradient-bg.png')] bg-cover bg-center bg-no-repeat px-4 md:px-16 lg:px-24 xl:px-32">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-screen">
                <AnimatedContent reverse distance={30} className="flex items-center gap-2 bg-white/50 backdrop-blur p-1 rounded-full">
                    <div className="flex items-center -space-x-3">
                        <Image className="size-7 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50" width={28} height={28} alt="userImage1" />
                        <Image className="size-7 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50" width={28} height={28} alt="userImage2" />
                    </div>
                    <div className="h-5 w-px mx-1 bg-white rounded-full" />
                    <span>AI-Powered Resume Builder & Content Suite</span>
                    <div className="h-5 w-px mx-1 bg-white rounded-full" />
                    <div className="flex items-center gap-1 pr-3">
                        <StarIcon className="size-4.5 fill-orange-500 stroke-orange-500" />
                        <span>4.9</span>
                    </div>
                </AnimatedContent>
                <AnimatedContent distance={30} delay={0.1} className="relative">
                    <h1 className="text-center font-urbanist text-5xl/tight md:text-7xl/tight mt-4 font-extrabold max-w-4xl tracking-tight">
                        Build Perfect Resumes <span className="text-5xl/tight md:text-7xl/tight font-extrabold bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">& AI Content Instantly</span>
                    </h1>
                    <div className="absolute -top-5 right-13 hidden md:block">
                        <CustomIcon icon={SparkleIcon} dir="right" />
                    </div>
                </AnimatedContent>
                <AnimatedContent distance={30} delay={0.2}>
                    <p className="text-center text-base/7 text-zinc-500 max-w-2xl mt-4">
                        Create ATS-optimized resumes, check compatibility scores, and generate articles & images—all AI-powered in one dashboard.
                    </p>
                </AnimatedContent>
                <AnimatedContent className="flex flex-col md:flex-row items-center gap-4 mt-6 w-full md:w-auto">
                    <SignedIn>
                        <Link href="/Dashboard" className="py-3 w-full md:w-auto px-8 border border-orange-200 bg-linear-to-tl from-orange-600 to-orange-500 text-white text-center rounded-full">
                           Build My Resume
                        </Link>
                        <Link href="/ATS-Checker" className="relative py-3 w-full md:w-auto px-8 bg-white/50 text-gray-600 font-medium text-center border border-white rounded-full">
                            Check ATS Score
                            <AnimatedContent direction="horizontal" className="absolute size-8 pointer-events-none right-0 top-full -translate-y-1/2">
                                <Image src="/assets/mouse-arrow.svg" alt="mouse-arrow" width={24} height={24} />
                            </AnimatedContent>
                        </Link>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="py-3 w-full md:w-auto px-8 border border-orange-200 bg-linear-to-tl from-orange-600 to-orange-500 text-white text-center rounded-full">
                               Build My Resume
                            </button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <button className="relative py-3 w-full md:w-auto px-8 bg-white/50 text-gray-600 font-medium text-center border border-white rounded-full">
                                Check ATS Score
                                <AnimatedContent direction="horizontal" className="absolute size-8 pointer-events-none right-0 top-full -translate-y-1/2">
                                    <Image src="/assets/mouse-arrow.svg" alt="mouse-arrow" width={24} height={24} />
                                </AnimatedContent>
                            </button>
                        </SignInButton>
                    </SignedOut>
                </AnimatedContent>
            </div>
        </section>
    );
}
