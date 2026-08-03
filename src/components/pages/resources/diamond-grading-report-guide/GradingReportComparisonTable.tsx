import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { SectionShell } from "./GradingReportShared";

interface GradingReportComparisonTableProps {
  content: GradingReportContent["comparisonTable"];
}

export default function GradingReportComparisonTable({ content }: GradingReportComparisonTableProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-12">
      <SectionShell
        id={content.id}
        title={content.title}
        paragraphs={content.introParagraphs}
        table={content.table.headers.length > 0 ? content.table : undefined}
      />
    </div>
  );
}
