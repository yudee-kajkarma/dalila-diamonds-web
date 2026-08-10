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
import {
  getS2sContent,
  S2S_CANONICAL_URL,
  S2S_PAGE_DESCRIPTION,
  S2S_PAGE_TITLE,
} from "@/lib/i18n/s2sTranslations";

export const metadata: Metadata = {
  title: S2S_PAGE_TITLE,
  description: S2S_PAGE_DESCRIPTION,
  alternates: {
    canonical: S2S_CANONICAL_URL,
  },
  openGraph: {
    title: S2S_PAGE_TITLE,
    description: S2S_PAGE_DESCRIPTION,
    url: S2S_CANONICAL_URL,
    siteName: "Dalila Diamonds",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: S2S_PAGE_TITLE,
    description: S2S_PAGE_DESCRIPTION,
    images: ["https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png"],
  },
};

export default function SecureToSourcePage() {
  const content = getS2sContent("en");

  return (
    <>
      <S2sStructuredData />
      <main className="relative">
        <S2sBanner content={content.banner} />
        <S2sHero content={content.hero} />
        <S2sDirectAnswer content={content.directAnswer} />
        <S2sStepsShowcase steps={content.steps} />
        <S2sWhoIsFor content={content.whoIsFor} />
        <S2sBenefits content={content.benefits} />
        <S2sComparison content={content.comparison} />
        <S2sChecklist content={content.checklist} />
        <S2sFaq content={content.faqs} />
        <S2sRequestForm content={content.form} />
        <S2sFinalCta content={content.finalCta} />
      </main>
    </>
  );
}
