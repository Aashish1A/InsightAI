'use client';

import { useAuth } from "@clerk/nextjs";
import { useSubscription } from "@clerk/nextjs/experimental";
import { useMemo } from "react";

const ACTIVE_STATUSES = new Set(["active", "past_due"]);

function pickActiveItem(subscription) {
    const items = subscription?.subscriptionItems || [];
    const activeItems = items.filter((item) => ACTIVE_STATUSES.has(item?.status));

    if (!activeItems.length) return null;

    return activeItems.find((item) => !item?.plan?.isDefault) || activeItems[0];
}

export default function useCurrentPlan() {
    const { isSignedIn } = useAuth();
    const { data, isLoading, isFetching } = useSubscription({ enabled: Boolean(isSignedIn) });

    const activeItem = useMemo(() => pickActiveItem(data), [data]);
    const activePlan = activeItem?.plan || null;

    return {
        isSignedIn: Boolean(isSignedIn),
        isLoadingPlan: Boolean(isSignedIn) && (isLoading || isFetching),
        currentPlanId: activePlan?.id || null,
        currentPlanName: activePlan?.name || "Free",
        currentPlanSlug: activePlan?.slug || "free",
    };
}
