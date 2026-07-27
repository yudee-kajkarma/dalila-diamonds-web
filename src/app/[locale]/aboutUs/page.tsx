import AboutBanner from "@/components/pages/aboutus/Bannersection";
import AboutHero from "@/components/pages/aboutus/Herosection";
import Legacy from "@/components/pages/aboutus/Legacy";
import Aboutshowcase from "@/components/pages/aboutus/Showcase";
import CertifiedBy from "@/components/pages/homecomponents/Certified";
import DiamondExperience from "@/components/pages/homecomponents/experience";
import AboutMilestone from "@/components/pages/aboutus/MileStone";
import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return generateLocalizedMetadata(locale, { pageKey: "about", path: "/aboutUs" });
}

export default function Page() {
    return (
        <main className="relative">
            <AboutBanner />
            <AboutHero />
            <DiamondExperience />
            <Legacy />
            <AboutMilestone />
            <Aboutshowcase />
            <CertifiedBy />
        </main>
    );
}
