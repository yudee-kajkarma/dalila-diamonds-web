import { Metadata } from "next";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import GradingReportBanner from "@/components/pages/resources/diamond-grading-report-guide/GradingReportBanner";
import GradingReportHero from "@/components/pages/resources/diamond-grading-report-guide/GradingReportHero";
import GradingReportIntro, {
  GradingReportWhatIs,
  GradingReportWhyMatter,
} from "@/components/pages/resources/diamond-grading-report-guide/GradingReportIntroSections";
import GradingReportQuickAnswer from "@/components/pages/resources/diamond-grading-report-guide/GradingReportQuickAnswer";
import GradingReportKeyTakeaways from "@/components/pages/resources/diamond-grading-report-guide/GradingReportKeyTakeaways";
import GradingReportOverviewNav from "@/components/pages/resources/diamond-grading-report-guide/GradingReportOverviewNav";
import GradingReportSections from "@/components/pages/resources/diamond-grading-report-guide/GradingReportSections";
import GradingReportVerification from "@/components/pages/resources/diamond-grading-report-guide/GradingReportVerification";
import GradingReportOnlineVerificationLimits from "@/components/pages/resources/diamond-grading-report-guide/GradingReportOnlineVerificationLimits";
import GradingReportMatchingSteps from "@/components/pages/resources/diamond-grading-report-guide/GradingReportMatchingSteps";
import GradingReportComparisonTable from "@/components/pages/resources/diamond-grading-report-guide/GradingReportComparisonTable";
import GradingReportWorkedExample from "@/components/pages/resources/diamond-grading-report-guide/GradingReportWorkedExample";
import GradingReportLabComparison from "@/components/pages/resources/diamond-grading-report-guide/GradingReportLabComparison";
import GradingReportLimitations from "@/components/pages/resources/diamond-grading-report-guide/GradingReportLimitations";
import GradingReportWarningSigns from "@/components/pages/resources/diamond-grading-report-guide/GradingReportWarningSigns";
import GradingReportVsAppraisal from "@/components/pages/resources/diamond-grading-report-guide/GradingReportVsAppraisal";
import GradingReportChecklist from "@/components/pages/resources/diamond-grading-report-guide/GradingReportChecklist";
import GradingReportCta from "@/components/pages/resources/diamond-grading-report-guide/GradingReportCta";
import GradingReportFaq from "@/components/pages/resources/diamond-grading-report-guide/GradingReportFaq";
import GradingReportFinalTakeaway from "@/components/pages/resources/diamond-grading-report-guide/GradingReportFinalTakeaway";
import GradingReportStructuredData from "@/components/pages/resources/diamond-grading-report-guide/GradingReportStructuredData";
import {
  getGradingReportContent,
  GRADING_REPORT_CANONICAL_URL,
  GRADING_REPORT_PAGE_DESCRIPTION,
  GRADING_REPORT_PAGE_TITLE,
} from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { marcellus, jost } from "@/components/pages/resources/diamond-grading-report-guide/gradingReportFonts";

export const metadata: Metadata = {
  title: GRADING_REPORT_PAGE_TITLE,
  description: GRADING_REPORT_PAGE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: GRADING_REPORT_CANONICAL_URL,
  },
  openGraph: {
    title: GRADING_REPORT_PAGE_TITLE,
    description: GRADING_REPORT_PAGE_DESCRIPTION,
    url: GRADING_REPORT_CANONICAL_URL,
    siteName: "Dalila Diamonds",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: GRADING_REPORT_PAGE_TITLE,
    description: GRADING_REPORT_PAGE_DESCRIPTION,
    images: ["https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png"],
  },
};

export default function DiamondGradingReportGuidePage() {
  const content = getGradingReportContent("en");

  return (
    <main className={`${marcellus.variable} ${jost.variable} bg-white min-h-screen`}>
      <GradingReportStructuredData />
      <GradingReportBanner content={content.banner} />
      <GradingReportHero content={content.hero} />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-56 w-full shrink-0">
            <AnimatedContainer direction="left">
              <div className="sticky top-4">
                <ResourceSidebar currentPage="diamond-grading-report-guide" />
              </div>
            </AnimatedContainer>
          </aside>

          <article className="flex-1 w-full min-w-0">
            <GradingReportIntro content={content.introduction} />
            <GradingReportQuickAnswer content={content.quickAnswer} />
            <GradingReportKeyTakeaways content={content.keyTakeaways} />
            <GradingReportOverviewNav content={content.overviewNav} />
            <GradingReportWhatIs content={content.whatIs} />
            <GradingReportWhyMatter content={content.whyMatter} />
            <GradingReportSections content={content.howToRead} />
            <GradingReportVerification content={content.verification} />
            <GradingReportOnlineVerificationLimits content={content.onlineVerificationLimits} />
            <GradingReportMatchingSteps content={content.matchingSteps} />
            <GradingReportComparisonTable content={content.comparisonTable} />
            <GradingReportWorkedExample content={content.workedExample} />
            <GradingReportLabComparison content={content.labComparison} />
            <GradingReportLimitations content={content.limitations} />
            <GradingReportWarningSigns content={content.warningSigns} />
            <GradingReportVsAppraisal content={content.vsAppraisal} />
            <GradingReportChecklist content={content.checklist} />
          </article>
        </div>
      </div>

      <GradingReportCta content={content.cta} />
      <GradingReportFaq content={content.faqs} />
      <GradingReportFinalTakeaway content={content.finalTakeaway} />
    </main>
  );
}
