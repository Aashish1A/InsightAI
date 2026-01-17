'use client';

import AnimatedContent from "@/components/animated-content";
import SectionTitle from "@/components/section-title";
import { pricing } from "@/data/pricing";
import NumberFlow from "@number-flow/react";
import { CheckIcon, CircleDollarSignIcon } from "lucide-react";
import { useState } from "react";

export default function PricingSection() {
    const [planType, setPlanType] = useState('monthly');
    return (
        <section id="pricing" className="border-b border-gray-200 px-4 md:px-16 lg:px-24 xl:px-32">
            <div className="p-4 pt-20 flex flex-col items-center max-w-7xl mx-auto justify-center border-x border-gray-200">
                <SectionTitle
                    icon={CircleDollarSignIcon}
                    title="Simple, transparent pricing"
                    subtitle="Choose a plan that fits your needs and get access to powerful AI tools without complexity."
                />
                <AnimatedContent className="p-1 mt-10 border border-orange-200 bg-orange-50 rounded-full">
                    <button
                        className={`px-6 py-2 rounded-full cursor-pointer ${planType === 'monthly' ? 'bg-orange-500 text-white' : 'text-orange-500'}`}
                        onClick={() => setPlanType('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`relative px-6 py-2 rounded-full cursor-pointer ${planType === 'yearly' ? 'bg-orange-500 text-white' : 'text-orange-500'}`}
                        onClick={() => setPlanType('yearly')}
                    >
                        Yearly
                        <span className="absolute -top-8 -right-8 rotate-15 bg-green-100 rounded-full px-2 py-1 text-xs text-green-500">
                            20% OFF
                        </span>
                    </button>
                </AnimatedContent>
                <div className="flex flex-wrap items-stretch justify-center gap-6 px-4 mt-12 pb-20">
                    {pricing.map((plan, index) => (
                        <AnimatedContent delay={index * 0.10} key={index} className={`p-6 w-full sm:w-80 rounded-2xl border border-gray-200 shadow-sm ${plan.type === 'enterprise' ? 'bg-orange-500 text-white' : plan.type === 'popular' ? 'bg-linear-to-br from-orange-50 to-orange-100' : 'bg-white'}`}>
                            <div className={`w-max border border-gray-200 p-2.5 rounded-lg ${plan.type === 'enterprise' ? 'text-white border-white/20' : 'text-orange-500 bg-white'}`}>
                                <plan.icon size={22} />
                            </div>
                            <h3 className="text-xl font-semibold mt-5">{plan.name}</h3>
                            <p className={`text-sm mt-2 ${plan.type === 'enterprise' ? 'text-white/90' : 'text-zinc-500'}`}>
                                {plan.description}
                            </p>
                            <div className="mt-6">
                                <NumberFlow
                                    value={planType === 'monthly' ? plan.price : Math.floor(plan.price - plan.price * 0.2)}
                                    className="text-4xl font-bold"
                                    suffix="/mo"
                                    prefix="$"
                                />
                            </div>
                            <a href={plan.linkUrl} className={`block text-center py-3 rounded-full mt-6 font-medium transition-colors ${plan.type === 'enterprise' ? 'text-orange-500 bg-white hover:bg-gray-50' : 'text-zinc-700 bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}>
                                {plan.linkText}
                            </a>
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
                    ))}
                </div>
            </div>
        </section>
    )
}
