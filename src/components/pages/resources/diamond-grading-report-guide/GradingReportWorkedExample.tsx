import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { SectionShell } from "./GradingReportShared";

interface GradingReportWorkedExampleProps {
  content: GradingReportContent["workedExample"];
}

export default function GradingReportWorkedExample({ content }: GradingReportWorkedExampleProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-12">
      <SectionShell
        id={content.id}
        title={content.title}
        paragraphsBefore={content.introParagraphs}
        bullets={content.introBullets ?? []}
        numberedSteps={content.steps}
        paragraphsAfter={content.closingParagraph ? [content.closingParagraph] : []}
      />
    </div>
  );
}
