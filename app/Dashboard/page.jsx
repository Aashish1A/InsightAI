"use client";
import { dummyCreationData } from "@/public/assets/asset";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [creation, setCreation] = useState([]);

    const getDashboardData = async () => {
        setCreation(dummyCreationData);
    }

    useEffect(() => {
        getDashboardData();
    }, []);

    return (
        <div className="h-full overflow-y-scroll p-6">
            <h1>Dashboard</h1>
        </div>
    );
}