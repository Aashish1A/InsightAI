"use client";
import CreationItem from "@/components/creation-item";
import useCurrentPlan from "@/hooks/use-current-plan";
import { dummyCreationData } from "@/public/assets/asset";
import { Gem, Sparkles } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
    const [creation] = useState(dummyCreationData);
    const [loading] = useState(false);
    const { currentPlanName, isLoadingPlan } = useCurrentPlan();

    return (
        <div className="h-full overflow-y-scroll p-6">
            <div className="flex justify-start gap-4 flex-wrap">
                {/* Total Creations Card */}
                <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
                    <div className="text-slate-600">
                        <p className="text-sm">Total Creations</p>
                        <h2 className="text-xl font-semibold">{creation.length}</h2>
                    </div>

                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
                        <Sparkles className="w-5 text-white" />
                    </div>
                </div>

                {/* Active Plan Card */}
                <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
                    <div className="text-slate-600">
                        <p className="text-sm">Active Plan</p>
                        <h2 className="text-xl font-semibold">
                            {isLoadingPlan ? "Loading..." : currentPlanName}
                        </h2>
                    </div>

                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
                        <Gem className="w-5 text-white" />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-3/4">
                    <div className="animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent"></div>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="mt-6 mb-4">Recent Creations</p>
                    {creation.map((item) => (
                        <CreationItem key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
