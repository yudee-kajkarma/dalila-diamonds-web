import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { jost, marcellus } from "./gradingReportFonts";
import { SemanticBulletList } from "./gradingReportRichText";

interface GradingReportQuickAnswerProps {
  content: GradingReportContent["quickAnswer"];
}

export default function GradingReportQuickAnswer({ content }: GradingReportQuickAnswerProps) {
  const hasContent =
    content.introParagraphs.length > 0 || content.attributes.length > 0 || content.closingParagraphs.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <section className="bg-[#FAF6EB] border-y border-[#c89e3a]/20 py-10 md:py-12" aria-labelledby="grading-report-quick-answer">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <h2
          id="grading-report-quick-answer"
          className={`text-2xl md:text-3xl font-normal text-gray-900 mb-4 ${marcellus.className}`}
        >
          {content.title}
        </h2>
        {content.introParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className={`text-gray-800 leading-relaxed mb-3 ${jost.className}`}>
            {paragraph}
          </p>
        ))}
        <SemanticBulletList items={content.attributes} className="text-gray-800 mb-3" />
        {content.closingParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className={`text-gray-800 leading-relaxed mb-3 last:mb-0 ${jost.className}`}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
