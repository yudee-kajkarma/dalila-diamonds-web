import DiamondQualityChart from "@/components/pages/resources/DiamondQualityChart";
import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";
import { s3Asset } from "@/lib/s3Assets";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const base = generateLocalizedMetadata(locale, {
    pageKey: "qualityChart",
    path: "/resources/diamond-quality-chart",
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
      images: [s3Asset("/dalila_img/Dalila_Logo.png")],
    },
  };
}

export default async function DiamondQualityChartLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;

  return <DiamondQualityChart locale={locale} />;
}
