import { Marcellus, Jost } from "next/font/google";
import ElongatedCushionBanner from "@/components/pages/resources/ElongatedCushionBanner";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { ContentSection } from "@/components/pages/seopage/SeoPageContent";
import { Metadata } from "next";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import { getGuideContent } from "@/lib/i18n/guideTranslations";

export const metadata: Metadata = {
    title: "Elongated Cushion Cut Diamond Guide | Dalila Diamonds",
    description: "Discover everything you need to know about elongated cushion cut diamonds — proportions, colour, clarity, settings and more. Expert guidance from Dalila Diamonds.",
    alternates: {
        canonical: "https://www.daliladiamonds.com/elongated-cushion-cut-diamond-guide",
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

export default async function ElongatedCushionCutDiamondGuidePage({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "en";

  const {
    introTitle,
    introContent,
    historySection,
    proportionsSection,
    facetSection,
    colourSection,
    claritySection,
    comparisonSection,
    settingSection,
    buyingAdviceSection,
    conclusionSection,
  } = getGuideContent(locale);

  const renderContentSection = (section: ContentSection) => {
    return (
      <div className="mb-12">
        <AnimatedContainer direction="up">
          <div className="bg-white">
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
                    <span className="text-[#c89e3a] mt-1 font-bold text-xl shrink-0">&bull;</span>
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
      <ElongatedCushionBanner />

      {/* Initial Content Section with Sidebar */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar */}
          <aside className="lg:w-56 w-full shrink-0">
            <AnimatedContainer direction="left">
              <div className="sticky top-4">
                <ResourceSidebar currentPage="elongated-cushion" />
              </div>
            </AnimatedContainer>
          </aside>

          {/* Right Content Area */}
          <main className="flex-1 w-full">
            <article className="pb-8">
              <div className="mb-12">
                <AnimatedContainer direction="up">
                  <div className="bg-white">
                    <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full"></div>
                    <h2 className={`text-3xl md:text-4xl lg:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}>
                      {introTitle}
                    </h2>
                    <div className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line ${jost.className}`}>
                      {introContent}
                    </div>
                  </div>
                </AnimatedContainer>
              </div>
            </article>
          </main>
        </div>
      </div>

      {/* Full Width Content Sections */}
      <div className="w-full">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(historySection[0])}
          {renderContentSection(proportionsSection[0])}
          {renderContentSection(facetSection[0])}
          {renderContentSection(colourSection[0])}
          {renderContentSection(claritySection[0])}
          {renderContentSection(comparisonSection[0])}
          {renderContentSection(settingSection[0])}
          {renderContentSection(buyingAdviceSection[0])}
          {renderContentSection(conclusionSection[0])}
        </div>
      </div>
    </div>
  );
}
