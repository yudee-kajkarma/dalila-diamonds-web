import { Metadata } from "next";
import S2sBanner from "@/components/pages/securesource/S2sBanner";
import S2sHero from "@/components/pages/securesource/S2sHero";
import S2sDirectAnswer from "@/components/pages/securesource/S2sDirectAnswer";
import S2sStepsShowcase from "@/components/pages/securesource/S2sStepsShowcase";
import S2sWhoIsFor from "@/components/pages/securesource/S2sWhoIsFor";
import S2sBenefits from "@/components/pages/securesource/S2sBenefits";
import S2sComparison from "@/components/pages/securesource/S2sComparison";
import S2sChecklist from "@/components/pages/securesource/S2sChecklist";
import S2sFaq from "@/components/pages/securesource/S2sFaq";
import S2sRequestForm from "@/components/pages/securesource/S2sRequestForm";
import S2sFinalCta from "@/components/pages/securesource/S2sFinalCta";
import S2sStructuredData from "@/components/pages/securesource/S2sStructuredData";
import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";
import { getS2sContent } from "@/lib/i18n/s2sTranslations";

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const base = generateLocalizedMetadata(locale, { pageKey: "s2s", path: "/secure-to-source" });
  return {
    ...base,
    twitter: {
      card: "summary_large_image" as const,
      title: base.title,
      description: base.description,
      images: ["https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png"],
    },
  };
}

export default async function SecureToSourcePage({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  const content = getS2sContent(locale);

  return (
    <>
      <S2sStructuredData />
      <main className="relative">
        <S2sBanner content={content.banner} locale={locale} />
        <S2sHero content={content.hero} locale={locale} />
        <S2sDirectAnswer content={content.directAnswer} locale={locale} />
        <S2sStepsShowcase steps={content.steps} locale={locale} />
        <S2sWhoIsFor content={content.whoIsFor} />
        <S2sBenefits content={content.benefits} />
        <S2sComparison content={content.comparison} locale={locale} />
        <S2sChecklist content={content.checklist} />
        <S2sFaq content={content.faqs} />
        <S2sRequestForm content={content.form} />
        <S2sFinalCta content={content.finalCta} locale={locale} />
      </main>
    </>
  );
}
