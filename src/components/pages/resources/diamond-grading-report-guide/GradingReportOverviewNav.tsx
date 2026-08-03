import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { jost, marcellus } from "./gradingReportFonts";

interface GradingReportOverviewNavProps {
  content: GradingReportContent["overviewNav"];
}

export default function GradingReportOverviewNav({ content }: GradingReportOverviewNavProps) {
  return (
    <nav className="py-10 md:py-12 bg-slate-50 border-y border-slate-200" aria-labelledby="grading-report-overview-nav">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="grading-report-overview-nav"
          className={`text-3xl md:text-4xl font-normal text-gray-900 mb-6 ${marcellus.className}`}
        >
          {content.title}
        </h2>
        <ol className={`space-y-3 list-decimal list-inside ${jost.className}`}>
          {content.items.map((item) => (
            <li key={item.id} className="text-gray-700 leading-relaxed">
              <a href={`#${item.id}`} className="text-[#1a1a1a] hover:text-[#c89e3a] underline-offset-2 hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
