"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { getDiamondSizeChartData, type DiamondSizeChartPageData } from "@/lib/i18n/getDiamondSizeChartData";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

function localizedPath(path: string, locale: Locale) {
  if (path.startsWith("http")) return path;
  return getLocalizedPath(path, locale);
}

type TableData = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

function DataTable({ table }: { table: TableData }) {
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
      </table>
    </div>
  );
}

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <>
      <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
      <h2
        id={`${id}-heading`}
        className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}
      >
        {title}
      </h2>
    </>
  );
}

function buildStructuredData(data: DiamondSizeChartPageData, locale: Locale) {
  const homeUrl = `https://www.daliladiamonds.com${getLocalizedPath("/", locale)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${data.meta.canonical}#webpage`,
        url: data.meta.canonical,
        name: data.meta.title,
        description: data.meta.description,
        inLanguage: data.meta.inLanguage,
        datePublished: data.meta.datePublished,
        dateModified: data.meta.dateModified,
        isPartOf: { "@id": "https://www.daliladiamonds.com/#website" },
        breadcrumb: { "@id": `${data.meta.canonical}#breadcrumb` },
        primaryImageOfPage: { "@id": `${data.meta.canonical}#primaryimage` },
      },
      {
        "@type": "ImageObject",
        "@id": `${data.meta.canonical}#primaryimage`,
        url: `https://www.daliladiamonds.com${data.hero.image.src}`,
        contentUrl: `https://www.daliladiamonds.com${data.hero.image.src}`,
        width: data.hero.image.width,
        height: data.hero.image.height,
        caption: data.hero.image.alt,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${data.meta.canonical}#breadcrumb`,
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
      {
        "@type": "FAQPage",
        "@id": `${data.meta.canonical}#faq`,
        mainEntity: data.faqs.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export default function DiamondSizeChart({ locale = "en" }: { locale?: Locale }) {
  const data = getDiamondSizeChartData(locale);
  const [shape, setShape] = useState(data.converter.shapes[0]);
  const [carat, setCarat] = useState("1.00");

  const resultKey = `${shape}|${carat}` as keyof typeof data.converter.results;
  const result = useMemo(() => data.converter.results[resultKey] ?? null, [resultKey]);

  return (
    <main className={`${marcellus.className} ${jost.className} bg-white min-h-screen`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData(data, locale)) }}
      />

      <div className="relative bg-slate-900">
        <section
          className="relative h-[36vh] sm:h-[55vh] lg:h-[50vh] flex items-center justify-center overflow-hidden"
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
          <div className="container mx-auto px-4 relative z-10 text-center py-8">
            <p className={`text-3xl sm:text-5xl lg:text-6xl text-white mb-3 mt-8 ${marcellus.className}`}>
              {data.banner.title}
            </p>
            <div className="w-2/3 sm:w-[35%] h-px bg-amber-400 mx-auto mb-6" aria-hidden="true" />
            <nav
              aria-label="Breadcrumb"
              className={`flex flex-wrap items-center justify-center gap-2 text-gray-300 text-sm md:text-base ${jost.className}`}
            >
              <Link href={localizedPath("/", locale)} className="hover:text-amber-400 transition-colors">
                {data.banner.breadcrumbHome}
              </Link>
              <span aria-hidden="true">›</span>
              <Link href={localizedPath("/blogs", locale)} className="hover:text-amber-400 transition-colors">
                {data.banner.breadcrumbResources}
              </Link>
              <span aria-hidden="true">›</span>
              <span>{data.banner.breadcrumbCurrent}</span>
            </nav>
          </div>
        </section>
      </div>

      <section className="bg-white py-10 md:py-14" aria-labelledby="size-chart-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h1
            id="size-chart-hero-heading"
            className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-6 tracking-tight ${marcellus.className}`}
          >
            {data.hero.title}
          </h1>

          <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden bg-black shadow-xl">
            <Image
              src={data.hero.image.src}
              alt={data.hero.image.alt}
              width={data.hero.image.width}
              height={data.hero.image.height}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <div className={`space-y-5 text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>
            {data.hero.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <aside className={`mb-8 p-5 md:p-6 bg-[#FAF6EB] border border-[#e4c75f]/40 ${jost.className}`}>
            <p className="text-gray-800 text-base md:text-lg leading-relaxed">{data.hero.importantNote}</p>
          </aside>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href={localizedPath(data.hero.primaryButtonHref, locale)}
              className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
            >
              {data.hero.primaryButtonText}
            </Link>
            <Link
              href={localizedPath(data.hero.secondaryButtonHref, locale)}
              className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#8a7028] hover:bg-[#faf6eb] font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
            >
              {data.hero.secondaryButtonText}
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-56 w-full shrink-0">
            <div className="sticky top-4">
              <ResourceSidebar currentPage="diamond-size-chart" />
            </div>
          </aside>

          <article className="flex-1 w-full min-w-0">
            <nav className="mb-12" aria-labelledby="size-chart-overview">
              <SectionHeading id="overview" title={data.overviewNav.title} />
              <ol className={`space-y-3 list-decimal list-inside ${jost.className}`}>
                {data.overviewNav.items.map((item) => (
                  <li key={item.id} className="text-gray-700 text-base md:text-lg">
                    <a href={`#${item.id}`} className="hover:text-[#c89e3a] underline-offset-2 hover:underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <section id={data.quickAnswer.id} className="scroll-mt-28 mb-12" aria-labelledby="quick-answer-heading">
              <SectionHeading id={data.quickAnswer.id} title={data.quickAnswer.title} />
              {data.quickAnswer.intro.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                  {p}
                </p>
              ))}
              <ul className={`space-y-2 mb-6 ${jost.className}`}>
                {data.quickAnswer.measurements.map((item) => (
                  <li key={item.shape} className="text-gray-700 text-base md:text-lg">
                    <span className="font-medium text-gray-900">{item.shape}:</span> {item.value}
                  </li>
                ))}
              </ul>
              {data.quickAnswer.closing.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>
                  {p}
                </p>
              ))}
              <div className="relative w-full aspect-[14/9] overflow-hidden bg-black shadow-lg">
                <Image
                  src={data.images.oneCaratComparison.src}
                  alt={data.images.oneCaratComparison.alt}
                  width={data.images.oneCaratComparison.width}
                  height={data.images.oneCaratComparison.height}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </section>

            <section
              id={data.converter.id}
              className="scroll-mt-28 mb-12 bg-[#0B1A33] text-white p-6 md:p-8"
              aria-labelledby="converter-heading"
            >
              <h2 id="converter-heading" className={`text-3xl md:text-4xl mb-2 ${marcellus.className}`}>
                {data.converter.title}
              </h2>
              <p className={`text-white/80 text-lg mb-8 ${jost.className}`}>{data.converter.subtitle}</p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="size-shape" className={`block text-sm text-white/70 mb-2 ${jost.className}`}>
                    {data.converter.shapeLabel}
                  </label>
                  <select
                    id="size-shape"
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className={`w-full bg-white/10 border border-white/20 rounded-md px-3 py-2.5 text-white ${jost.className}`}
                  >
                    {data.converter.shapes.map((option) => (
                      <option key={option} value={option} className="text-gray-900">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="size-carat" className={`block text-sm text-white/70 mb-2 ${jost.className}`}>
                    {data.converter.caratLabel}
                  </label>
                  <select
                    id="size-carat"
                    value={carat}
                    onChange={(e) => setCarat(e.target.value)}
                    className={`w-full bg-white/10 border border-white/20 rounded-md px-3 py-2.5 text-white ${jost.className}`}
                  >
                    {data.converter.carats.map((option) => (
                      <option key={option} value={option} className="text-gray-900">
                        {option} ct
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-white/5 border border-[#e4c75f]/30 p-5 md:p-6 mb-6">
                <h3 className={`text-xl md:text-2xl mb-3 ${marcellus.className}`}>{data.converter.resultHeading}</h3>
                <p className={`text-2xl text-[#e4c75f] mb-4 ${jost.className}`}>
                  {result ?? data.converter.unavailableMessage}
                </p>
                <p className={`text-white/70 text-sm md:text-base leading-relaxed ${jost.className}`}>
                  {data.converter.resultText}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={localizedPath(data.converter.viewInventoryHref, locale)}
                  className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-6 py-3 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
                >
                  {data.converter.viewInventoryText}
                </Link>
                <Link
                  href={localizedPath(data.converter.requestDs4uHref, locale)}
                  className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#e4c75f] hover:bg-white/5 font-medium px-6 py-3 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
                >
                  {data.converter.requestDs4uText}
                </Link>
              </div>
            </section>

            <section id={data.sizeChartByShape.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.sizeChartByShape.id} title={data.sizeChartByShape.title} />
              {data.sizeChartByShape.intro.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                  {p}
                </p>
              ))}
              <DataTable table={data.sizeChartByShape.table} />
              {data.sizeChartByShape.closing.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                  {p}
                </p>
              ))}
            </section>

            <section id={data.roundChart.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.roundChart.id} title={data.roundChart.title} />
              {data.roundChart.intro.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                  {p}
                </p>
              ))}
              <DataTable table={data.roundChart.table} />
              {data.roundChart.closing.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                  {p}
                </p>
              ))}
            </section>

            <section id={data.smallRoundChart.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.smallRoundChart.id} title={data.smallRoundChart.title} />
              {data.smallRoundChart.intro.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                  {p}
                </p>
              ))}
              <DataTable table={data.smallRoundChart.table} />
              {data.smallRoundChart.closing.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                  {p}
                </p>
              ))}
            </section>

            <section id={data.whatDoCaratAndMmMean.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.whatDoCaratAndMmMean.id} title={data.whatDoCaratAndMmMean.title} />
              {data.whatDoCaratAndMmMean.subsections.map((sub) => (
                <div key={sub.id} id={sub.id} className="mb-8 scroll-mt-28">
                  <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{sub.title}</h3>
                  {sub.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                      {p}
                    </p>
                  ))}
                  {"bullets" in sub && sub.bullets ? (
                    <ul className={`space-y-2 mb-4 ${jost.className}`}>
                      {sub.bullets.map((item) => (
                        <li key={item} className="text-gray-700 text-base md:text-lg">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {"closing" in sub && sub.closing
                    ? sub.closing.map((p) => (
                        <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                          {"giaCaratGuideUrl" in sub && sub.giaCaratGuideUrl && p.includes("GIA guide") ? (
                            <>
                              The{" "}
                              <a
                                href={sub.giaCaratGuideUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#c89e3a] hover:underline font-medium"
                              >
                                GIA guide to diamond carat weight
                              </a>{" "}
                              explains why carat should not be interpreted as a direct measurement of visible size.
                            </>
                          ) : (
                            p
                          )}
                        </p>
                      ))
                    : null}
                </div>
              ))}
            </section>

            <section id={data.whyLookDifferent.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.whyLookDifferent.id} title={data.whyLookDifferent.title} />
              {data.whyLookDifferent.subsections.map((sub) => (
                <div key={sub.id} id={sub.id} className="mb-8 scroll-mt-28">
                  <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{sub.title}</h3>
                  {sub.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                      {p}
                    </p>
                  ))}
                  {"showDepthImage" in sub && sub.showDepthImage ? (
                    <div className="relative w-full aspect-[14/9] overflow-hidden bg-black shadow-lg mt-4">
                      <Image
                        src={data.images.depthComparison.src}
                        alt={data.images.depthComparison.alt}
                        width={data.images.depthComparison.width}
                        height={data.images.depthComparison.height}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </section>

            <section id={data.whichShapeLooksLargest.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.whichShapeLooksLargest.id} title={data.whichShapeLooksLargest.title} />
              {data.whichShapeLooksLargest.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                  {p}
                </p>
              ))}
            </section>

            <section id={data.twoCarat.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.twoCarat.id} title={data.twoCarat.title} />
              {data.twoCarat.intro.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                  {p}
                </p>
              ))}
              <ul className={`space-y-2 mb-6 ${jost.className}`}>
                {data.twoCarat.measurements.map((item) => (
                  <li key={item.shape} className="text-gray-700 text-base md:text-lg">
                    <span className="font-medium text-gray-900">{item.shape}:</span> {item.value}
                  </li>
                ))}
              </ul>
              {data.twoCarat.closing.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                  {p}
                </p>
              ))}
            </section>

            <section id={data.howToCompare.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.howToCompare.id} title={data.howToCompare.title} />
              {data.howToCompare.steps.map((step) => (
                <div key={step.title} className="mb-8">
                  <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{step.title}</h3>
                  {step.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                      {"reportGuideHref" in step &&
                      step.reportGuideHref &&
                      p.includes("reading a GIA diamond report") ? (
                        <>
                          Use the measurements printed on the actual grading report. Dalila’s guide to{" "}
                          <Link
                            href={localizedPath(step.reportGuideHref, locale)}
                            className="text-[#c89e3a] hover:underline font-medium"
                          >
                            {step.reportGuideText}
                          </Link>{" "}
                          explains where the principal measurements and grading information appear.
                        </>
                      ) : (
                        p
                      )}
                    </p>
                  ))}
                </div>
              ))}
            </section>

            <section id={data.fingerSize.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.fingerSize.id} title={data.fingerSize.title} />
              {data.fingerSize.intro.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                  {p}
                </p>
              ))}
              <ul className={`space-y-2 mb-6 ${jost.className}`}>
                {data.fingerSize.factors.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 text-base md:text-lg">
                    <span className="text-[#c89e3a] font-bold" aria-hidden="true">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="relative w-full aspect-[14/9] overflow-hidden bg-black shadow-lg mb-6">
                <Image
                  src={data.images.fingerComparison.src}
                  alt={data.images.fingerComparison.alt}
                  width={data.images.fingerComparison.width}
                  height={data.images.fingerComparison.height}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              {data.fingerSize.closing.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                  {p}
                </p>
              ))}
            </section>

            <section id={data.existingSetting.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.existingSetting.id} title={data.existingSetting.title} />
              {data.existingSetting.intro.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                  {p}
                </p>
              ))}
              <ul className={`space-y-2 mb-6 ${jost.className}`}>
                {data.existingSetting.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 text-base md:text-lg">
                    <span className="text-[#c89e3a] font-bold" aria-hidden="true">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                {data.existingSetting.closing[0]}
              </p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                Dalila’s{" "}
                <Link href={localizedPath("/diamond-source", locale)} className="text-[#c89e3a] hover:underline font-medium">
                  custom diamond sourcing service
                </Link>{" "}
                can be used to request a natural diamond within a specific measurement range, subject to availability.
              </p>
            </section>

            <section id={data.matchedDiamonds.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.matchedDiamonds.id} title={data.matchedDiamonds.title} />
              {data.matchedDiamonds.intro.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                  {p}
                </p>
              ))}
              <ul className={`space-y-2 mb-6 ${jost.className}`}>
                {data.matchedDiamonds.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 text-base md:text-lg">
                    <span className="text-[#c89e3a] font-bold" aria-hidden="true">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                If you require a pair or group with controlled dimensions, submit the complete requirement through
                Dalila’s{" "}
                <Link href={localizedPath("/diamond-source", locale)} className="text-[#c89e3a] hover:underline font-medium">
                  DS4U service
                </Link>
                .
              </p>
            </section>

            <section id={data.largerLooking.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.largerLooking.id} title={data.largerLooking.title} />
              {data.largerLooking.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                  {p.includes("diamond price guide") ? (
                    <>
                      Price also depends on carat weight, shape, colour, clarity, cut quality, grading report, rarity
                      and current availability. Dalila’s{" "}
                      <Link
                        href={localizedPath("/blogs/diamond-price-guide", locale)}
                        className="text-[#c89e3a] hover:underline font-medium"
                      >
                        diamond price guide
                      </Link>{" "}
                      explains the main pricing factors.
                    </>
                  ) : (
                    p
                  )}
                </p>
              ))}
            </section>
          </article>
        </div>
      </div>

      <section id={data.cta.id} className="scroll-mt-28 bg-[#FAF6EB] py-12 md:py-16 border-y border-[#c89e3a]/20">
        <div className="container mx-auto max-w-7xl px-4">
          <SectionHeading id={data.cta.id} title={data.cta.title} />
          {data.cta.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
              {p}
            </p>
          ))}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 my-8">
            <Link
              href={localizedPath(data.cta.primaryButtonHref, locale)}
              className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
            >
              {data.cta.primaryButtonText}
            </Link>
            <Link
              href={localizedPath(data.cta.secondaryButtonHref, locale)}
              className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#8a7028] hover:bg-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
            >
              {data.cta.secondaryButtonText}
            </Link>
          </div>
          <p className={`text-gray-600 text-sm md:text-base leading-relaxed ${jost.className}`}>{data.cta.notice}</p>
        </div>
      </section>

      <section id={data.faqs.id} className="scroll-mt-28 bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <SectionHeading id={data.faqs.id} title={data.faqs.title} />
          <div className="space-y-4">
            {data.faqs.items.map((item, index) => (
              <details
                key={item.question}
                className="group border border-gray-200 bg-white open:bg-[#FAF6EB]/40"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    <h3 className={`text-lg text-gray-900 text-left ${marcellus.className}`}>{item.question}</h3>
                    <span className="text-[#c89e3a] text-xl shrink-0 group-open:rotate-45 transition-transform" aria-hidden="true">
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
      </section>
    </main>
  );
}
