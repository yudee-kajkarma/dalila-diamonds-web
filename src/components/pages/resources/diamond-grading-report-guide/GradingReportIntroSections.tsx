import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { SectionShell } from "./GradingReportShared";
import { jost } from "./gradingReportFonts";

interface GradingReportIntroProps {
  content: GradingReportContent["introduction"];
}

export default function GradingReportIntro({ content }: GradingReportIntroProps) {
  if (content.paragraphs.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-12">
      {content.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className={`text-gray-700 leading-relaxed mb-4 last:mb-0 ${jost.className}`}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

interface GradingReportWhatIsProps {
  content: GradingReportContent["whatIs"];
}

export function GradingReportWhatIs({ content }: GradingReportWhatIsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-12">
      <SectionShell
        id={content.id}
        title={content.title}
        paragraphsBefore={content.introParagraphs}
        bullets={content.establishItems}
        paragraphsAfter={content.closingParagraphs}
      />
    </div>
  );
}

interface GradingReportWhyMatterProps {
  content: GradingReportContent["whyMatter"];
}

export function GradingReportWhyMatter({ content }: GradingReportWhyMatterProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-12">
      <SectionShell
        id={content.id}
        title={content.title}
        paragraphsBefore={content.introParagraphs}
        bullets={content.helpItems}
        paragraphsAfter={content.closingParagraphs}
      />
    </div>
  );
}
