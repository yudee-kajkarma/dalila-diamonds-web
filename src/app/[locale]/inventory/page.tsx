"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DiamondStockTableWithFilter from "@/components/DiamondStockTableWithFilter";

function InventoryContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const stoneId = searchParams.get('stone');
        if (stoneId) {
            console.log('Opening diamond detail for:', stoneId);
        }
    }, [searchParams]);

    return <DiamondStockTableWithFilter />;
}

export default function Page() {
    return (
        <main className="relative">
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <InventoryContent />
            </Suspense>
        </main>
    );
}
