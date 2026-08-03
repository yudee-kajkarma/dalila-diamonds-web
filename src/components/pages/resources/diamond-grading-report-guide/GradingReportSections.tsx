import type { GradingReportContent } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { SectionShell } from "./GradingReportShared";

interface GradingReportSectionsProps {
  content: GradingReportContent["howToRead"];
}

export default function GradingReportSections({ content }: GradingReportSectionsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-12">
      <SectionShell id={content.id} title={content.title} paragraphsBefore={content.introParagraphs} />

      <div className="space-y-10 mt-8">
        {content.subsections.map((subsection) => (
          <SectionShell
            key={subsection.id}
            id={subsection.id}
            title={subsection.title}
            headingLevel={3}
            paragraphsBefore={subsection.paragraphsBefore ?? subsection.paragraphs}
            bullets={subsection.bullets}
            numberedSteps={subsection.numberedSteps}
            paragraphsAfter={subsection.paragraphsAfter}
            table={subsection.table}
          />
        ))}
      </div>
    </div>
  );
}
