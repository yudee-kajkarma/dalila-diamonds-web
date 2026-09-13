"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DiamondStockTableWithFilter from "@/components/DiamondStockTableWithFilter";
import AccountStatusNotice from "@/components/AccountStatusNotice";

function InventoryContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const stoneId = searchParams.get('stone');
        if (stoneId) {
            console.log('Opening diamond detail for:', stoneId);
        }
    }, [searchParams]);

    return (
        <>
            {/*
              The table itself stays open to everyone - browsing stock is the
              point of the page. What is gated is acting on it: the cart and
              hold buttons only appear once signed in, and enquiries need an
              approved account. This says which step is outstanding instead of
              leaving the controls quietly missing.
            */}
            <AccountStatusNotice className="pt-24 pb-2" />
            <DiamondStockTableWithFilter />
        </>
    );
}

export default function Inventory() {
    return (
        <main className="relative">
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <InventoryContent />
            </Suspense>
        </main>
    );
}
