import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { SectionShell } from "./GradingReportShared";

interface GradingReportChecklistProps {
  content: GradingReportContent["checklist"];
}

export default function GradingReportChecklist({ content }: GradingReportChecklistProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-12">
      <SectionShell
        id={content.id}
        title={content.title}
        paragraphsBefore={[content.introLead]}
        bullets={content.items}
      />
    </div>
  );
}
