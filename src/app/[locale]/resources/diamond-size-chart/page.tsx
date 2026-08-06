import DiamondSizeChart from "@/components/pages/resources/DiamondSizeChart";
import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const base = generateLocalizedMetadata(locale, {
    pageKey: "sizeChart",
    path: "/resources/diamond-size-chart",
  });
  return {
    ...base,
    robots: {
      index: true,
      follow: true,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: base.title,
      description: base.description,
      images: ["https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png"],
    },
  };
}

export default async function DiamondSizeChartLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;

  return <DiamondSizeChart locale={locale} />;
}
