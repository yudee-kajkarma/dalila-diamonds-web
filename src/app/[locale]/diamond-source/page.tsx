import DiamondSourceBanner from "@/components/pages/diamond-source/Bannersection";
import DiamondSourceHero from "@/components/pages/diamond-source/Herosection";
import DiamondSourceshowcase from "@/components/pages/diamond-source/Showcase";
import DiamondSourceAdvantages from "@/components/pages/diamond-source/Advantage";
import DiamondContact from "@/components/pages/diamond-source/DiamondContact";
import SpecRequestForm from "@/components/pages/diamond-source/SpecRequestForm";

import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return generateLocalizedMetadata(locale, { pageKey: "ds4u", path: "/diamond-source" });
}

export default function Page() {
    return (
        <main className="relative">
            <DiamondSourceBanner />
            <DiamondSourceHero />
            <DiamondSourceshowcase />
            <DiamondSourceAdvantages />
            <SpecRequestForm />
            <DiamondContact />
        </main>
    );
}
