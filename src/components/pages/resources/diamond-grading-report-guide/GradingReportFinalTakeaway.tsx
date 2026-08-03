import Link from "next/link";
import { getLocalizedPath, Locale } from "@/lib/i18n/config";
import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { jost, marcellus } from "./gradingReportFonts";
import { SemanticBulletList } from "./gradingReportRichText";

interface GradingReportFinalTakeawayProps {
  content: GradingReportContent["finalTakeaway"];
  locale?: Locale;
}

export default function GradingReportFinalTakeaway({ content, locale = "en" }: GradingReportFinalTakeawayProps) {
  const localizedPath = (path: string) => getLocalizedPath(path, locale);

  return (
    <section
      id={content.id}
      className="scroll-mt-28 bg-[#FAF6EB] py-12 md:py-16 border-t border-[#c89e3a]/20"
      aria-labelledby="grading-report-final-takeaway-heading"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="grading-report-final-takeaway-heading"
          className={`text-3xl md:text-4xl font-normal text-gray-900 mb-6 ${marcellus.className}`}
        >
          {content.title}
        </h2>

        {content.introParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className={`text-gray-700 leading-relaxed mb-4 ${jost.className}`}>
            {paragraph}
          </p>
        ))}

        <p className={`text-gray-700 leading-relaxed mb-2 ${jost.className}`}>{content.doNotAskLead}</p>
        <SemanticBulletList items={content.doNotAskItems} />

        <p className={`text-gray-700 leading-relaxed mb-2 ${jost.className}`}>{content.askLead}</p>
        <SemanticBulletList items={content.askItems} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
          <Link
            href={localizedPath(content.primaryButtonHref)}
            className={`inline-flex items-center justify-center rounded-md bg-[#c89e3a] px-6 py-3 text-white font-medium hover:bg-[#b8902f] transition-colors ${jost.className}`}
          >
            {content.primaryButtonText}
          </Link>
          <Link
            href={localizedPath(content.secondaryButtonHref)}
            className={`inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-gray-900 font-medium hover:bg-white transition-colors ${jost.className}`}
          >
            {content.secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
