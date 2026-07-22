import { Marcellus, Jost } from "next/font/google";
import PremiumB2BBanner from "@/components/pages/resources/PremiumB2BBanner";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import SeoPageShowcase, { ShowcaseSection } from "@/components/pages/seopage/SeoPageShowcase";
import { ContentSection } from "@/components/pages/seopage/SeoPageContent";
import { Metadata } from "next";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import { getB2bContent } from "@/lib/i18n/b2bTranslations";

export const metadata: Metadata = {
    title: "Premium B2B Diamond Supplier Belgium | Dalila Diamonds",
    description: "Dalila Diamonds offers premium B2B diamond supply in Belgium — certified quality, reliable service, and trusted sourcing for global businesses.",
    alternates: {
        canonical: "https://www.daliladiamonds.com/premium-b2b-diamond-supplier-belgium",
    },
};

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default async function PremiumB2BDiamondSupplierPage({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "en";

  const {
    trustedSupplierSection,
    initialSections,
    familyExpertiseSection,
    antwerpAuthoritySection,
    certificationSections,
    processSection,
    servicesSections,
    sellDiamondsSection,
    ethicsQualitySection,
    logisticsMarketSections,
    whyChooseUsSection,
    contactSection,
  } = getB2bContent(locale);

  // Helper function to render content sections
  const renderContentSection = (section: ContentSection) => {
    return (
      <div className="mb-12">
        <AnimatedContainer direction="up">
          <div className="bg-white">
            {/* Decorative Top Border */}
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full"></div>
            
            <h2
              className={`text-3xl md:text-4xl lg:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}
            >
              {section.title}
            </h2>
            
            {section.content && (
              <div
                className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line ${jost.className}`}
              >
                {section.content}
              </div>
            )}

            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className={`space-y-4 ${jost.className}`}>
                {section.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700 text-base md:text-lg leading-relaxed">
                    <span className="text-[#c89e3a] mt-1 font-bold text-xl shrink-0">•</span>
                    <span className="flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </AnimatedContainer>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <PremiumB2BBanner />
      
      {/* Initial Content Section with Sidebar */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar */}
          <aside className="lg:w-56 w-full shrink-0">
            <AnimatedContainer direction="left">
              <div className="sticky top-4">
                <ResourceSidebar currentPage="premium-b2b" />
              </div>
            </AnimatedContainer>
          </aside>
 
          {/* Right Content Area */}
          <main className="flex-1 w-full">
            <article className="pb-8">
              {renderContentSection(trustedSupplierSection[0])}
            </article>
          </main>
        </div>
      </div>

      {/* Full Width Content Sections */}
      <div className="w-full">
        <SeoPageShowcase sections={initialSections} />
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(familyExpertiseSection[0])}
          {renderContentSection(antwerpAuthoritySection[0])}
        </div>
        <SeoPageShowcase sections={certificationSections} />
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(processSection[0])}
        </div>
        <SeoPageShowcase sections={servicesSections} />
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(sellDiamondsSection[0])}
          {renderContentSection(ethicsQualitySection[0])}
        </div>
        <SeoPageShowcase sections={logisticsMarketSections} />
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(whyChooseUsSection[0])}
          {renderContentSection(contactSection[0])}
        </div>
      </div>
    </div>
  );
}
