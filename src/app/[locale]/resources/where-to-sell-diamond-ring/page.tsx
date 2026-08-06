import WhereToSellDiamondRing from "@/components/pages/resources/WhereToSellDiamondRing";
import { generateResourceMetadata } from "@/lib/i18n/generateResourceMetadata";
import { getWhereToSellDiamondRingData } from "@/lib/i18n/getWhereToSellDiamondRingData";
import { Locale } from "@/lib/i18n/config";

const PATH = "/resources/where-to-sell-diamond-ring";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const pageData = getWhereToSellDiamondRingData(locale);
  return {
    ...generateResourceMetadata(locale, PATH, pageData.meta, pageData.images),
    robots: { index: true, follow: true },
  };
}

export default async function WhereToSellDiamondRingLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return <WhereToSellDiamondRing locale={locale} />;
}
