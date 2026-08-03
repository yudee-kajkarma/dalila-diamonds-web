import {
  GIA_REPORT_CHECK_URL,
  HRD_VERIFY_URL,
  IGI_VERIFY_URL,
  type GradingReportContent,
} from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { Subheading, SectionShell } from "./GradingReportShared";
import { SemanticBulletList, SemanticOrderedList } from "./gradingReportRichText";
import { jost } from "./gradingReportFonts";

interface GradingReportVerificationProps {
  content: GradingReportContent["verification"];
}

export default function GradingReportVerification({ content }: GradingReportVerificationProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pb-10 md:pb-12">
      <SectionShell id={content.id} title={content.title} paragraphsBefore={content.introParagraphs} />

      <ul className={`flex flex-wrap gap-4 mb-8 ${jost.className}`}>
        <li>
          <a
            href={GIA_REPORT_CHECK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c89e3a] hover:underline font-medium"
          >
            {content.giaLinkLabel}
          </a>
        </li>
        <li>
          <a
            href={IGI_VERIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c89e3a] hover:underline font-medium"
          >
            {content.igiLinkLabel}
          </a>
        </li>
        <li>
          <a
            href={HRD_VERIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c89e3a] hover:underline font-medium"
          >
            {content.hrdLinkLabel}
          </a>
        </li>
      </ul>

      <Subheading>{content.processHeading}</Subheading>
      <SemanticOrderedList items={content.processSteps} />

      <Subheading>{content.matchHeading}</Subheading>
      <SemanticBulletList items={content.matchItems} />

      {content.closingParagraph ? (
        <p className={`text-gray-700 leading-relaxed ${jost.className}`}>{content.closingParagraph}</p>
      ) : null}
    </div>
  );
}
