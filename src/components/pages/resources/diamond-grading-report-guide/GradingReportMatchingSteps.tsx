import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { SectionShell } from "./GradingReportShared";

interface GradingReportMatchingStepsProps {
  content: GradingReportContent["matchingSteps"];
}

export default function GradingReportMatchingSteps({ content }: GradingReportMatchingStepsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-12">
      <SectionShell
        id={content.id}
        title={content.title}
        paragraphsBefore={content.introParagraphs}
        numberedSteps={content.steps}
        paragraphsAfter={content.closingParagraph ? [content.closingParagraph] : []}
      />
    </div>
  );
}
