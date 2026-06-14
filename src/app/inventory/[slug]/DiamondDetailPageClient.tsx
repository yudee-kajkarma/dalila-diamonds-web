"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { DiamondData } from "@/types/diamond.types";
import { diamondApi } from "@/lib/api";

// Render DiamondDetailView client-only. It's a full-screen modal component
// built for the browser (uses window/document early, depends on browser
// state) and SSR was throwing in production. SEO content (H1, description,
// FAQ, JSON-LD) lives in the server page.tsx, so indexability is unaffected.
const DiamondDetailView = dynamic(() => import("@/components/DiamondDetailView"), {
  ssr: false,
  loading: () => <div className="min-h-[600px] bg-white" />,
});

function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("authToken")) return true;
  return document.cookie.split(";").some((c) => c.trim().startsWith("authToken="));
}

const norm = (v: unknown) => String(v ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");

const mediaStr = (v: unknown) => {
  const s = String(v ?? "").trim();
  return s.toLowerCase() === "false" ? "" : s;
};

export default function DiamondDetailPageClient({ diamond }: { diamond: DiamondData }) {
  const router = useRouter();
  // Server data comes from the public /safe API which has no pricing, so
  // NET_VALUE/RAP_PRICE/DISC_PER arrive as 0. For logged-in users we fetch
  // the authenticated record (which includes price) and overlay just the
  // price fields, so the price section shows real values instead of $0.00.
  const [current, setCurrent] = useState<DiamondData>(diamond);
  // Start in loading state only for logged-in users (they're the only ones
  // who will see a price block); resolved once the authenticated fetch ends.
  const [priceLoading, setPriceLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoggedIn()) return;
    const stoneNo = diamond.STONE_NO;
    if (!stoneNo) return;

    let cancelled = false;
    setPriceLoading(true);
    (async () => {
      try {
        const res = await diamondApi.search({ searchTerm: stoneNo, limit: 200 });
        const list = Array.isArray(res?.data)
          ? res.data
          : (res?.data as { diamonds?: DiamondData[] })?.diamonds ?? [];
        const target = norm(stoneNo);
        const match = (list as DiamondData[]).find(
          (d) => norm(d.STONE_NO) === target || norm(d.diamondId) === norm(diamond.diamondId),
        );
        if (match && !cancelled) {
          setCurrent((prev) => ({
            ...prev,
            NET_VALUE: match.NET_VALUE ?? prev.NET_VALUE,
            RAP_PRICE: match.RAP_PRICE ?? prev.RAP_PRICE,
            DISC_PER: match.DISC_PER ?? prev.DISC_PER,
            NET_RATE: match.NET_RATE ?? prev.NET_RATE,
            REAL_IMAGE: mediaStr(match.REAL_IMAGE) || prev.REAL_IMAGE,
            MP4: mediaStr(match.MP4) || prev.MP4,
            HandVideo: mediaStr(match.HandVideo) || prev.HandVideo,
            TweezerVideo: mediaStr(match.TweezerVideo) || prev.TweezerVideo,
            CERTI_PDF: mediaStr(match.CERTI_PDF) || prev.CERTI_PDF,
          }));
        }
      } catch {
        /* leave server data as-is */
      } finally {
        if (!cancelled) setPriceLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [diamond]);

  return (
    <DiamondDetailView
      diamond={current}
      onClose={() => router.push("/inventory")}
      asPage
      priceLoading={priceLoading}
    />
  );
}
