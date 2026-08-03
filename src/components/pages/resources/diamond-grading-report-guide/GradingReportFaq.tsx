import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { marcellus, jost } from "./gradingReportFonts";

interface GradingReportFaqProps {
  content: GradingReportContent["faqs"];
}

export default function GradingReportFaq({ content }: GradingReportFaqProps) {
  if (content.items.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="grading-report-faq-heading">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="grading-report-faq-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-8 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>

        <div className="space-y-4">
          {content.items.map((item, index) => (
            <details
              key={item.question}
              className="group border border-gray-200 bg-white open:bg-[#FAF6EB]/40"
              open={index === 0}
            >
              <summary
                className={`cursor-pointer list-none px-5 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c89e3a] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden`}
              >
                <span className="flex items-start justify-between gap-4">
                  <h3 className={`text-lg text-gray-900 text-left ${marcellus.className}`}>{item.question}</h3>
                  <span
                    className="text-[#c89e3a] text-xl shrink-0 group-open:rotate-45 transition-transform"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </summary>
              <div className={`px-5 pb-5 text-gray-700 leading-relaxed ${jost.className}`}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
