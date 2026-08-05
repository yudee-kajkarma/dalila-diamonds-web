import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { getGradingReportData, type GradingReportPageData } from "@/lib/i18n/getGradingReportData";
import { getLocalizedPath, Locale } from "@/lib/i18n/config";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

type RichSegment =
  | { type: "text"; value: string }
  | { type: "link"; text: string; href: string; external?: boolean };

type TableData = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

type Subsection = {
  id: string;
  title: string;
  paragraphs?: string[];
  paragraphsBefore?: string[];
  paragraphsAfter?: string[];
  bullets?: string[];
  numberedSteps?: string[];
  table?: TableData;
  richParagraphsAfter?: RichSegment[][];
};

const ORGANIZATION_ID = "https://www.daliladiamonds.com/#organization";
const WEBSITE_ID = "https://www.daliladiamonds.com/#website";

function buildStructuredDataGraph(data: GradingReportPageData, locale: Locale) {
  const webpageId = `${data.meta.canonical}#webpage`;
  const articleId = `${data.meta.canonical}#article`;
  const faqId = `${data.meta.canonical}#faq`;
  const breadcrumbId = `${data.meta.canonical}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": ORGANIZATION_ID },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: data.meta.canonical,
        name: data.meta.title,
        description: data.meta.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": articleId },
        mainEntity: { "@id": faqId },
        breadcrumb: { "@id": breadcrumbId },
        inLanguage: locale,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png",
        },
      },
      {
        "@type": "Article",
        "@id": articleId,
        headline: data.hero.title,
        description: data.meta.description,
        url: data.meta.canonical,
        dateModified: data.meta.dateModified,
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": webpageId },
        mainEntityOfPage: { "@id": webpageId },
        inLanguage: locale,
        image: "https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png",
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        url: data.meta.canonical,
        isPartOf: { "@id": webpageId },
        mainEntity: data.faqs.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: data.banner.breadcrumbHome,
            item: "https://www.daliladiamonds.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: data.banner.breadcrumbResources,
            item: "https://www.daliladiamonds.com/blogs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: data.banner.breadcrumbCurrent,
            item: data.meta.canonical,
          },
        ],
      },
    ],
  };
}

function localizedPath(path: string, locale: Locale) {
  return getLocalizedPath(path, locale);
}

function PlainParagraphs({ items, className = "" }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;

  return (
    <>
      {items.map((paragraph) => (
        <p
          key={paragraph.slice(0, 48)}
          className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className} ${className}`.trim()}
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}

function RichParagraph({
  segments,
  className = "",
  locale = "en",
}: {
  segments: RichSegment[];
  className?: string;
  locale?: Locale;
}) {
  return (
    <p className={`${className} ${jost.className}`.trim()}>
      {segments.map((segment, index) => {
        if (segment.type === "text") {
          return <span key={index}>{segment.value}</span>;
        }

        if (segment.external) {
          return (
            <a
              key={index}
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c89e3a] hover:underline font-medium"
            >
              {segment.text}
            </a>
          );
        }

        return (
          <Link
            key={index}
            href={localizedPath(segment.href, locale)}
            className="text-[#c89e3a] hover:underline font-medium"
          >
            {segment.text}
          </Link>
        );
      })}
    </p>
  );
}

function RichParagraphList({
  paragraphs,
  className = "",
  locale = "en",
}: {
  paragraphs: RichSegment[][];
  className?: string;
  locale?: Locale;
}) {
  if (paragraphs.length === 0) return null;

  return (
    <>
      {paragraphs.map((segments, index) => (
        <RichParagraph
          key={index}
          segments={segments}
          locale={locale}
          className={`text-base md:text-lg leading-relaxed mb-6 ${className}`.trim()}
        />
      ))}
    </>
  );
}

function BulletList({ items, className = "" }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;

  return (
    <ul className={`space-y-4 mb-6 ${jost.className} ${className}`.trim()}>
      {items.map((item) => (
        <li key={item.slice(0, 48)} className="flex items-start gap-3 text-gray-700 text-base md:text-lg leading-relaxed">
          <span className="text-[#c89e3a] mt-1 font-bold text-xl shrink-0">•</span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function OrderedList({ items, className = "" }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;

  return (
    <ol className={`space-y-4 mb-6 list-decimal list-inside ${jost.className} ${className}`.trim()}>
      {items.map((item) => (
        <li key={item.slice(0, 48)} className="text-gray-700 text-base md:text-lg leading-relaxed pl-2">
          {item}
        </li>
      ))}
    </ol>
  );
}

function DataTable({ table }: { table: TableData }) {
  if (table.headers.length === 0) return null;

  return (
    <div className="overflow-x-auto mb-6">
      <table className={`min-w-full border border-gray-200 text-left text-sm md:text-base ${jost.className}`}>
        {table.caption ? <caption className="sr-only">{table.caption}</caption> : null}
        <thead className="bg-slate-50">
          <tr>
            {table.headers.map((header) => (
              <th key={header} scope="col" className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {table.rows.length > 0 ? (
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="even:bg-gray-50/60">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-gray-200 px-4 py-3 text-gray-700 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}

function Subheading({ children }: { children: string }) {
  return (
    <h3 className={`text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 mt-6 leading-tight ${marcellus.className}`}>
      {children}
    </h3>
  );
}

function renderSection({
  id,
  title,
  headingLevel = 2,
  paragraphsBefore = [],
  paragraphsAfter = [],
  bullets = [],
  numberedSteps = [],
  table,
  children,
}: {
  id?: string;
  title: string;
  headingLevel?: 2 | 3;
  paragraphsBefore?: string[];
  paragraphsAfter?: string[];
  bullets?: string[];
  numberedSteps?: string[];
  table?: TableData;
  children?: ReactNode;
}) {
  const HeadingTag = headingLevel === 3 ? "h3" : "h2";
  const headingClass =
    headingLevel === 3
      ? `text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight ${marcellus.className}`
      : `text-3xl md:text-4xl lg:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`;

  return (
    <div className="mb-12">
      <AnimatedContainer direction="up">
        <section id={id} className="scroll-mt-28 bg-white" aria-labelledby={id ? `${id}-heading` : undefined}>
          {title ? (
            <>
              <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
              <HeadingTag id={id ? `${id}-heading` : undefined} className={headingClass}>
                {title}
              </HeadingTag>
            </>
          ) : null}
          <PlainParagraphs items={paragraphsBefore} />
          <BulletList items={bullets} />
          <OrderedList items={numberedSteps} />
          {table && table.headers.length > 0 ? <DataTable table={table} /> : null}
          <PlainParagraphs items={paragraphsAfter} />
          {children}
        </section>
      </AnimatedContainer>
    </div>
  );
}

function renderSubsection(subsection: any, locale: Locale = "en") {
  const richAfter = subsection.richParagraphsAfter as RichSegment[][] | undefined;
  return renderSection({
    id: subsection.id,
    title: subsection.title,
    headingLevel: 3,
    paragraphsBefore: subsection.paragraphsBefore ?? subsection.paragraphs ?? [],
    bullets: subsection.bullets,
    numberedSteps: subsection.numberedSteps,
    paragraphsAfter: subsection.paragraphsAfter,
    table: subsection.table,
    children:
      richAfter && richAfter.length > 0 ? (
        <RichParagraphList paragraphs={richAfter} locale={locale} />
      ) : undefined,
  });
}

interface DiamondGradingGuideProps {
  locale?: Locale;
}

export default function DiamondGradingGuide({ locale = "en" }: DiamondGradingGuideProps) {
  const data = getGradingReportData(locale);

  return (
    <main className={`${marcellus.variable} ${jost.variable} bg-white min-h-screen`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredDataGraph(data, locale)) }}
      />

      {/* Banner */}
      <div className="relative bg-slate-900">
        <section
          className="relative h-[36vh] xs:h-[44vh] sm:h-[60vh] md:h-[55vh] lg:h-[50vh] flex items-center justify-center overflow-hidden"
          aria-label="Page banner"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/banner-dalila-contact.png"
              alt={data.banner.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
          </div>

          <div className="container mx-auto px-3 xs:px-4 sm:px-6 relative z-10 text-center py-8 sm:py-14">
            <AnimatedContainer direction="right">
              <p
                className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white mb-3 mt-8 sm:mt-30 whitespace-nowrap sm:whitespace-normal ${marcellus.className}`}
                style={{ lineHeight: 1.15 }}
              >
                {data.banner.title}
              </p>
              <div className="w-2/3 sm:w-[35%] h-px bg-amber-400 mx-auto mb-6" aria-hidden="true" />
            </AnimatedContainer>

            <nav
              aria-label="Breadcrumb"
              className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 text-gray-300 text-xs xs:text-sm md:text-base"
            >
              <Link href={localizedPath("/", locale)} className={`hover:text-amber-400 transition-colors ${jost.className}`}>
                {data.banner.breadcrumbHome}
              </Link>
              <span aria-hidden="true">›</span>
              <Link
                href={localizedPath("/blogs", locale)}
                className={`hover:text-amber-400 transition-colors ${jost.className}`}
              >
                {data.banner.breadcrumbResources}
              </Link>
              <span aria-hidden="true">›</span>
              <span className={jost.className}>{data.banner.breadcrumbCurrent}</span>
            </nav>
          </div>
        </section>
      </div>

      {/* Hero */}
      <section className="bg-white py-10 md:py-14" aria-labelledby="grading-report-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <h1
              id="grading-report-hero-heading"
              className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-4 tracking-tight leading-tight ${marcellus.className}`}
            >
              {data.hero.title}
            </h1>
            <p className={`text-lg md:text-xl text-gray-700 leading-relaxed mb-6 ${jost.className}`}>{data.hero.subheading}</p>
            <p
              className={`inline-flex items-center rounded-full border border-[#c89e3a]/40 bg-[#FAF6EB] px-4 py-2 text-sm text-gray-800 ${jost.className}`}
            >
              <span className="font-medium">{data.hero.reviewDateLabel}</span>
              <span className="ml-2">{data.hero.reviewDate}</span>
            </p>
          </AnimatedContainer>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="bg-[#FAF6EB] border-y border-[#c89e3a]/20 py-10 md:py-12" aria-labelledby="grading-report-quick-answer">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <h2
              id="grading-report-quick-answer"
              className={`text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 ${marcellus.className}`}
            >
              {data.quickAnswer.title}
            </h2>
            <PlainParagraphs items={data.quickAnswer.introParagraphs} className="text-gray-800 mb-3" />
            <BulletList items={data.quickAnswer.attributes} className="text-gray-800 mb-3" />
            <PlainParagraphs items={data.quickAnswer.closingParagraphs} className="text-gray-800 mb-0 last:mb-0" />
          </AnimatedContainer>
        </div>
      </section>

      {/* Main content with sidebar */}
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
            {renderSection({ title: "", paragraphsBefore: data.introduction.paragraphs })}

            {renderSection({
              id: "grading-report-key-takeaways",
              title: data.keyTakeaways.title,
              bullets: data.keyTakeaways.items,
            })}

            <div className="mb-12">
              <AnimatedContainer direction="up">
                <nav className="bg-white scroll-mt-28" aria-labelledby="grading-report-overview-nav">
                  <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
                  <h2
                    id="grading-report-overview-nav"
                    className={`text-3xl md:text-4xl lg:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}
                  >
                    {data.overviewNav.title}
                  </h2>
                  <ol className={`space-y-4 list-decimal list-inside ${jost.className}`}>
                    {data.overviewNav.items.map((item) => (
                      <li key={item.id} className="text-gray-700 text-base md:text-lg leading-relaxed pl-2">
                        <a href={`#${item.id}`} className="text-[#1a1a1a] hover:text-[#c89e3a] underline-offset-2 hover:underline">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </AnimatedContainer>
            </div>

            {renderSection({
              id: data.whatIs.id,
              title: data.whatIs.title,
              paragraphsBefore: data.whatIs.introParagraphs,
              bullets: data.whatIs.establishItems,
              paragraphsAfter: data.whatIs.closingParagraphs,
            })}

            {renderSection({
              id: data.whyMatter.id,
              title: data.whyMatter.title,
              paragraphsBefore: data.whyMatter.introParagraphs,
              bullets: data.whyMatter.helpItems,
              paragraphsAfter: data.whyMatter.closingParagraphs,
            })}

            {renderSection({
              id: data.howToRead.id,
              title: data.howToRead.title,
              paragraphsBefore: data.howToRead.introParagraphs,
            })}
            {data.howToRead.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.verification.id,
              title: data.verification.title,
              paragraphsBefore: data.verification.introParagraphs,
              children: (
                <>
                  <ul className={`flex flex-wrap gap-4 mb-6 ${jost.className}`}>
                    <li>
                      <a
                        href={data.urls.giaReportCheck}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c89e3a] hover:underline font-medium"
                      >
                        {data.verification.giaLinkLabel}
                      </a>
                    </li>
                    <li>
                      <a
                        href={data.urls.igiVerify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c89e3a] hover:underline font-medium"
                      >
                        {data.verification.igiLinkLabel}
                      </a>
                    </li>
                    <li>
                      <a
                        href={data.urls.hrdVerify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c89e3a] hover:underline font-medium"
                      >
                        {data.verification.hrdLinkLabel}
                      </a>
                    </li>
                  </ul>
                  <Subheading>{data.verification.processHeading}</Subheading>
                  <OrderedList items={data.verification.processSteps} />
                  <Subheading>{data.verification.matchHeading}</Subheading>
                  <BulletList items={data.verification.matchItems} />
                  {data.verification.closingParagraph ? (
                    <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>
                      {data.verification.closingParagraph}
                    </p>
                  ) : null}
                </>
              ),
            })}

            {renderSection({
              id: data.onlineVerificationLimits.id,
              title: data.onlineVerificationLimits.title,
              paragraphsBefore: data.onlineVerificationLimits.introParagraphs,
              bullets: data.onlineVerificationLimits.checkItems,
              paragraphsAfter: data.onlineVerificationLimits.closingParagraph
                ? [data.onlineVerificationLimits.closingParagraph]
                : [],
            })}

            {renderSection({
              id: data.matchingSteps.id,
              title: data.matchingSteps.title,
              paragraphsBefore: data.matchingSteps.introParagraphs,
              numberedSteps: data.matchingSteps.steps,
              paragraphsAfter: data.matchingSteps.closingParagraph ? [data.matchingSteps.closingParagraph] : [],
            })}

            {renderSection({
              id: data.comparisonTable.id,
              title: data.comparisonTable.title,
              paragraphsBefore: data.comparisonTable.introParagraphs,
              table: data.comparisonTable.table,
            })}

            {renderSection({
              id: data.workedExample.id,
              title: data.workedExample.title,
              paragraphsBefore: data.workedExample.introParagraphs,
              bullets: data.workedExample.introBullets ?? [],
              numberedSteps: data.workedExample.steps,
              paragraphsAfter: data.workedExample.closingParagraph ? [data.workedExample.closingParagraph] : [],
            })}

            {renderSection({
              id: data.labComparison.id,
              title: data.labComparison.title,
              paragraphsBefore: data.labComparison.introParagraphs,
              bullets: data.labComparison.processSteps,
              paragraphsAfter: data.labComparison.closingParagraphs,
              table: data.labComparison.table,
            })}

            {renderSection({
              id: data.limitations.id,
              title: data.limitations.title,
              paragraphsBefore: data.limitations.introParagraphs,
              children: (
                <div className="space-y-8 mt-4">
                  {data.limitations.subsections.map((subsection) => (
                    <div key={subsection.title}>
                      <h3 className={`text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight ${marcellus.className}`}>
                        {subsection.title}
                      </h3>
                      <PlainParagraphs items={subsection.paragraphs} />
                      {subsection.bullets && subsection.bullets.length > 0 ? (
                        <BulletList items={subsection.bullets} />
                      ) : null}
                    </div>
                  ))}
                </div>
              ),
            })}

            {renderSection({
              id: data.warningSigns.id,
              title: data.warningSigns.title,
              paragraphsBefore: [data.warningSigns.introLead],
              bullets: data.warningSigns.items,
              paragraphsAfter: [data.warningSigns.closingParagraph],
            })}

            {renderSection({
              id: data.vsAppraisal.id,
              title: data.vsAppraisal.title,
              paragraphsBefore: data.vsAppraisal.introParagraphs,
              bullets: data.vsAppraisal.establishItems,
              table: data.vsAppraisal.table,
            })}

            {renderSection({
              id: data.checklist.id,
              title: data.checklist.title,
              paragraphsBefore: [data.checklist.introLead],
              bullets: data.checklist.items,
            })}
          </article>
        </div>
      </div>

      {/* CTA */}
      <section
        id={data.cta.id}
        className="scroll-mt-28 bg-slate-900 text-white py-12 md:py-16"
        aria-labelledby="grading-report-cta-heading"
      >
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full mx-auto" />
            <h2
              id="grading-report-cta-heading"
              className={`text-3xl md:text-4xl font-bold mb-6 ${marcellus.className}`}
            >
              {data.cta.title}
            </h2>
            <div className="text-gray-200">
              <RichParagraphList paragraphs={data.cta.richParagraphs as RichSegment[][]} locale={locale} />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href={localizedPath(data.cta.primaryButtonHref, locale)}
                className={`inline-flex items-center justify-center rounded-md bg-[#c89e3a] px-6 py-3 text-white font-medium hover:bg-[#b8902f] transition-colors ${jost.className}`}
              >
                {data.cta.primaryButtonText}
              </Link>
              <Link
                href={localizedPath(data.cta.secondaryButtonHref, locale)}
                className={`inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors ${jost.className}`}
              >
                {data.cta.secondaryButtonText}
              </Link>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 md:py-16" aria-labelledby="grading-report-faq-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
            <h2
              id="grading-report-faq-heading"
              className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-8 tracking-tight ${marcellus.className}`}
            >
              {data.faqs.title}
            </h2>
            <div className="space-y-4">
              {data.faqs.items.map((item, index) => (
                <details
                  key={item.question}
                  className="group border border-gray-200 bg-white open:bg-[#FAF6EB]/40"
                  open={index === 0}
                >
                  <summary className="cursor-pointer list-none px-5 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c89e3a] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      <h3 className={`text-lg text-gray-900 text-left ${marcellus.className}`}>{item.question}</h3>
                      <span
                        className="text-[#c89e3a] text-xl shrink-0 group-open:rotate-45 transition-transform"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <div className={`px-5 pb-5 text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Final Takeaway */}
      <section
        id={data.finalTakeaway.id}
        className="scroll-mt-28 bg-[#FAF6EB] py-12 md:py-16 border-t border-[#c89e3a]/20"
        aria-labelledby="grading-report-final-takeaway-heading"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
            <h2
              id="grading-report-final-takeaway-heading"
              className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 ${marcellus.className}`}
            >
              {data.finalTakeaway.title}
            </h2>
            <PlainParagraphs items={data.finalTakeaway.introParagraphs} />
            <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-2 ${jost.className}`}>
              {data.finalTakeaway.doNotAskLead}
            </p>
            <BulletList items={data.finalTakeaway.doNotAskItems} />
            <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-2 ${jost.className}`}>
              {data.finalTakeaway.askLead}
            </p>
            <BulletList items={data.finalTakeaway.askItems} />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
              <Link
                href={localizedPath(data.finalTakeaway.primaryButtonHref, locale)}
                className={`inline-flex items-center justify-center rounded-md bg-[#c89e3a] px-6 py-3 text-white font-medium hover:bg-[#b8902f] transition-colors ${jost.className}`}
              >
                {data.finalTakeaway.primaryButtonText}
              </Link>
              <Link
                href={localizedPath(data.finalTakeaway.secondaryButtonHref, locale)}
                className={`inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-gray-900 font-medium hover:bg-white transition-colors ${jost.className}`}
              >
                {data.finalTakeaway.secondaryButtonText}
              </Link>
            </div>
          </AnimatedContainer>
        </div>
      </section>
    </main>
  );
}
