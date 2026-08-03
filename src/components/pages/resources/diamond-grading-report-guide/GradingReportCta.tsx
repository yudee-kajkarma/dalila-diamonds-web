import Link from "next/link";
import { getLocalizedPath, Locale } from "@/lib/i18n/config";
import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { jost, marcellus } from "./gradingReportFonts";
import { RichParagraphList } from "./gradingReportRichText";

interface GradingReportCtaProps {
  content: GradingReportContent["cta"];
  locale?: Locale;
}

export default function GradingReportCta({ content, locale = "en" }: GradingReportCtaProps) {
  const localizedPath = (path: string) => getLocalizedPath(path, locale);

  return (
    <section
      id={content.id}
      className="scroll-mt-28 bg-slate-900 text-white py-12 md:py-16"
      aria-labelledby="grading-report-cta-heading"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full mx-auto" />
        <h2
          id="grading-report-cta-heading"
          className={`text-3xl md:text-4xl font-normal mb-6 ${marcellus.className}`}
        >
          {content.title}
        </h2>

        <div className="text-gray-200">
          <RichParagraphList paragraphs={content.richParagraphs} locale={locale} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href={localizedPath(content.primaryButtonHref)}
            className={`inline-flex items-center justify-center rounded-md bg-[#c89e3a] px-6 py-3 text-white font-medium hover:bg-[#b8902f] transition-colors ${jost.className}`}
          >
            {content.primaryButtonText}
          </Link>
          <Link
            href={localizedPath(content.secondaryButtonHref)}
            className={`inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors ${jost.className}`}
          >
            {content.secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
