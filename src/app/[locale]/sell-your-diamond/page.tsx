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
import { generateLocalizedMetadata } from "@/lib/i18n/generateLocalizedMetadata";
import { Locale } from "@/lib/i18n/config";
import { getSydContent } from "@/lib/i18n/sydTranslations";

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale || "en") as Locale;
  return generateLocalizedMetadata(locale, { pageKey: "syd", path: "/sell-your-diamond" });
}

export default function SellYourDiamondLocalePage() {
  // English-only for now — no locale translation work
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
