import SecureSourceBanner from "@/components/pages/securesource/Bannersection";
import SecureSourceHero from "@/components/pages/securesource/Herosection";
import SecureSourceshowcase from "@/components/pages/securesource/Showcase";
import S2SAdvantages from "@/components/pages/securesource/Advantage";
import SecureContact from "@/components/pages/securesource/SecureContact";

import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return generateLocalizedMetadata(locale, { pageKey: "s2s", path: "/secure-to-source" });
}

export default function Page() {
    return (
        <main className="relative">
            <SecureSourceBanner />
            <SecureSourceHero />
            <SecureSourceshowcase />
            <S2SAdvantages />
            <SecureContact />
        </main>
    );
}
