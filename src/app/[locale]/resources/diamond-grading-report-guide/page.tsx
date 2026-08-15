import DiamondGradingGuide from "@/components/pages/resources/DiamondGradingGuide";
import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";
import { s3Asset } from "@/lib/s3Assets";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const base = generateLocalizedMetadata(locale, {
    pageKey: "gradingReport",
    path: "/resources/diamond-grading-report-guide",
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

export default async function DiamondGradingReportGuideLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;

  return <DiamondGradingGuide locale={locale} />;
}
