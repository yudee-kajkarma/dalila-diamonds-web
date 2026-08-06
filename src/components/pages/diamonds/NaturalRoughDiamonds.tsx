import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import {
  getNaturalRoughDiamondsData,
  type NaturalRoughDiamondsPageData,
  NATURAL_ROUGH_PATH,
} from "@/lib/i18n/getNaturalRoughDiamondsData";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";

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

type ContentImageData = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const WEBSITE_ORIGIN = "https://www.daliladiamonds.com";

function localizedPath(path: string, locale: Locale) {
  return getLocalizedPath(path, locale);
}

function isHashHref(href: string) {
  return href.startsWith("#");
}

function buildStructuredDataGraph(data: NaturalRoughDiamondsPageData, locale: Locale) {
  const pageUrl = `${WEBSITE_ORIGIN}${localizedPath(NATURAL_ROUGH_PATH, locale)}`;
  const homeUrl = `${WEBSITE_ORIGIN}${localizedPath("/", locale)}`;
  const parentHubUrl = data.meta.parentHub.startsWith("http")
    ? data.meta.parentHub
    : `${WEBSITE_ORIGIN}${localizedPath(data.banner.breadcrumbParentHref, locale)}`;
  const webPageId = `${pageUrl}#webpage`;
  const faqId = `${pageUrl}#faq`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webPageId,
        name: data.hero.title,
        description: data.meta.description,
        url: pageUrl,
        datePublished: data.meta.datePublished,
        dateModified: data.meta.dateModified,
        inLanguage: data.meta.inLanguage || locale,
        isPartOf: {
          "@type": "WebPage",
          "@id": parentHubUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "Dalila Diamonds",
          url: `${WEBSITE_ORIGIN}/`,
          logo: {
            "@type": "ImageObject",
            url: data.images.logo,
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: data.faqs.items.map((item) => ({
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
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: data.banner.breadcrumbHome,
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: data.banner.breadcrumbParent,
            item: parentHubUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: data.banner.breadcrumbCurrent,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

function PlainParagraphs({ items, className = "" }: { items: string[]; className?: string }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      {items.map((paragraph) => (
        <p
          key={paragraph.slice(0, 64)}
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

        if (segment.external || segment.href.startsWith("http")) {
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

        if (isHashHref(segment.href)) {
          return (
            <a key={index} href={segment.href} className="text-[#c89e3a] hover:underline font-medium">
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
  if (!paragraphs || paragraphs.length === 0) return null;

  return (
    <>
      {paragraphs.map((segments, index) => (
        <RichParagraph
          key={index}
          segments={segments}
          locale={locale}
          className={`text-base md:text-lg leading-relaxed mb-6 text-gray-700 ${className}`.trim()}
        />
      ))}
    </>
  );
}

function BulletList({ items, className = "" }: { items: string[]; className?: string }) {
  if (!items || items.length === 0) return null;

  return (
    <ul className={`space-y-4 mb-6 ${jost.className} ${className}`.trim()}>
      {items.map((item) => (
        <li
          key={item.slice(0, 48)}
          className="flex items-start gap-3 text-gray-700 text-base md:text-lg leading-relaxed"
        >
          <span className="text-[#c89e3a] mt-1 font-bold text-xl shrink-0">•</span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DataTable({ table }: { table: TableData }) {
  if (!table?.headers?.length) return null;

  return (
    <div className="overflow-x-auto mb-6">
      <table className={`min-w-full border border-gray-200 text-left text-sm md:text-base ${jost.className}`}>
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
        {table.rows.length > 0 ? (
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
        ) : null}
      </table>
    </div>
  );
}

function ContentImage({ image }: { image: ContentImageData }) {
  if (!image?.src) return null;

  return (
    <figure className="mb-8">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="w-full h-auto rounded-sm bg-slate-50"
      />
    </figure>
  );
}

function CtaLink({
  href,
  children,
  locale,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  locale: Locale;
  variant?: "primary" | "secondary" | "secondaryDark";
}) {
  const base = `inline-flex items-center justify-center rounded-md px-6 py-3 font-medium transition-colors ${jost.className}`;
  const styles =
    variant === "primary"
      ? "bg-[#c89e3a] text-white hover:bg-[#b8902f]"
      : variant === "secondaryDark"
        ? "border border-white/30 text-white hover:bg-white/10"
        : "border border-gray-300 text-gray-900 hover:bg-white";

  if (isHashHref(href)) {
    return (
      <a href={href} className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }

  return (
    <Link href={localizedPath(href, locale)} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

function renderSection({
  id,
  title,
  headingLevel = 2,
  paragraphsBefore = [],
  paragraphsAfter = [],
  bullets = [],
  table,
  children,
}: {
  id?: string;
  title: string;
  headingLevel?: 2 | 3;
  paragraphsBefore?: string[];
  paragraphsAfter?: string[];
  bullets?: string[];
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
      <div>
        <section
          id={id}
          className="scroll-mt-28 bg-white"
          aria-labelledby={id ? `${id}-heading` : undefined}
        >
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
          {table && table.headers.length > 0 ? <DataTable table={table} /> : null}
          <PlainParagraphs items={paragraphsAfter} />
          {children}
        </section>
      </div>
    </div>
  );
}

interface NaturalRoughDiamondsProps {
  locale?: Locale;
}

export default function NaturalRoughDiamonds({ locale = "en" }: NaturalRoughDiamondsProps) {
  const data = getNaturalRoughDiamondsData(locale);

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
            <div>
              <p
                className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white mb-3 mt-8 sm:mt-30 whitespace-nowrap sm:whitespace-normal ${marcellus.className}`}
                style={{ lineHeight: 1.15 }}
              >
                {data.banner.title}
              </p>
              <div className="w-2/3 sm:w-[35%] h-px bg-amber-400 mx-auto mb-6" aria-hidden="true" />
            </div>

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
                href={localizedPath(data.banner.breadcrumbParentHref, locale)}
                className={`hover:text-amber-400 transition-colors ${jost.className}`}
              >
                {data.banner.breadcrumbParent}
              </Link>
              <span aria-hidden="true">›</span>
              <span className={jost.className}>{data.banner.breadcrumbCurrent}</span>
            </nav>
          </div>
        </section>
      </div>

      {/* Hero */}
      <section className="bg-white py-10 md:py-14" aria-labelledby="natural-rough-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <div>
            <h1
              id="natural-rough-hero-heading"
              className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-4 tracking-tight leading-tight ${marcellus.className}`}
            >
              {data.hero.title}
            </h1>
            <PlainParagraphs items={data.hero.introParagraphs} />
            <RichParagraphList
              paragraphs={data.hero.richIntroParagraphs as RichSegment[][]}
              locale={locale}
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
              <CtaLink href={data.hero.primaryButtonHref} locale={locale} variant="primary">
                {data.hero.primaryButtonText}
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section
        className="bg-[#FAF6EB] border-y border-[#c89e3a]/20 py-10 md:py-12"
        aria-labelledby="natural-rough-quick-answer"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div>
            <h2
              id="natural-rough-quick-answer"
              className={`text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 ${marcellus.className}`}
            >
              {data.quickAnswer.title}
            </h2>
            <RichParagraphList
              paragraphs={data.quickAnswer.richParagraphs as RichSegment[][]}
              locale={locale}
              className="text-gray-800"
            />
          </div>
        </div>
      </section>

      {/* Main content sections */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {renderSection({
          id: data.whatIs.id,
          title: data.whatIs.title,
          paragraphsBefore: data.whatIs.introParagraphs,
          bullets: data.whatIs.bullets,
          children: (
            <RichParagraphList
              paragraphs={data.whatIs.richClosingParagraphs as RichSegment[][]}
              locale={locale}
            />
          ),
        })}

        {renderSection({
          id: data.roughVsPolished.id,
          title: data.roughVsPolished.title,
          table: data.roughVsPolished.table,
          children: (
            <>
              <ContentImage image={data.images.roughVsPolished} />
              <RichParagraphList
                paragraphs={data.roughVsPolished.richClosingParagraphs as RichSegment[][]}
                locale={locale}
              />
            </>
          ),
        })}

        {renderSection({
          id: data.whoPurchases.id,
          title: data.whoPurchases.title,
          paragraphsBefore: data.whoPurchases.introParagraphs,
          bullets: data.whoPurchases.bullets,
          paragraphsAfter: data.whoPurchases.closingParagraphs,
        })}

        <div className="mb-12">
          <div>
            <section
              id={data.howEvaluated.id}
              className="scroll-mt-28 bg-white"
              aria-labelledby={`${data.howEvaluated.id}-heading`}
            >
              <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
              <h2
                id={`${data.howEvaluated.id}-heading`}
                className={`text-3xl md:text-4xl lg:text-4xl font-bold text-[#1a1a1a] mb-8 leading-tight ${marcellus.className}`}
              >
                {data.howEvaluated.title}
              </h2>

              <ContentImage image={data.images.evaluation} />

              {data.howEvaluated.subsections.map((step) => (
                <Fragment key={step.id}>
                  <div className="mb-10">
                    <h3
                      id={step.id}
                      className={`scroll-mt-28 text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight ${marcellus.className}`}
                    >
                      <span className="text-[#c89e3a] mr-2">{step.number}.</span>
                      {step.title}
                    </h3>

                    {"introParagraphs" in step && step.introParagraphs ? (
                      <PlainParagraphs items={step.introParagraphs} />
                    ) : null}

                    {"richParagraphs" in step && step.richParagraphs ? (
                      <RichParagraphList
                        paragraphs={step.richParagraphs as RichSegment[][]}
                        locale={locale}
                      />
                    ) : null}

                    {"bullets" in step && step.bullets ? <BulletList items={step.bullets} /> : null}

                    {"paragraphs" in step && step.paragraphs ? (
                      <PlainParagraphs items={step.paragraphs} />
                    ) : null}

                    {"closingParagraphs" in step && step.closingParagraphs ? (
                      <PlainParagraphs items={step.closingParagraphs} />
                    ) : null}

                    {step.number === 1 ? <ContentImage image={data.images.naturalVsLab} /> : null}
                  </div>
                </Fragment>
              ))}
            </section>
          </div>
        </div>

        {renderSection({
          id: data.whatDeterminesPrice.id,
          title: data.whatDeterminesPrice.title,
          paragraphsBefore: data.whatDeterminesPrice.introParagraphs,
          bullets: data.whatDeterminesPrice.bullets,
          children: (
            <RichParagraphList
              paragraphs={data.whatDeterminesPrice.richClosingParagraphs as RichSegment[][]}
              locale={locale}
            />
          ),
        })}

        {renderSection({
          id: data.kimberleyProcess.id,
          title: data.kimberleyProcess.title,
          children: (
            <>
              <RichParagraphList
                paragraphs={data.kimberleyProcess.richParagraphs as RichSegment[][]}
                locale={locale}
              />
              <ContentImage image={data.images.documentation} />
            </>
          ),
        })}

        {renderSection({
          id: data.verificationChecklist.id,
          title: data.verificationChecklist.title,
          paragraphsBefore: data.verificationChecklist.introParagraphs,
          bullets: data.verificationChecklist.bullets,
          paragraphsAfter: data.verificationChecklist.closingParagraphs,
        })}

        <div className="mb-12">
          <div>
            <section
              id={data.enquiryProcess.id}
              className="scroll-mt-28 bg-white"
              aria-labelledby={`${data.enquiryProcess.id}-heading`}
            >
              <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
              <h2
                id={`${data.enquiryProcess.id}-heading`}
                className={`text-3xl md:text-4xl lg:text-4xl font-bold text-[#1a1a1a] mb-8 leading-tight ${marcellus.className}`}
              >
                {data.enquiryProcess.title}
              </h2>
              <PlainParagraphs items={data.enquiryProcess.introParagraphs} />

              {data.enquiryProcess.steps.map((step) => (
                <Fragment key={step.id}>
                  <div className="mb-10">
                    <h3
                      id={step.id}
                      className={`scroll-mt-28 text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight ${marcellus.className}`}
                    >
                      <span className="text-[#c89e3a] mr-2">{step.number}.</span>
                      {step.title}
                    </h3>
                    <PlainParagraphs items={step.paragraphs} />
                  </div>
                </Fragment>
              ))}
            </section>
          </div>
        </div>

        {renderSection({
          id: data.contactExpert.id,
          title: data.contactExpert.title,
          paragraphsBefore: data.contactExpert.introParagraphs,
          bullets: data.contactExpert.bullets,
          children: (
            <>
              <div className="mb-4">
                <CtaLink href={data.contactExpert.primaryButtonHref} locale={locale} variant="primary">
                  {data.contactExpert.primaryButtonText}
                </CtaLink>
              </div>
              <p className={`text-gray-600 text-base md:text-lg leading-relaxed ${jost.className}`}>
                {data.contactExpert.supportingNotice}
              </p>
            </>
          ),
        })}
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 md:py-16" aria-labelledby="natural-rough-faq-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <div>
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
            <h2
              id="natural-rough-faq-heading"
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
                  <div className={`px-5 pb-5 text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id={data.finalCta.id}
        className="scroll-mt-28 bg-slate-900 text-white py-12 md:py-16"
        aria-labelledby="natural-rough-final-cta-heading"
      >
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <div>
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full mx-auto" />
            <h2
              id="natural-rough-final-cta-heading"
              className={`text-3xl md:text-4xl font-bold mb-6 ${marcellus.className}`}
            >
              {data.finalCta.title}
            </h2>
            <div className="text-gray-200 [&_p]:text-gray-200 [&_a]:text-[#e4c75f]">
              <RichParagraphList
                paragraphs={data.finalCta.richParagraphs as RichSegment[][]}
                locale={locale}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <CtaLink href={data.finalCta.primaryButtonHref} locale={locale} variant="primary">
                {data.finalCta.primaryButtonText}
              </CtaLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
