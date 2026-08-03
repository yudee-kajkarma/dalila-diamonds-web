import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { jost, marcellus } from "./gradingReportFonts";

interface GradingReportHeroProps {
  content: GradingReportContent["hero"];
}

export default function GradingReportHero({ content }: GradingReportHeroProps) {
  return (
    <section className="bg-white py-10 md:py-14" aria-labelledby="grading-report-hero-heading">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <h1
          id="grading-report-hero-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-4 tracking-tight leading-tight ${marcellus.className}`}
        >
          {content.title}
        </h1>
        <p className={`text-lg md:text-xl text-gray-700 leading-relaxed mb-6 ${jost.className}`}>{content.subheading}</p>
        <p
          className={`inline-flex items-center rounded-full border border-[#c89e3a]/40 bg-[#FAF6EB] px-4 py-2 text-sm text-gray-800 ${jost.className}`}
        >
          <span className="font-medium">{content.reviewDateLabel}</span>
          <span className="ml-2">{content.reviewDate}</span>
        </p>
      </div>
    </section>
  );
}
