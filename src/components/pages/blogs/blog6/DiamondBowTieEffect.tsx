import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import FeaturedDiamondsCarousel from "@/components/pages/blogs/FeaturedDiamondsCarousel";
import { getBlog6Data, type Blog6PageData, BLOG6_PATH } from "@/lib/i18n/getBlog6Data";
import { getStaticBlogCards } from "@/lib/staticBlogs";
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

type ContentImageData = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Subsection = {
  id: string;
  title: string;
  paragraphs?: string[];
  paragraphsBefore?: string[];
  paragraphsAfter?: string[];
  bullets?: string[];
  richParagraphsAfter?: RichSegment[][];
};

const WEBSITE_ORIGIN = "https://www.daliladiamonds.com";

function localizedPath(path: string, locale: Locale) {
  return getLocalizedPath(path, locale);
}

function buildStructuredDataGraph(data: Blog6PageData, locale: Locale) {
  const pageUrl = `${WEBSITE_ORIGIN}${localizedPath(BLOG6_PATH, locale)}`;
  const blogsUrl = `${WEBSITE_ORIGIN}${localizedPath("/blogs", locale)}`;
  const homeUrl = `${WEBSITE_ORIGIN}${localizedPath("/", locale)}`;
  const articleId = `${pageUrl}#article`;
  const faqId = `${pageUrl}#faq`;
  const featuredImage = data.images.featured.src.startsWith("http")
    ? data.images.featured.src
    : `${WEBSITE_ORIGIN}${data.images.featured.src}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": articleId,
        headline: data.hero.title,
        description: data.meta.description,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
        },
        image: {
          "@type": "ImageObject",
          url: featuredImage,
          width: data.images.featured.width,
          height: data.images.featured.height,
        },
        datePublished: data.meta.datePublished,
        dateModified: data.meta.dateModified,
        author: {
          "@type": "Organization",
          name: "Dalila Diamonds",
          url: `${WEBSITE_ORIGIN}/`,
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
        inLanguage: data.meta.inLanguage || locale,
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
            name: data.banner.breadcrumbBlogs,
            item: blogsUrl,
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
  if (!paragraphs || paragraphs.length === 0) return null;

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
  return (
    <figure className="mb-8">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="w-full h-auto"
      />
    </figure>
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
      <AnimatedContainer direction="up">
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
        paragraphsAfter: subsection.paragraphsAfter,
        children: subsection.richParagraphsAfter?.length ? (
          <RichParagraphList paragraphs={subsection.richParagraphsAfter} locale={locale} />
        ) : undefined,
      })}
    </Fragment>
  );
}

interface DiamondBowTieEffectProps {
  locale?: Locale;
}

export default function DiamondBowTieEffect({
  locale = "en",
}: DiamondBowTieEffectProps) {
  const data = getBlog6Data(locale);
  const staticArticles = getStaticBlogCards(locale);

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
              <Link
                href={localizedPath("/", locale)}
                className={`hover:text-amber-400 transition-colors ${jost.className}`}
              >
                {data.banner.breadcrumbHome}
              </Link>
              <span aria-hidden="true">›</span>
              <Link
                href={localizedPath(data.sidebar.blogsHref, locale)}
                className={`hover:text-amber-400 transition-colors ${jost.className}`}
              >
                {data.banner.breadcrumbBlogs}
              </Link>
              <span aria-hidden="true">›</span>
              <span className={jost.className}>{data.banner.breadcrumbCurrent}</span>
            </nav>
          </div>
        </section>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pt-8 pb-6">
        <Link
          href={localizedPath(data.sidebar.blogsHref, locale)}
          className={`inline-flex items-center gap-2 text-[#c89e3a] hover:text-[#b8922e] font-medium transition-all ${jost.className} hover:gap-3`}
        >
          <ArrowLeft size={18} />
          {data.sidebar.backToArticles}
        </Link>
      </div>

      {/* Hero */}
      <section className="bg-white pb-10 md:pb-14" aria-labelledby="blog6-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <h1
              id="blog6-hero-heading"
              className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-4 tracking-tight leading-tight ${marcellus.className}`}
            >
              {data.hero.title}
            </h1>
            <p className={`text-lg md:text-xl text-gray-700 leading-relaxed mb-6 ${jost.className}`}>
              {data.hero.subheading}
            </p>
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
      <section
        className="bg-[#FAF6EB] border-y border-[#c89e3a]/20 py-10 md:py-12"
        aria-labelledby="blog6-quick-answer"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <h2
              id="blog6-quick-answer"
              className={`text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 ${marcellus.className}`}
            >
              {data.quickAnswer.title}
            </h2>
            {data.quickAnswer.question ? (
              <h3 className={`text-xl md:text-2xl font-bold text-[#1a1a1a] mb-4 ${marcellus.className}`}>
                {data.quickAnswer.question}
              </h3>
            ) : null}
            <PlainParagraphs items={data.quickAnswer.introParagraphs} className="text-gray-800 mb-3" />
            <BulletList items={data.quickAnswer.attributes} className="text-gray-800 mb-3" />
            <PlainParagraphs
              items={data.quickAnswer.closingParagraphs}
              className="text-gray-800 mb-0 last:mb-0"
            />
            <BulletList items={data.quickAnswer.closingBullets} className="text-gray-800 mb-3" />
            <PlainParagraphs items={data.quickAnswer.finalParagraphs} className="text-gray-800" />
          </AnimatedContainer>
        </div>
      </section>

      {/* Main content with sidebar */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
          <aside className="sticky-sidebar order-2 lg:order-1">
            <div className="mb-6">
              <h3 className={`text-xl font-bold text-[#2d2d2d] mb-5 ${marcellus.className}`}>
                {data.sidebar.articlesTitle}
              </h3>
              <ul className="space-y-4">
                {staticArticles.map((article, index) => {
                  const isActive = article.path === BLOG6_PATH;
                  return (
                    <li key={article.id}>
                      <Link
                        href={localizedPath(article.path, locale)}
                        className={`text-left transition-colors group w-full flex items-start justify-between gap-3 py-1 ${
                          isActive ? "text-[#c89e3a]" : "text-gray-700 hover:text-[#c89e3a]"
                        }`}
                      >
                        <span
                          className={`text-base flex-1 ${index === 0 ? "" : "line-clamp-2"} ${jost.className}`}
                        >
                          {article.title}
                        </span>
                        <ArrowRight
                          size={16}
                          className={`shrink-0 -mt-0.5 transition-transform group-hover:translate-x-1 ${
                            isActive ? "text-[#c89e3a]" : "text-gray-400 group-hover:text-[#c89e3a]"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mb-6">
              <div className="bg-linear-to-br from-[#2d2d2d] to-[#1a1a1a] text-white p-6 shadow-lg">
                <h3 className={`text-xl font-bold mb-4 ${marcellus.className}`}>
                  {data.sidebar.findUsTitle}
                </h3>
                <div className={`space-y-3 text-sm text-gray-200 ${jost.className}`}>
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#c89e3a] shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-white mb-1">{data.sidebar.companyName}</p>
                      <p className="leading-relaxed">
                        {data.sidebar.addressLines.map((line) => (
                          <Fragment key={line}>
                            {line}
                            <br />
                          </Fragment>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#c89e3a] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${data.sidebar.email}`}
                      className="hover:text-[#c89e3a] transition-colors"
                    >
                      {data.sidebar.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#c89e3a] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a
                      href={data.sidebar.phoneHref}
                      className="hover:text-[#c89e3a] transition-colors"
                    >
                      {data.sidebar.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#c89e3a] text-white p-6 shadow-lg">
                <h3 className={`text-xl font-bold mb-3 ${marcellus.className}`}>
                  {data.sidebar.inventoryTitle}
                </h3>
                <p className={`text-sm mb-4 text-white/90 ${jost.className}`}>
                  {data.sidebar.inventoryDescription}
                </p>
                <Link
                  href={localizedPath(data.sidebar.inventoryHref, locale)}
                  className={`w-full bg-white text-[#2d2d2d] py-2.5 px-4 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group font-semibold ${jost.className}`}
                >
                  <span>{data.sidebar.inventoryButtonText}</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </aside>

          <article className="flex-1 order-1 lg:order-2 min-w-0">
            <PlainParagraphs items={data.introduction.paragraphs} />

            {renderSection({
              id: "blog6-key-takeaways",
              title: data.keyTakeaways.title,
              bullets: data.keyTakeaways.items,
            })}

            <div className="mb-12">
              <AnimatedContainer direction="up">
                <nav className="bg-white scroll-mt-28" aria-labelledby="blog6-overview-nav">
                  <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
                  <h2
                    id="blog6-overview-nav"
                    className={`text-3xl md:text-4xl lg:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}
                  >
                    {data.overviewNav.title}
                  </h2>
                  <ol className={`space-y-4 list-decimal list-inside ${jost.className}`}>
                    {data.overviewNav.items.map((item) => (
                      <li key={item.id} className="text-gray-700 text-base md:text-lg leading-relaxed pl-2">
                        <a
                          href={`#${item.id}`}
                          className="text-[#1a1a1a] hover:text-[#c89e3a] underline-offset-2 hover:underline"
                        >
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
            })}

            {renderSection({
              id: data.whatCauses.id,
              title: data.whatCauses.title,
              paragraphsBefore: data.whatCauses.introParagraphs,
              children: (
                <>
                  <ContentImage image={data.images.howItForms} />
                  {data.whatCauses.subsections.map((subsection) =>
                    renderSubsection(subsection, locale)
                  )}
                </>
              ),
            })}

            {renderSection({
              id: data.isAlwaysBad.id,
              title: data.isAlwaysBad.title,
              paragraphsBefore: data.isAlwaysBad.introParagraphs,
              bullets: data.isAlwaysBad.bullets,
              paragraphsAfter: data.isAlwaysBad.closingParagraphs,
            })}

            {renderSection({
              id: data.whenProblem.id,
              title: data.whenProblem.title,
              paragraphsBefore: data.whenProblem.introParagraphs,
              children: data.whenProblem.subsections.map((subsection) =>
                renderSubsection(subsection, locale)
              ),
            })}

            {renderSection({
              id: data.severityGuide.id,
              title: data.severityGuide.title,
              paragraphsBefore: data.severityGuide.introParagraphs,
              children: (
                <>
                  <DataTable table={data.severityGuide.table} />
                  <ContentImage image={data.images.severity} />
                  <PlainParagraphs items={data.severityGuide.closingParagraphs} />
                </>
              ),
            })}

            {renderSection({
              id: data.ovalBowTie.id,
              title: data.ovalBowTie.title,
              paragraphsBefore: data.ovalBowTie.introParagraphs,
              bullets: data.ovalBowTie.bullets,
              paragraphsAfter: data.ovalBowTie.closingParagraphs,
              children: data.ovalBowTie.subsections.map((subsection) =>
                renderSubsection(subsection, locale)
              ),
            })}

            {renderSection({
              id: data.pearBowTie.id,
              title: data.pearBowTie.title,
              paragraphsBefore: data.pearBowTie.introParagraphs,
              bullets: data.pearBowTie.bullets,
              paragraphsAfter: data.pearBowTie.closingParagraphs,
              children: data.pearBowTie.subsections.map((subsection) =>
                renderSubsection(subsection, locale)
              ),
            })}

            {renderSection({
              id: data.marquiseBowTie.id,
              title: data.marquiseBowTie.title,
              paragraphsBefore: data.marquiseBowTie.introParagraphs,
              bullets: data.marquiseBowTie.bullets,
              paragraphsAfter: data.marquiseBowTie.closingParagraphs,
              children: data.marquiseBowTie.subsections.map((subsection) =>
                renderSubsection(subsection, locale)
              ),
            })}

            {renderSection({
              id: data.otherShapes.id,
              title: data.otherShapes.title,
              paragraphsBefore: data.otherShapes.introParagraphs,
              bullets: data.otherShapes.bullets,
              paragraphsAfter: data.otherShapes.closingParagraphs,
              children: (
                <>
                  <BulletList items={data.otherShapes.closingBullets} />
                  <RichParagraphList
                    paragraphs={data.otherShapes.richClosingParagraphs as RichSegment[][]}
                    locale={locale}
                  />
                </>
              ),
            })}

            {renderSection({
              id: data.vsContrast.id,
              title: data.vsContrast.title,
              paragraphsBefore: data.vsContrast.introParagraphs,
              bullets: data.vsContrast.bullets,
              paragraphsAfter: data.vsContrast.closingParagraphs,
              children: (
                <>
                  <BulletList items={data.vsContrast.closingBullets} />
                  <PlainParagraphs items={data.vsContrast.finalParagraphs} />
                </>
              ),
            })}

            {renderSection({
              id: data.vsWindowing.id,
              title: data.vsWindowing.title,
              paragraphsBefore: data.vsWindowing.introParagraphs,
              children: data.vsWindowing.subsections.map((subsection) =>
                renderSubsection(subsection, locale)
              ),
            })}

            {renderSection({
              id: data.doesGiaReport.id,
              title: data.doesGiaReport.title,
              paragraphsBefore: data.doesGiaReport.introParagraphs,
              bullets: data.doesGiaReport.bullets,
              paragraphsAfter: data.doesGiaReport.closingParagraphs,
              children: (
                <RichParagraphList
                  paragraphs={data.doesGiaReport.richClosingParagraphs as RichSegment[][]}
                  locale={locale}
                />
              ),
            })}

            {renderSection({
              id: data.canTableDepthPredict.id,
              title: data.canTableDepthPredict.title,
              paragraphsBefore: data.canTableDepthPredict.introParagraphs,
              bullets: data.canTableDepthPredict.bullets,
              paragraphsAfter: data.canTableDepthPredict.closingParagraphs,
            })}

            {renderSection({
              id: data.doesRatioCause.id,
              title: data.doesRatioCause.title,
              paragraphsBefore: data.doesRatioCause.introParagraphs,
              children: (
                <RichParagraphList
                  paragraphs={data.doesRatioCause.richClosingParagraphs as RichSegment[][]}
                  locale={locale}
                />
              ),
            })}

            {renderSection({
              id: data.doPolishSymmetryPrevent.id,
              title: data.doPolishSymmetryPrevent.title,
              paragraphsBefore: data.doPolishSymmetryPrevent.introParagraphs,
              bullets: data.doPolishSymmetryPrevent.bullets,
              paragraphsAfter: data.doPolishSymmetryPrevent.closingParagraphs,
            })}

            {renderSection({
              id: data.canSettingHide.id,
              title: data.canSettingHide.title,
              paragraphsBefore: data.canSettingHide.introParagraphs,
              bullets: data.canSettingHide.bullets,
              paragraphsAfter: data.canSettingHide.closingParagraphs,
              children: (
                <RichParagraphList
                  paragraphs={data.canSettingHide.richClosingParagraphs as RichSegment[][]}
                  locale={locale}
                />
              ),
            })}

            {renderSection({
              id: data.canPhotographShow.id,
              title: data.canPhotographShow.title,
              paragraphsBefore: data.canPhotographShow.introParagraphs,
              bullets: data.canPhotographShow.bullets,
              paragraphsAfter: data.canPhotographShow.closingParagraphs,
            })}

            {renderSection({
              id: data.howToEvaluateOnline.id,
              title: data.howToEvaluateOnline.title,
              paragraphsBefore: data.howToEvaluateOnline.introParagraphs,
              bullets: data.howToEvaluateOnline.bullets,
              paragraphsAfter: data.howToEvaluateOnline.closingParagraphs,
              children: (
                <>
                  <BulletList items={data.howToEvaluateOnline.closingBullets} />
                  <PlainParagraphs items={data.howToEvaluateOnline.finalParagraphs} />
                </>
              ),
            })}

            {renderSection({
              id: data.fiveStepInspection.id,
              title: data.fiveStepInspection.title,
              paragraphsBefore: data.fiveStepInspection.introParagraphs,
              children: (
                <>
                  <ContentImage image={data.images.inspection} />
                  {data.fiveStepInspection.subsections.map((subsection) =>
                    renderSubsection(subsection, locale)
                  )}
                </>
              ),
            })}

            {renderSection({
              id: data.buyerComparisonTable.id,
              title: data.buyerComparisonTable.title,
              paragraphsBefore: data.buyerComparisonTable.introParagraphs,
              table: data.buyerComparisonTable.table,
            })}

            {renderSection({
              id: data.warningSigns.id,
              title: data.warningSigns.title,
              paragraphsBefore: data.warningSigns.introParagraphs,
              bullets: data.warningSigns.bullets,
            })}

            {renderSection({
              id: data.commonMistakes.id,
              title: data.commonMistakes.title,
              paragraphsBefore: data.commonMistakes.introParagraphs,
              children: data.commonMistakes.subsections.map((subsection) =>
                renderSubsection(subsection, locale)
              ),
            })}

            {renderSection({
              id: data.buyingChecklist.id,
              title: data.buyingChecklist.title,
              paragraphsBefore: data.buyingChecklist.introParagraphs,
              bullets: data.buyingChecklist.items,
            })}

            {renderSection({
              id: data.antwerpPerspective.id,
              title: data.antwerpPerspective.title,
              paragraphsBefore: data.antwerpPerspective.introParagraphs,
              bullets: data.antwerpPerspective.bullets,
              children: (
                <RichParagraphList
                  paragraphs={data.antwerpPerspective.richClosingParagraphs as RichSegment[][]}
                  locale={locale}
                />
              ),
            })}

            {renderSection({
              id: data.finalAnswer.id,
              title: data.finalAnswer.title,
              paragraphsBefore: data.finalAnswer.introParagraphs,
              bullets: data.finalAnswer.bullets,
              paragraphsAfter: data.finalAnswer.closingParagraphs,
            })}
          </article>
        </div>
      </section>

      {/* CTA */}
      <section
        id={data.cta.id}
        className="scroll-mt-28 bg-slate-900 text-white py-12 md:py-16"
        aria-labelledby="blog6-cta-heading"
      >
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full mx-auto" />
            <h2
              id="blog6-cta-heading"
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
      <section className="bg-white py-12 md:py-16" aria-labelledby="blog6-faq-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
            <h2
              id="blog6-faq-heading"
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
          </AnimatedContainer>
        </div>
      </section>

      {/* Final Takeaway */}
      <section
        id={data.finalTakeaway.id}
        className="scroll-mt-28 bg-[#FAF6EB] py-12 md:py-16 border-t border-[#c89e3a]/20"
        aria-labelledby="blog6-final-takeaway-heading"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
            <h2
              id="blog6-final-takeaway-heading"
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

      <FeaturedDiamondsCarousel />
    </main>
  );
}
