import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { marcellus } from "./gradingReportFonts";
import { SemanticBulletList } from "./gradingReportRichText";

interface GradingReportKeyTakeawaysProps {
  content: GradingReportContent["keyTakeaways"];
}

export default function GradingReportKeyTakeaways({ content }: GradingReportKeyTakeawaysProps) {
  if (content.items.length === 0) {
    return null;
  }

  return (
    <section className="py-10 md:py-12" aria-labelledby="grading-report-key-takeaways">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="grading-report-key-takeaways"
          className={`text-3xl md:text-4xl font-normal text-gray-900 mb-6 ${marcellus.className}`}
        >
          {content.title}
        </h2>
        <SemanticBulletList items={content.items} />
      </div>
    </section>
  );
}
