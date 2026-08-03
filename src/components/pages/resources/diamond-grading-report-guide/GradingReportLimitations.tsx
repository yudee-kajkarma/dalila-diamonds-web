import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { SectionShell } from "./GradingReportShared";
import { SemanticBulletList } from "./gradingReportRichText";
import { jost, marcellus } from "./gradingReportFonts";

interface GradingReportLimitationsProps {
  content: GradingReportContent["limitations"];
}

export default function GradingReportLimitations({ content }: GradingReportLimitationsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-12">
      <SectionShell id={content.id} title={content.title} paragraphs={content.introParagraphs} />

      {content.subsections.length > 0 && (
        <div className="space-y-8 mt-8">
          {content.subsections.map((subsection) => (
            <div key={subsection.title}>
              <h3 className={`text-xl md:text-2xl font-normal text-gray-900 mb-4 ${marcellus.className}`}>
                {subsection.title}
              </h3>
              {subsection.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className={`text-gray-700 leading-relaxed mb-4 ${jost.className}`}>
                  {paragraph}
                </p>
              ))}
              {subsection.bullets && subsection.bullets.length > 0 ? (
                <SemanticBulletList items={subsection.bullets} />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
