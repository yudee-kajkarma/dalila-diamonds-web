import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { getGirdleGuideData, type GirdleGuidePageData } from "@/lib/i18n/getGirdleGuideData";
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
};

const ORGANIZATION_ID = "https://www.daliladiamonds.com/#organization";
const WEBSITE_ID = "https://www.daliladiamonds.com/#website";

function buildStructuredDataGraph(data: GirdleGuidePageData, locale: Locale) {
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

function renderSubsection(subsection: Subsection, locale: Locale = "en") {
  return (
    <Fragment key={subsection.id}>
      {renderSection({
        id: subsection.id,
        title: subsection.title,
        headingLevel: 3,
        paragraphsBefore: subsection.paragraphsBefore ?? subsection.paragraphs ?? [],
        bullets: subsection.bullets,
        numberedSteps: subsection.numberedSteps,
        paragraphsAfter: subsection.paragraphsAfter,
        table: subsection.table,
      })}
    </Fragment>
  );
}

interface DiamondGirdleGuideProps {
  locale?: Locale;
}

export default function DiamondGirdleGuide({ locale = "en" }: DiamondGirdleGuideProps) {
  const data = getGirdleGuideData(locale);

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
              alt={data.banner.imageAlt}
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
      <section className="bg-white py-10 md:py-14" aria-labelledby="girdle-guide-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <h1
              id="girdle-guide-hero-heading"
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
      <section className="bg-[#FAF6EB] border-y border-[#c89e3a]/20 py-10 md:py-12" aria-labelledby="girdle-guide-quick-answer">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <h2
              id="girdle-guide-quick-answer"
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
                <ResourceSidebar currentPage="diamond-girdle-guide" />
              </div>
            </AnimatedContainer>
          </aside>

          <article className="flex-1 w-full min-w-0">
            {renderSection({
              id: "girdle-guide-key-takeaways",
              title: data.keyTakeaways.title,
              bullets: data.keyTakeaways.items,
            })}

            {renderSection({
              id: data.importantBuyerNote.id,
              title: data.importantBuyerNote.title,
              paragraphsBefore: data.importantBuyerNote.paragraphs,
            })}

            <div className="mb-12">
              <AnimatedContainer direction="up">
                <nav className="bg-white scroll-mt-28" aria-labelledby="girdle-guide-overview-nav">
                  <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
                  <h2
                    id="girdle-guide-overview-nav"
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
              bullets: data.whatIs.bullets,
              paragraphsAfter: data.whatIs.closingParagraphs,
              children: (
                <>
                  <RichParagraphList
                    paragraphs={data.whatIs.richClosingParagraphs as RichSegment[][]}
                    locale={locale}
                  />
                  {data.whatIs.subsections.map((subsection) => renderSubsection(subsection, locale))}
                </>
              ),
            })}

            {renderSection({
              id: data.whereLocated.id,
              title: data.whereLocated.title,
              paragraphsBefore: data.whereLocated.introParagraphs,
              bullets: data.whereLocated.bullets,
              paragraphsAfter: data.whereLocated.closingParagraphs,
              children: (
                <>
                  <BulletList items={data.whereLocated.positionBullets} />
                  <PlainParagraphs items={data.whereLocated.finalParagraphs} />
                </>
              ),
            })}

            {renderSection({
              id: data.whatDoes.id,
              title: data.whatDoes.title,
              paragraphsBefore: data.whatDoes.introParagraphs,
            })}
            {data.whatDoes.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.giaScale.id,
              title: data.giaScale.title,
              paragraphsBefore: data.giaScale.introParagraphs,
              table: data.giaScale.table,
              children: (
                <RichParagraphList
                  paragraphs={data.giaScale.richClosingParagraphs as RichSegment[][]}
                  locale={locale}
                />
              ),
            })}
            {data.giaScale.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.rangesReported.id,
              title: data.rangesReported.title,
              paragraphsBefore: data.rangesReported.introParagraphs,
              bullets: data.rangesReported.bullets,
            })}
            {data.rangesReported.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.percentages.id,
              title: data.percentages.title,
              paragraphsBefore: data.percentages.introParagraphs,
              bullets: data.percentages.bullets,
              children: (
                <RichParagraphList
                  paragraphs={data.percentages.richClosingParagraphs as RichSegment[][]}
                  locale={locale}
                />
              ),
            })}
            {data.percentages.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.hrdMeasurements.id,
              title: data.hrdMeasurements.title,
              paragraphsBefore: data.hrdMeasurements.introParagraphs,
              table: data.hrdMeasurements.table,
              paragraphsAfter: data.hrdMeasurements.closingParagraphs,
              children: (
                <>
                  <DataTable table={data.hrdMeasurements.proportionsTable} />
                  <PlainParagraphs items={data.hrdMeasurements.finalParagraphs} />
                </>
              ),
            })}
            {data.hrdMeasurements.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.giaVsHrd.id,
              title: data.giaVsHrd.title,
              paragraphsBefore: data.giaVsHrd.introParagraphs,
              table: data.giaVsHrd.table,
              paragraphsAfter: data.giaVsHrd.closingParagraphs,
            })}
            {data.giaVsHrd.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.bestThickness.id,
              title: data.bestThickness.title,
              paragraphsBefore: data.bestThickness.introParagraphs,
              bullets: data.bestThickness.bullets,
              paragraphsAfter: data.bestThickness.closingParagraphs,
              children: <BulletList items={data.bestThickness.dependBullets} />,
            })}
            {data.bestThickness.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.thinGirdles.id,
              title: data.thinGirdles.title,
              paragraphsBefore: data.thinGirdles.introParagraphs,
              children: (
                <RichParagraphList
                  paragraphs={data.thinGirdles.richClosingParagraphs as RichSegment[][]}
                  locale={locale}
                />
              ),
            })}
            {data.thinGirdles.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.thickGirdles.id,
              title: data.thickGirdles.title,
              paragraphsBefore: data.thickGirdles.introParagraphs,
            })}
            {data.thickGirdles.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.uneven.id,
              title: data.uneven.title,
              paragraphsBefore: data.uneven.introParagraphs,
            })}
            {data.uneven.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.finish.id,
              title: data.finish.title,
              paragraphsBefore: data.finish.introParagraphs,
              table: data.finish.table,
              paragraphsAfter: data.finish.closingParagraphs,
            })}
            {data.finish.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.paintingDigging.id,
              title: data.paintingDigging.title,
              paragraphsBefore: data.paintingDigging.introParagraphs,
            })}
            {data.paintingDigging.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.damage.id,
              title: data.damage.title,
              paragraphsBefore: data.damage.introParagraphs,
              bullets: data.damage.bullets,
              table: data.damage.table,
              children: (
                <RichParagraphList
                  paragraphs={data.damage.richClosingParagraphs as RichSegment[][]}
                  locale={locale}
                />
              ),
            })}
            {data.damage.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.inscriptions.id,
              title: data.inscriptions.title,
              paragraphsBefore: data.inscriptions.introParagraphs,
            })}
            {data.inscriptions.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.shapes.id,
              title: data.shapes.title,
              paragraphsBefore: data.shapes.introParagraphs,
            })}
            {data.shapes.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.settings.id,
              title: data.settings.title,
              paragraphsBefore: data.settings.introParagraphs,
            })}
            {data.settings.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.price.id,
              title: data.price.title,
              paragraphsBefore: data.price.introParagraphs,
            })}
            {data.price.subsections.map((subsection) => renderSubsection(subsection, locale))}

            {renderSection({
              id: data.naturalVsLab.id,
              title: data.naturalVsLab.title,
              paragraphsBefore: data.naturalVsLab.introParagraphs,
              bullets: data.naturalVsLab.bullets,
              paragraphsAfter: data.naturalVsLab.closingParagraphs,
            })}

            {renderSection({
              id: data.howToInspect.id,
              title: data.howToInspect.title,
              paragraphsBefore: data.howToInspect.introParagraphs,
            })}
            {data.howToInspect.subsections.map((subsection) => {
              if (subsection.id === "step-1-read-the-complete-grading-report") {
                return (
                  <div key={subsection.id}>
                    {renderSubsection(subsection, locale)}
                    <div className="mb-12 -mt-6">
                      <RichParagraphList
                        paragraphs={data.howToInspect.step1RichParagraphs as RichSegment[][]}
                        locale={locale}
                      />
                    </div>
                  </div>
                );
              }
              return <div key={subsection.id}>{renderSubsection(subsection, locale)}</div>;
            })}

            {renderSection({
              id: data.workedComparison.id,
              title: data.workedComparison.title,
              paragraphsBefore: data.workedComparison.introParagraphs,
              table: data.workedComparison.table,
              children: (
                <>
                  {data.workedComparison.analyses.map((analysis) => (
                    <div key={analysis.title}>
                      <h3
                        className={`text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 mt-6 leading-tight ${marcellus.className}`}
                      >
                        {analysis.title}
                      </h3>
                      <PlainParagraphs items={analysis.paragraphsBefore ?? []} />
                      {analysis.bullets ? <BulletList items={analysis.bullets} /> : null}
                      {analysis.paragraphsAfter ? <PlainParagraphs items={analysis.paragraphsAfter} /> : null}
                    </div>
                  ))}
                </>
              ),
            })}

            {renderSection({
              id: data.myths.id,
              title: data.myths.title,
              paragraphsBefore: data.myths.introParagraphs,
              table: data.myths.table,
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
        aria-labelledby="girdle-guide-cta-heading"
      >
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full mx-auto" />
            <h2
              id="girdle-guide-cta-heading"
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
      <section className="bg-white py-12 md:py-16" aria-labelledby="girdle-guide-faq-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
            <h2
              id="girdle-guide-faq-heading"
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
        aria-labelledby="girdle-guide-final-takeaway-heading"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
            <h2
              id="girdle-guide-final-takeaway-heading"
              className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 ${marcellus.className}`}
            >
              {data.finalTakeaway.title}
            </h2>
            <PlainParagraphs items={data.finalTakeaway.introParagraphs} />
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
