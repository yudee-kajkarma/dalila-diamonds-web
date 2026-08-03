import {
  GRADING_REPORT_CANONICAL_URL,
  GRADING_REPORT_PAGE_DESCRIPTION,
  GRADING_REPORT_PAGE_TITLE,
  getGradingReportContent,
} from "@/lib/i18n/diamondGradingReportGuideTranslations";

const ORGANIZATION_ID = "https://www.daliladiamonds.com/#organization";
const WEBSITE_ID = "https://www.daliladiamonds.com/#website";
const WEBPAGE_ID = `${GRADING_REPORT_CANONICAL_URL}#webpage`;
const ARTICLE_ID = `${GRADING_REPORT_CANONICAL_URL}#article`;
const FAQ_ID = `${GRADING_REPORT_CANONICAL_URL}#faq`;
const BREADCRUMB_ID = `${GRADING_REPORT_CANONICAL_URL}#breadcrumb`;

function buildGradingReportStructuredDataGraph() {
  const content = getGradingReportContent("en");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: GRADING_REPORT_CANONICAL_URL,
        name: GRADING_REPORT_PAGE_TITLE,
        description: GRADING_REPORT_PAGE_DESCRIPTION,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ARTICLE_ID },
        mainEntity: { "@id": FAQ_ID },
        breadcrumb: { "@id": BREADCRUMB_ID },
        inLanguage: "en",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png",
        },
      },
      {
        "@type": "Article",
        "@id": ARTICLE_ID,
        headline: content.hero.title,
        description: GRADING_REPORT_PAGE_DESCRIPTION,
        url: GRADING_REPORT_CANONICAL_URL,
        dateModified: "2026-07-30",
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": WEBPAGE_ID },
        mainEntityOfPage: { "@id": WEBPAGE_ID },
        inLanguage: "en",
        image: "https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png",
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        url: GRADING_REPORT_CANONICAL_URL,
        isPartOf: { "@id": WEBPAGE_ID },
        mainEntity: content.faqs.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: content.banner.breadcrumbHome,
            item: "https://www.daliladiamonds.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: content.banner.breadcrumbResources,
            item: "https://www.daliladiamonds.com/blogs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: content.banner.breadcrumbCurrent,
            item: GRADING_REPORT_CANONICAL_URL,
          },
        ],
      },
    ],
  };
}

export default function GradingReportStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGradingReportStructuredDataGraph()) }}
    />
  );
}
