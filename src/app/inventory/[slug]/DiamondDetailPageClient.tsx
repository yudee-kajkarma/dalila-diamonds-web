"use client";

import { useRouter } from "next/navigation";
import DiamondDetailView from "@/components/DiamondDetailView";
import type { DiamondData } from "@/types/diamond.types";

// Renders the existing DiamondDetailView as a full page (not a modal overlay).
// extraContent is the SEO/product copy block from the server page.
export default function DiamondDetailPageClient({
  diamond,
  extraContent,
}: {
  diamond: DiamondData;
  extraContent: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <DiamondDetailView
      diamond={diamond}
      onClose={() => router.push("/inventory")}
      asPage
      extraContent={extraContent}
    />
  );
}
