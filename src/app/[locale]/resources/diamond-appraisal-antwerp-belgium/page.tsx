import DiamondAppraisalAntwerp from "@/components/pages/resources/DiamondAppraisalAntwerp";
import { generateResourceMetadata } from "@/lib/i18n/generateResourceMetadata";
import { getDiamondAppraisalAntwerpData } from "@/lib/i18n/getDiamondAppraisalAntwerpData";
import { Locale } from "@/lib/i18n/config";

const PATH = "/resources/diamond-appraisal-antwerp-belgium";

export async function generateMetadata({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const pageData = getDiamondAppraisalAntwerpData(locale);
  return {
    ...generateResourceMetadata(locale, PATH, pageData.meta, pageData.images),
    robots: { index: true, follow: true },
  };
}

export default async function DiamondAppraisalAntwerpLocalePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return <DiamondAppraisalAntwerp locale={locale} />;
}
