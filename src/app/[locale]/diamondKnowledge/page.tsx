import DiamondBanner from "@/components/pages/diamondknowledge/Bannersection";
import Diamondshowcase from "@/components/pages/diamondknowledge/Showcase";
import Diamondcuts from "@/components/pages/diamondknowledge/Diamondcuts";
import NaturalVsLabDiamonds from "@/components/pages/diamondknowledge/Lab-GrownDiamonds";
import DiamondShapeCuts from "@/components/pages/diamondknowledge/DiamondShapecuts";
import DiamondCertification from "@/components/pages/diamondknowledge/DiamondCertification";

import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return generateLocalizedMetadata(locale, { pageKey: "knowledge", path: "/diamondKnowledge" });
}

export default function Page() {
  return (
    <main className="relative">
      <DiamondBanner />
      <Diamondshowcase />
      <Diamondcuts />
      <NaturalVsLabDiamonds />
      <DiamondShapeCuts />
      <DiamondCertification />
    </main>
  );
}
