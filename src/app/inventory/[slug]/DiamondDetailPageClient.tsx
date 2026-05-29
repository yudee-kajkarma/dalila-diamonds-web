"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { DiamondData } from "@/types/diamond.types";

// Render DiamondDetailView client-only. It's a full-screen modal component
// built for the browser (uses window/document early, depends on browser
// state) and SSR was throwing in production. SEO content (H1, description,
// FAQ, JSON-LD) lives in the server page.tsx, so indexability is unaffected.
const DiamondDetailView = dynamic(() => import("@/components/DiamondDetailView"), {
  ssr: false,
  loading: () => <div className="min-h-[600px] bg-white" />,
});

export default function DiamondDetailPageClient({ diamond }: { diamond: DiamondData }) {
  const router = useRouter();
  return (
    <DiamondDetailView
      diamond={diamond}
      onClose={() => router.push("/inventory")}
      asPage
    />
  );
}
