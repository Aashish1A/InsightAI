import FaqSection from "@/sections/faq-section";
import FeaturesSection from "@/sections/features-section";
import HeroSection from "@/sections/hero-section";
import PricingSection from "@/sections/pricing-section";
import StatsSection from "@/sections/stats-section";
import TestimonialSection from "@/sections/testimonial-section";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import LenisScroll from "@/components/lenis";

export default function Page() {
    return (
        <>
            <LenisScroll />
            <Navbar />
            <main>
                <HeroSection />
                <StatsSection />
                <FeaturesSection />
                <FaqSection />
                <PricingSection />
                <TestimonialSection />
            </main>
            <Footer />
        </>
    );
}
