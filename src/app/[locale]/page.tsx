import dynamic from "next/dynamic";
import HeroSection from "@/components/pages/HeroSection";
import AboutDalila from "@/components/pages/homecomponents/AboutDalila";
import InstaSection from "@/components/InstagramSection";
import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return generateLocalizedMetadata(locale, { pageKey: "home", path: "/" });
}

const DiamondShapes = dynamic(
    () => import("@/components/pages/homecomponents/DiamondShapes"),
    {
        loading: () => (
            <div className="h-screen bg-gradient-to-b from-white to-gray-50" />
        ),
    },
);
const CertifiedBy = dynamic(
    () => import("@/components/pages/homecomponents/Certified"),
);
const HomeContent = dynamic(
    () => import("@/components/pages/homecomponents/homeContent"),
);
const BookComponent = dynamic(
    () => import("@/components/pages/homecomponents/BookComponent"),
);
const VideoContent = dynamic(
    () => import("@/components/pages/homecomponents/VideoContent"),
);
const DiamondSource = dynamic(
    () => import("@/components/pages/homecomponents/DiamondSource"),
);
const Experience = dynamic(
    () => import("@/components/pages/homecomponents/experience"),
);

export default function Page() {
    return (
        <main className="relative">
            <HeroSection />
            <AboutDalila />
            <DiamondShapes />
            <CertifiedBy />
            <HomeContent />
            <BookComponent />
            <VideoContent />
            <DiamondSource />
            <Experience />
            <InstaSection />
        </main>
    );
}
