'use client';

import AnimatedContent from "@/components/animated-content";
import SectionTitle from "@/components/section-title";
import { pricing } from "@/data/pricing";
import useCurrentPlan from "@/hooks/use-current-plan";
import NumberFlow from "@number-flow/react";
import { CheckIcon, CircleDollarSignIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { SignInButton } from "@clerk/nextjs";

export default function PricingSection() {
    const [planType, setPlanType] = useState('monthly');
    const billingPeriod = useMemo(() => (planType === 'monthly' ? 'month' : 'annual'), [planType]);
    const { isSignedIn, currentPlanId, currentPlanName, currentPlanSlug } = useCurrentPlan();

    const getCtaClassName = (planTypeName) =>
        `w-full text-center py-3 rounded-full mt-6 font-medium transition-colors ${planTypeName === 'enterprise' ? 'text-orange-500 bg-white hover:bg-gray-50' : 'text-zinc-700 bg-gray-50 hover:bg-gray-100 border border-gray-200'}`;

    const normalize = (value) => String(value || "").trim().toLowerCase();

    return (
        <section id="pricing" className="border-b border-gray-200 px-4 md:px-16 lg:px-24 xl:px-32">
            <div className="p-4 pt-20 flex flex-col items-center max-w-7xl mx-auto justify-center border-x border-gray-200">
                <SectionTitle icon={CircleDollarSignIcon} title="Simple, transparent pricing" subtitle="Choose a plan that fits your needs and get access to powerful AI tools without complexity." />
                <AnimatedContent className="p-1 mt-10 border border-orange-200 bg-orange-50 rounded-full">
                    <button className={`px-6 py-2 rounded-full cursor-pointer ${planType === 'monthly' ? 'bg-orange-500 text-white' : 'text-orange-500'}`} onClick={() => setPlanType('monthly')} >
                        Monthly
                    </button>
                    <button className={`relative px-6 py-2 rounded-full cursor-pointer ${planType === 'yearly' ? 'bg-orange-500 text-white' : 'text-orange-500'}`} onClick={() => setPlanType('yearly')} >
                        Yearly
                        <span className="absolute -top-8 -right-8 rotate-15 bg-green-100 rounded-full px-2 py-1 text-xs text-green-500">
                            20% OFF
                        </span>
                    </button>
                </AnimatedContent>
                <div className="flex flex-wrap items-stretch justify-center gap-6 px-4 mt-12 pb-20">
                    {pricing.map((plan, index) => {
                        const ctaClassName = getCtaClassName(plan.type);
                        const isPlanActive = isSignedIn && (
                            (plan.clerkPlanId && currentPlanId === plan.clerkPlanId) ||
                            normalize(currentPlanName) === normalize(plan.name) ||
                            normalize(currentPlanSlug) === normalize(plan.name)
                        );

                        return (
                            <AnimatedContent delay={index * 0.10} key={index} className={`relative p-6 w-full sm:w-80 rounded-2xl border border-gray-200 shadow-sm ${plan.type === 'enterprise' ? 'bg-orange-500 text-white' : plan.type === 'popular' ? 'bg-linear-to-br from-orange-50 to-orange-100' : 'bg-white'}`}>
                                {isPlanActive && (
                                    <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[11px] font-medium bg-green-100 text-green-700 border border-green-200">
                                        Active
                                    </span>
                                )}
                                <div className={`w-max border border-gray-200 p-2.5 rounded-lg ${plan.type === 'enterprise' ? 'text-white border-white/20' : 'text-orange-500 bg-white'}`}>
                                    <plan.icon size={22} />
                                </div>
                                <h3 className="text-xl font-semibold mt-5">{plan.name}</h3>
                                <p className={`text-sm mt-2 ${plan.type === 'enterprise' ? 'text-white/90' : 'text-zinc-500'}`}>
                                    {plan.description}
                                </p>
                                <div className="mt-6">
                                    <NumberFlow value={planType === 'monthly' ? plan.price : Math.floor(plan.price - plan.price * 0.2)} className="text-4xl font-bold" suffix="/mo" prefix="$" />
                                </div>
                                {isPlanActive ? (
                                    <button disabled className="w-full text-center py-3 rounded-full mt-6 font-medium border border-green-200 bg-green-100 text-green-700 cursor-not-allowed">
                                        Active
                                    </button>
                                ) : plan.clerkPlanId ? (
                                    isSignedIn ? (
                                        <CheckoutButton planId={plan.clerkPlanId} planPeriod={billingPeriod}>
                                            <button className={ctaClassName}>
                                                {plan.linkText}
                                            </button>
                                        </CheckoutButton>
                                    ) : (
                                        <SignInButton mode="modal">
                                            <button className={ctaClassName}>
                                                {plan.linkText}
                                            </button>
                                        </SignInButton>
                                    )
                                ) : (
                                    <a href={plan.linkUrl} className={`block ${ctaClassName}`}>
                                        {plan.linkText}
                                    </a>
                                )}
                                <div className="space-y-3 mt-8">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <CheckIcon className={`size-5 shrink-0 mt-0.5 ${plan.type === 'enterprise' ? 'text-white' : 'text-orange-500'}`} />
                                            <p className={`text-sm ${plan.type === 'enterprise' ? 'text-white/90' : 'text-zinc-600'}`}>
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </AnimatedContent>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
