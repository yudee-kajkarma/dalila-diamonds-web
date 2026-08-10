import { Metadata } from "next";
import Ds4uBanner from "@/components/pages/diamond-source/ds4u/Ds4uBanner";
import Ds4uHero from "@/components/pages/diamond-source/ds4u/Ds4uHero";
import Ds4uWhatIs from "@/components/pages/diamond-source/ds4u/Ds4uWhatIs";
import Ds4uWhenToUse from "@/components/pages/diamond-source/ds4u/Ds4uWhenToUse";
import Ds4uComparison from "@/components/pages/diamond-source/ds4u/Ds4uComparison";
import Ds4uProcess from "@/components/pages/diamond-source/ds4u/Ds4uProcess";
import Ds4uRequestTypes from "@/components/pages/diamond-source/ds4u/Ds4uRequestTypes";
import Ds4uBeyond4cs from "@/components/pages/diamond-source/ds4u/Ds4uBeyond4cs";
import Ds4uTextSection from "@/components/pages/diamond-source/ds4u/Ds4uTextSection";
import Ds4uSubmitSection from "@/components/pages/diamond-source/ds4u/Ds4uSubmitSection";
import Ds4uFaq from "@/components/pages/diamond-source/ds4u/Ds4uFaq";
import Ds4uRequestForm from "@/components/pages/diamond-source/ds4u/Ds4uRequestForm";
import Ds4uStructuredData from "@/components/pages/diamond-source/ds4u/Ds4uStructuredData";
import {
  DS4U_CANONICAL_URL,
  DS4U_PAGE_DESCRIPTION,
  DS4U_PAGE_TITLE,
  getDs4uContent,
} from "@/lib/i18n/ds4uTranslations";

export const metadata: Metadata = {
  title: DS4U_PAGE_TITLE,
  description: DS4U_PAGE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: DS4U_CANONICAL_URL,
  },
  openGraph: {
    title: DS4U_PAGE_TITLE,
    description: DS4U_PAGE_DESCRIPTION,
    url: DS4U_CANONICAL_URL,
    siteName: "Dalila Diamonds",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DS4U_PAGE_TITLE,
    description: DS4U_PAGE_DESCRIPTION,
    images: ["https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png"],
  },
};

export default function DiamondSourcePage() {
  const content = getDs4uContent();

  return (
    <>
      <Ds4uStructuredData />
      <main className="relative">
        <Ds4uBanner content={content.banner} />
        <Ds4uHero content={content.hero} />
        <Ds4uWhatIs content={content.whatIs} />
        <Ds4uWhenToUse content={content.whenToUse} />
        <Ds4uComparison content={content.comparison} />
        <Ds4uProcess content={content.process} />
        <Ds4uRequestTypes content={content.requestTypes} />
        <Ds4uBeyond4cs content={content.beyond4cs} />
        <Ds4uTextSection content={content.certification} variant="white" linkMode="certification" />
        <Ds4uTextSection content={content.pricing} variant="gray" linkMode="pricing" />
        <Ds4uTextSection content={content.antwerp} variant="white" linkMode="antwerp" />
        <Ds4uTextSection content={content.whyDalila} variant="gray" linkMode="none" />
        <Ds4uSubmitSection content={content.submitSection} />
        <Ds4uRequestForm content={content.form} />
        <Ds4uFaq content={content.faqs} />
      </main>
    </>
  );
}
