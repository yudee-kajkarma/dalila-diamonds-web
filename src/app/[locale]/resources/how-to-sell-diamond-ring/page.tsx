import HowToSellDiamondRing from "@/components/pages/resources/HowToSellDiamondRing";
import { generateResourceMetadata } from "@/lib/i18n/generateResourceMetadata";
import { getHowToSellDiamondRingData } from "@/lib/i18n/getHowToSellDiamondRingData";
import { Locale } from "@/lib/i18n/config";

const PATH = "/resources/how-to-sell-diamond-ring";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const pageData = getHowToSellDiamondRingData(locale);
  return {
    ...generateResourceMetadata(locale, PATH, pageData.meta, pageData.images),
    robots: { index: true, follow: true },
  };
}

export default async function HowToSellDiamondRingLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return <HowToSellDiamondRing locale={locale} />;
}
