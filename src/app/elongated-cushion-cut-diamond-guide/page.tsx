import { marcellus, jost } from "@/lib/fonts";
import ElongatedCushionBanner from "@/components/pages/resources/ElongatedCushionBanner";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import Link from "next/link";
import type { ReactNode } from "react";
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

/**
 * Turn the phrases a section names into links, leaving the rest as written.
 *
 * The guide keeps its prose in one string per section, so a link cannot be
 * written into the text - React would escape it. Each phrase is quoted from
 * that language's own copy and its first occurrence becomes the anchor, which
 * keeps the sentence exactly as the author wrote it.
 */
function linkify(content: string, links?: ContentSection["links"]) {
  if (!links?.length) return content;

  // Longest first, so a phrase containing another is matched whole.
  const ordered = [...links].sort((a, b) => b.phrase.length - a.phrase.length);
  let parts: Array<string | ReactNode> = [content];

  for (const { phrase, href } of ordered) {
    const next: Array<string | ReactNode> = [];
    let placed = false;
    for (const part of parts) {
      if (placed || typeof part !== "string") {
        next.push(part);
        continue;
      }
      const at = part.toLowerCase().indexOf(phrase.toLowerCase());
      if (at < 0) {
        next.push(part);
        continue;
      }
      placed = true;
      next.push(
        part.slice(0, at),
        <Link
          key={href}
          href={href}
          className="text-[#9d7400] underline underline-offset-2 hover:text-[#c89e3a]"
        >
          {part.slice(at, at + phrase.length)}
        </Link>,
        part.slice(at + phrase.length),
      );
    }
    parts = next;
  }

  return parts.map((part, i) =>
    typeof part === "string" ? <span key={i}>{part}</span> : part,
  );
}

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
                {linkify(section.content, section.links)}
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
