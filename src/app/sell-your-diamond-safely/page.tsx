import { Marcellus, Jost } from "next/font/google";
import SellDiamondBanner from "@/components/pages/resources/SellDiamondBanner";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import SeoPageShowcase, { ShowcaseSection } from "@/components/pages/seopage/SeoPageShowcase";
import { ContentSection } from "@/components/pages/seopage/SeoPageContent";
import { Metadata } from "next";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import { getSellContent } from "@/lib/i18n/sellTranslations";

export const metadata: Metadata = {
    title: "Sell Your Diamond Safely in Belgium | Dalila Diamonds",
    description: "Sell your diamond safely with Dalila Diamonds in Belgium — trusted B2B buyer offering secure transactions, fair value, and expert service for businesses.",
    alternates: {
        canonical: "https://www.daliladiamonds.com/sell-your-diamond-safely",
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

export default async function SellYourDiamondSafelyPage({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "en";

  const {
    whySellingSection,
    valueSections,
    preparingSection,
    sellingProcessSection,
    servicesSections,
    safetyTipsSection,
    commonMistakesSection,
    bestPriceSection,
    sellerSections,
    finalChecklistSection,
    conclusionSection,
    faqsSection,
  } = getSellContent(locale);

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
    <div className={`${marcellus.variable} ${jost.variable} bg-white min-h-screen`}>
      <SellDiamondBanner />
      
      {/* Initial Content Section with Sidebar */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar */}
          <aside className="lg:w-56 w-full shrink-0">
            <AnimatedContainer direction="left">
              <div className="sticky top-4">
                <ResourceSidebar currentPage="sell-diamond" />
              </div>
            </AnimatedContainer>
          </aside>

          {/* Right Content Area */}
          <main className="flex-1 w-full">
            <article className="pb-8">
              {renderContentSection(whySellingSection[0])}
            </article>
          </main>
        </div>
      </div>

      {/* Full Width Content Sections */}
      <div className="w-full">
        <SeoPageShowcase sections={valueSections} />
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(preparingSection[0])}
          {renderContentSection(sellingProcessSection[0])}
        </div>
        <SeoPageShowcase sections={servicesSections} />
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(safetyTipsSection[0])}
          {renderContentSection(commonMistakesSection[0])}
          {renderContentSection(bestPriceSection[0])}
        </div>
        <SeoPageShowcase sections={sellerSections} />
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(finalChecklistSection[0])}
          {renderContentSection(conclusionSection[0])}
          {renderContentSection(faqsSection[0])}
        </div>
      </div>
    </div>
  );
}
