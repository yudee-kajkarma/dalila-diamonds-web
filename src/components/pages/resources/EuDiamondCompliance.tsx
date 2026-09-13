import Image from "next/image";
import Link from "next/link";
import { marcellus, jost } from "@/lib/fonts";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { getEuComplianceData, type EuCompliancePageData } from "@/lib/i18n/getEuComplianceData";
import { getLocalizedPath, Locale } from "@/lib/i18n/config";
import { s3Asset } from "@/lib/s3Assets";

type TableData = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

const ORGANIZATION_ID = "https://www.daliladiamonds.com/#organization";
const WEBSITE_ID = "https://www.daliladiamonds.com/#website";

function buildStructuredDataGraph(data: EuCompliancePageData, locale: Locale) {
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
          url: s3Asset("/dalila_img/Dalila_Logo.png"),
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
        image: s3Asset("/dalila_img/Dalila_Logo.png"),
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
            item: "https://www.daliladiamonds.com/resources",
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

function PlainParagraphs({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <>
      {items.map((text, index) => (
        <p
          key={index}
          className={`text-base md:text-lg leading-relaxed text-gray-700 mb-6 ${jost.className}`}
        >
          {text}
        </p>
      ))}
    </>
  );
}

function DataTable({ table }: { table: TableData }) {
  if (!table || table.headers.length === 0) return null;
  return (
    <div className="overflow-x-auto mb-6">
      <table
        className={`min-w-full border border-gray-200 text-left text-sm md:text-base ${jost.className}`}
      >
        {table.caption ? <caption className="sr-only">{table.caption}</caption> : null}
        <thead className="bg-slate-50">
          <tr>
            {table.headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="border border-gray-200 px-4 py-3 font-semibold text-gray-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50/60">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-200 px-4 py-3 text-gray-700 align-top"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({
  id,
  title,
  paragraphs,
  table,
}: {
  id?: string;
  title: string;
  paragraphs?: string[];
  table?: TableData;
}) {
  return (
    <div className="mb-12">
      <AnimatedContainer direction="up">
        <section
          id={id}
          className="scroll-mt-28 bg-white"
          aria-labelledby={id ? `${id}-heading` : undefined}
        >
          {title ? (
            <>
              <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
              <h2
                id={id ? `${id}-heading` : undefined}
                className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}
              >
                {title}
              </h2>
            </>
          ) : null}
          <PlainParagraphs items={paragraphs ?? []} />
          {table ? <DataTable table={table} /> : null}
        </section>
      </AnimatedContainer>
    </div>
  );
}

interface EuDiamondComplianceProps {
  locale?: Locale;
}

export default function EuDiamondCompliance({ locale = "en" }: EuDiamondComplianceProps) {
  const data = getEuComplianceData(locale);

  return (
    <main className={`${marcellus.variable} ${jost.variable} bg-white min-h-screen`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildStructuredDataGraph(data, locale)),
        }}
      />

      {/* Banner */}
      <div className="relative bg-slate-900">
        <section
          className="relative min-h-[280px] xs:min-h-[300px] sm:min-h-[360px] md:min-h-[340px] lg:min-h-[320px] flex items-center justify-center overflow-hidden"
          aria-label="Page banner"
        >
          <div className="absolute inset-0">
            <Image
              src={s3Asset("/images/banner-dalila-contact.png")}
              alt={data.banner.imageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
          </div>

          <div className="container mx-auto px-3 xs:px-4 sm:px-6 relative z-10 text-center pt-24 sm:pt-28 pb-8 sm:pb-14">
            <AnimatedContainer direction="right">
              <p
                className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white mb-3 sm:mt-30 ${marcellus.className}`}
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
              <Link
                href={localizedPath("/", locale)}
                className={`hover:text-amber-400 transition-colors ${jost.className}`}
              >
                {data.banner.breadcrumbHome}
              </Link>
              <span aria-hidden="true">›</span>
              <Link
                href={localizedPath("/resources", locale)}
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
      <section className="bg-white py-10 md:py-12" aria-labelledby="eu-compliance-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <h1
              id="eu-compliance-hero-heading"
              className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-3 tracking-tight leading-tight ${marcellus.className}`}
            >
              {data.hero.title}
            </h1>
            <p className={`text-lg md:text-xl text-gray-600 leading-relaxed ${jost.className}`}>
              {data.hero.subheading}
            </p>
          </AnimatedContainer>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
          <aside className="sticky-sidebar order-2 lg:order-1">
            <ResourceSidebar currentPage="eu-diamond-compliance" />
          </aside>

          <article className="order-1 lg:order-2 w-full min-w-0">
            {/*
              The review date is shown rather than commented out as on the other
              resource pages. The spec marks this content legally time-sensitive
              and requires the date to stay visible near the top, because a
              reader acting on a sanctions threshold needs to know how current
              the page is before they rely on it.
            */}
            <div className="mb-8">
              <p
                className={`inline-flex items-center rounded-full border border-[#c89e3a]/40 bg-[#FAF6EB] px-4 py-2 text-sm text-gray-800 ${jost.className}`}
              >
                <span className="font-medium">{data.hero.reviewDateLabel}</span>
                <time className="ml-2" dateTime={data.meta.dateModified}>
                  {data.hero.reviewDate}
                </time>
              </p>
            </div>

            <Section title="" paragraphs={data.introduction.paragraphs} />

            {data.complianceNotice ? (
              <AnimatedContainer direction="up">
                <aside
                  role="note"
                  aria-label="Compliance notice"
                  className="mb-12 border-l-4 border-[#c89e3a] bg-[#FAF6EB]/60 px-5 py-4 rounded-r-lg"
                >
                  <p className={`text-base leading-relaxed text-gray-800 ${jost.className}`}>
                    {data.complianceNotice}
                  </p>
                </aside>
              </AnimatedContainer>
            ) : null}

            <Section
              id={data.quickAnswer.id}
              title={data.quickAnswer.title}
              paragraphs={data.quickAnswer.paragraphs}
            />

            <Section
              id={data.checklistTable.id}
              title={data.checklistTable.title}
              paragraphs={data.checklistTable.paragraphs}
              table={data.checklistTable.table}
            />

            {/*
              Fifty-three sections need grouping to be navigable, but each keeps
              its own anchor: the supporting pages this hub is meant to sit above
              link into individual answers, not the top of the page.
            */}
            <div className="mb-12">
              <AnimatedContainer direction="up">
                <nav
                  aria-labelledby="on-this-page-heading"
                  className="rounded-lg border border-gray-200 bg-slate-50/60 px-5 py-6"
                >
                  <h2
                    id="on-this-page-heading"
                    className={`text-2xl font-bold text-[#1a1a1a] mb-5 ${marcellus.className}`}
                  >
                    {data.overviewNav.title}
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {data.overviewNav.groups.map((group) => (
                      <div key={group.title}>
                        <p
                          className={`text-sm font-semibold uppercase tracking-wide text-[#c89e3a] mb-2 ${jost.className}`}
                        >
                          {group.title}
                        </p>
                        <ul className={`space-y-1.5 ${jost.className}`}>
                          {group.items.map((item) => (
                            <li key={item.id}>
                              <a
                                href={`#${item.id}`}
                                className="text-gray-700 hover:text-[#c89e3a] hover:underline text-sm leading-snug"
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </nav>
              </AnimatedContainer>
            </div>

            {data.sections.map((section) => (
              <Section
                key={section.id}
                id={section.id}
                title={section.title}
                paragraphs={section.paragraphs}
                table={"table" in section ? (section.table as TableData) : undefined}
              />
            ))}

            <Section
              id={data.finalAnswer.id}
              title={data.finalAnswer.title}
              paragraphs={data.finalAnswer.paragraphs}
            />

            <Section
              id={data.cta.id}
              title={data.cta.title}
              paragraphs={data.cta.richParagraphs.map((segments) =>
                segments.map((segment) => segment.value).join(" "),
              )}
            />

            {/* FAQs */}
            <div className="mb-12">
              <AnimatedContainer direction="up">
                <section id="faqs" className="scroll-mt-28" aria-labelledby="faqs-heading">
                  <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
                  <h2
                    id="faqs-heading"
                    className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}
                  >
                    {data.faqs.title}
                  </h2>
                  <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                    {data.faqs.items.map((item, index) => (
                      <details
                        key={item.question}
                        className="group bg-white open:bg-[#FAF6EB]/40 w-full"
                        open={index === 0}
                      >
                        <summary className="cursor-pointer list-none px-5 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c89e3a] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                          <span className="flex items-start justify-between gap-4">
                            <h3 className={`text-lg text-gray-900 text-left ${marcellus.className}`}>
                              {item.question}
                            </h3>
                            <span
                              className="text-[#c89e3a] text-xl shrink-0 group-open:rotate-45 transition-transform"
                              aria-hidden="true"
                            >
                              +
                            </span>
                          </span>
                        </summary>
                        <div
                          className={`px-5 pb-5 text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}
                        >
                          <p>{item.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              </AnimatedContainer>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
