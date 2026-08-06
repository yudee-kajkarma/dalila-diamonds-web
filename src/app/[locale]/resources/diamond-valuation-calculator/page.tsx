import DiamondValuationCalculator from "@/components/pages/resources/DiamondValuationCalculator";
import { generateResourceMetadata } from "@/lib/i18n/generateResourceMetadata";
import { getDiamondValuationCalculatorData } from "@/lib/i18n/getDiamondValuationCalculatorData";
import { Locale } from "@/lib/i18n/config";

const PATH = "/resources/diamond-valuation-calculator";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const pageData = getDiamondValuationCalculatorData(locale);
  return {
    ...generateResourceMetadata(locale, PATH, pageData.meta, pageData.images),
    robots: { index: true, follow: true },
  };
}

export default async function DiamondValuationCalculatorLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return <DiamondValuationCalculator locale={locale} />;
}
