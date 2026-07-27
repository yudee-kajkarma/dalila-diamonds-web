import WebuyBanner from "@/components/pages/sud/Bannersection";
import Webuyhero from "@/components/pages/sud/Herosection";
import SellDiamondsProcess from "@/components/pages/sud/SellDiamond";
import SellDiamondsForm from "@/components/pages/sud/SellDiamondform";
import FreeEstimateSteps from "@/components/pages/sud/FreeEstimateSteps";

import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return generateLocalizedMetadata(locale, { pageKey: "syd", path: "/sud" });
}

export default function Page() {
    return (
        <main className="relative">
            <WebuyBanner />
            <Webuyhero />
            <SellDiamondsProcess />
            <FreeEstimateSteps />
            <SellDiamondsForm />
        </main>
    );
}
