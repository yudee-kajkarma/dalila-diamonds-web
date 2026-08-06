import { Metadata } from "next";
import SydBanner from "@/components/pages/sell-your-diamond/syd/SydBanner";
import SydHero from "@/components/pages/sell-your-diamond/syd/SydHero";
import SydTextSection from "@/components/pages/sell-your-diamond/syd/SydTextSection";
import SydListSection from "@/components/pages/sell-your-diamond/syd/SydListSection";
import SydProcess from "@/components/pages/sell-your-diamond/syd/SydProcess";
import SydValuation from "@/components/pages/sell-your-diamond/syd/SydValuation";
import SydWhyAntwerp from "@/components/pages/sell-your-diamond/syd/SydWhyAntwerp";
import SydAppointments from "@/components/pages/sell-your-diamond/syd/SydAppointments";
import SydSubmitSection from "@/components/pages/sell-your-diamond/syd/SydSubmitSection";
import SydFaq from "@/components/pages/sell-your-diamond/syd/SydFaq";
import SydStructuredData from "@/components/pages/sell-your-diamond/syd/SydStructuredData";
import SellDiamondsForm from "@/components/pages/sud/SellDiamondform";
import {
  SYD_CANONICAL_URL,
  SYD_PAGE_DESCRIPTION,
  SYD_PAGE_TITLE,
  getSydContent,
} from "@/lib/i18n/sydTranslations";

export const metadata: Metadata = {
  title: SYD_PAGE_TITLE,
  description: SYD_PAGE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SYD_CANONICAL_URL,
  },
  openGraph: {
    title: SYD_PAGE_TITLE,
    description: SYD_PAGE_DESCRIPTION,
    url: SYD_CANONICAL_URL,
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
    title: SYD_PAGE_TITLE,
    description: SYD_PAGE_DESCRIPTION,
    images: ["https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png"],
  },
};

export default function SellYourDiamondPage() {
  const content = getSydContent();

  return (
    <>
      <SydStructuredData />
      <main className="relative">
        <SydBanner content={content.banner} />
        <SydHero content={content.hero} />
        <SydTextSection content={content.quickAnswer} variant="white" />
        <SydListSection content={content.whatCanSubmit} variant="gray" />
        <SydProcess content={content.process} />
        <SydValuation content={content.valuation} />
        <SydWhyAntwerp content={content.whyAntwerp} />
        <SydListSection content={content.prepare} variant="white" />
        <SydTextSection content={content.withoutCertificate} variant="gray" />
        <SydAppointments content={content.appointments} />
        <SydFaq content={content.faqs} />
        <SydSubmitSection content={content.submitSection} />
        <div id="diamond-estimate-form">
          <SellDiamondsForm />
        </div>
      </main>
    </>
  );
}
