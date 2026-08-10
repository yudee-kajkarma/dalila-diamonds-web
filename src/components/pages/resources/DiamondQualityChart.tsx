"use client";

import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { getQualityChartData, type QualityChartPageData } from "@/lib/i18n/getQualityChartData";
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

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p) => (
        <p key={p.slice(0, 48)} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
          {p}
        </p>
      ))}
    </>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={`space-y-2 mb-6 ${jost.className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-gray-700 text-base md:text-lg">
          <span className="text-[#c89e3a] font-bold" aria-hidden="true">
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ContentImage({
  src,
  alt,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <div className="relative w-full overflow-hidden bg-slate-100 border border-slate-200 shadow-lg mb-8 aspect-[14/10]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        priority={priority}
        loading={priority ? undefined : "lazy"}
      />
    </div>
  );
}

function buildStructuredData(data: QualityChartPageData, locale: Locale) {
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

export default function DiamondQualityChart({ locale = "en" }: { locale?: Locale }) {
  const data = getQualityChartData(locale);

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

      <section className="bg-white py-10 md:py-14" aria-labelledby="dqc-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h1
            id="dqc-hero-heading"
            className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-6 tracking-tight ${marcellus.className}`}
          >
            {data.hero.title}
          </h1>

          <ContentImage
            src={data.hero.image.src}
            alt={data.hero.image.alt}
            width={data.hero.image.width}
            height={data.hero.image.height}
            priority
          />

          <Paragraphs items={data.hero.paragraphs} />

          <p
            className={`inline-flex items-center rounded-full border border-[#c89e3a]/40 bg-[#FAF6EB] px-4 py-2 text-sm text-gray-800 mb-8 ${jost.className}`}
          >
            <span className="font-medium">{data.hero.reviewDateLabel}</span>
            <span className="ml-2">{data.hero.reviewDate}</span>
          </p>

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
              <ResourceSidebar currentPage="diamond-quality-chart" />
            </div>
          </aside>

          <article className="flex-1 w-full min-w-0">
            <nav className="mb-12">
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

            <section id={data.quickAnswer.id} className="scroll-mt-28 mb-12 bg-[#FAF6EB] border border-[#c89e3a]/20 p-6 md:p-8">
              <SectionHeading id={data.quickAnswer.id} title={data.quickAnswer.title} />
              <Paragraphs items={data.quickAnswer.intro} />
              <BulletList items={data.quickAnswer.bullets} />
              <Paragraphs items={data.quickAnswer.closing} />
            </section>

            <section id={data.completeChart.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.completeChart.id} title={data.completeChart.title} />
              <DataTable table={data.completeChart.table} />
              <Paragraphs items={data.completeChart.closing} />
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <Link
                  href={localizedPath(data.download.href, locale)}
                  className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
                >
                  {data.download.buttonText}
                </Link>
              </div>
              <p className={`text-gray-600 text-sm md:text-base ${jost.className}`}>{data.download.printNote}</p>
              <div className="mt-8">
                <ContentImage
                  src={data.images.colourClarity.src}
                  alt={data.images.colourClarity.alt}
                  width={data.images.colourClarity.width}
                  height={data.images.colourClarity.height}
                />
              </div>
            </section>

            <section id={data.overallGrade.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.overallGrade.id} title={data.overallGrade.title} />
              <Paragraphs items={data.overallGrade.paragraphs} />
              <BulletList items={data.overallGrade.bullets} />
              <Paragraphs items={data.overallGrade.mid} />
              <BulletList items={data.overallGrade.exampleBullets} />
              <Paragraphs items={data.overallGrade.closing} />
            </section>

            <section id={data.cutChart.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.cutChart.id} title={data.cutChart.title} />
              <Paragraphs items={data.cutChart.intro} />
              <DataTable table={data.cutChart.table} />
              <Paragraphs items={data.cutChart.afterTable} />
              <BulletList items={data.cutChart.fancyBullets} />
              <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>
                {data.cutChart.cutVsShapeTitle}
              </h3>
              <Paragraphs items={data.cutChart.cutVsShapeParagraphs} />
              <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>
                {data.cutChart.tripleExcellentTitle}
              </h3>
              <Paragraphs items={data.cutChart.tripleExcellentIntro} />
              <BulletList items={data.cutChart.tripleExcellentBullets} />
              <Paragraphs items={data.cutChart.tripleExcellentClosing} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>
                Read more in Dalila’s guide to{" "}
                <Link href={localizedPath(data.cutChart.cutGuideHref, locale)} className="text-[#c89e3a] hover:underline font-medium">
                  {data.cutChart.cutGuideText}
                </Link>
                .
              </p>
              <ContentImage
                src={data.images.cutPerformance.src}
                alt={data.images.cutPerformance.alt}
                width={data.images.cutPerformance.width}
                height={data.images.cutPerformance.height}
              />
            </section>

            <section id={data.colourChart.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.colourChart.id} title={data.colourChart.title} />
              <Paragraphs items={data.colourChart.intro} />
              <DataTable table={data.colourChart.table} />
              <Paragraphs items={data.colourChart.afterTable} />
              <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>
                {data.colourChart.whyDTitle}
              </h3>
              <Paragraphs items={data.colourChart.whyDParagraphs} />
              <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>
                {data.colourChart.bestColourTitle}
              </h3>
              <Paragraphs items={data.colourChart.bestColourParagraphs} />
              <BulletList items={data.colourChart.bestColourBullets} />
              <Paragraphs items={data.colourChart.bestColourClosing} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                For a deeper colour guide, read{" "}
                <Link href={localizedPath(data.colourChart.colourGuideHref, locale)} className="text-[#c89e3a] hover:underline font-medium">
                  {data.colourChart.colourGuideText}
                </Link>
                .
              </p>
            </section>

            <section id={data.clarityChart.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.clarityChart.id} title={data.clarityChart.title} />
              <Paragraphs items={data.clarityChart.intro} />
              <DataTable table={data.clarityChart.table} />
              <Paragraphs items={data.clarityChart.afterTable} />
              <BulletList items={data.clarityChart.factors} />
              <Paragraphs items={data.clarityChart.closing} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                For a deeper clarity guide, read{" "}
                <Link href={localizedPath(data.clarityChart.clarityGuideHref, locale)} className="text-[#c89e3a] hover:underline font-medium">
                  {data.clarityChart.clarityGuideText}
                </Link>
                .
              </p>
            </section>

            <section id={data.vs1Vs2.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.vs1Vs2.id} title={data.vs1Vs2.title} />
              <Paragraphs items={data.vs1Vs2.intro} />
              <DataTable table={data.vs1Vs2.table} />
              <Paragraphs items={data.vs1Vs2.closing} />
            </section>

            <section id={data.eyeClean.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.eyeClean.id} title={data.eyeClean.title} />
              <Paragraphs items={data.eyeClean.paragraphs} />
              <BulletList items={data.eyeClean.bullets} />
              <Paragraphs items={data.eyeClean.askIntro} />
              <BulletList items={data.eyeClean.questions} />
              <Paragraphs items={data.eyeClean.closing} />
            </section>

            <section id={data.caratChart.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.caratChart.id} title={data.caratChart.title} />
              <Paragraphs items={data.caratChart.intro} />
              <DataTable table={data.caratChart.table} />
              <Paragraphs items={data.caratChart.afterTable} />
              <BulletList items={data.caratChart.differenceBullets} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                Use Dalila’s{" "}
                <Link href={localizedPath(data.caratChart.sizeChartHref, locale)} className="text-[#c89e3a] hover:underline font-medium">
                  {data.caratChart.sizeChartText}
                </Link>{" "}
                to compare carat weight with approximate millimetre dimensions.
              </p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                For carat thresholds and pricing context, read the{" "}
                <Link href={localizedPath(data.caratChart.caratGuideHref, locale)} className="text-[#c89e3a] hover:underline font-medium">
                  {data.caratChart.caratGuideText}
                </Link>
                .
              </p>
            </section>

            <section id={data.price4cs.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.price4cs.id} title={data.price4cs.title} />
              <Paragraphs items={data.price4cs.intro} />
              <BulletList items={data.price4cs.equalBullets} />
              <Paragraphs items={data.price4cs.mid} />
              <BulletList items={data.price4cs.influences} />
              <Paragraphs items={data.price4cs.closing} />
            </section>

            <ContentImage
              src={data.images.priorities.src}
              alt={data.images.priorities.alt}
              width={data.images.priorities.width}
              height={data.images.priorities.height}
            />

            <section id={data.practicalCombinations.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.practicalCombinations.id} title={data.practicalCombinations.title} />
              <Paragraphs items={data.practicalCombinations.intro} />
              <DataTable table={data.practicalCombinations.table} />
              <Paragraphs items={data.practicalCombinations.closing} />
            </section>

            <section id={data.threeDiamonds.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.threeDiamonds.id} title={data.threeDiamonds.title} />
              <Paragraphs items={data.threeDiamonds.intro} />
              <DataTable table={data.threeDiamonds.table} />
              <Paragraphs items={data.threeDiamonds.closing} />
            </section>

            <section id={data.polishSymmetry.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.polishSymmetry.id} title={data.polishSymmetry.title} />
              <Paragraphs items={data.polishSymmetry.paragraphs} />
              <BulletList items={data.polishSymmetry.bullets} />
              <Paragraphs items={data.polishSymmetry.closing} />
            </section>

            <section id={data.fluorescence.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.fluorescence.id} title={data.fluorescence.title} />
              <Paragraphs items={data.fluorescence.intro} />
              <BulletList items={data.fluorescence.strengths} />
              <Paragraphs items={data.fluorescence.mid} />
              <BulletList items={data.fluorescence.factors} />
              <Paragraphs items={data.fluorescence.closing} />
            </section>

            <section id={data.beyond4cs.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.beyond4cs.id} title={data.beyond4cs.title} />
              <Paragraphs items={data.beyond4cs.intro} />
              {data.beyond4cs.subsections.map((sub) => (
                <div key={sub.title} className="mb-8">
                  <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{sub.title}</h3>
                  <Paragraphs items={sub.paragraphs} />
                </div>
              ))}
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                For a comparison of recognised laboratories, read{" "}
                <Link href={localizedPath(data.beyond4cs.labCompareHref, locale)} className="text-[#c89e3a] hover:underline font-medium">
                  {data.beyond4cs.labCompareText}
                </Link>
                .
              </p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                See also Dalila’s guide to{" "}
                <Link href={localizedPath(data.beyond4cs.advancedHref, locale)} className="text-[#c89e3a] hover:underline font-medium">
                  {data.beyond4cs.advancedText}
                </Link>
                .
              </p>
            </section>

            <section id={data.goodQuality.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.goodQuality.id} title={data.goodQuality.title} />
              <Paragraphs items={data.goodQuality.intro} />
              <BulletList items={data.goodQuality.bullets} />
              <Paragraphs items={data.goodQuality.closing} />
            </section>

            <section id={data.readReport.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.readReport.id} title={data.readReport.title} />
              <Paragraphs items={data.readReport.intro} />
              <BulletList items={data.readReport.bullets} />
              <Paragraphs items={data.readReport.closing} />
            </section>

            <section id={data.checklist.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.checklist.id} title={data.checklist.title} />
              <Paragraphs items={data.checklist.intro} />
              <BulletList items={data.checklist.items} />
            </section>
          </article>
        </div>
      </div>

      <section id={data.cta.id} className="scroll-mt-28 bg-[#0B1A33] py-12 md:py-16 text-white">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className={`text-3xl md:text-4xl mb-6 ${marcellus.className}`}>{data.cta.title}</h2>
          {data.cta.intro.map((p) => (
            <p key={p.slice(0, 40)} className={`text-white/80 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
              {p}
            </p>
          ))}
          <ul className={`space-y-2 mb-6 ${jost.className}`}>
            {data.cta.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/80 text-base md:text-lg">
                <span className="text-[#e4c75f] font-bold" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {data.cta.closing.map((p) => (
            <p key={p.slice(0, 40)} className={`text-white/80 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>
              {p}
            </p>
          ))}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <Link
              href={localizedPath(data.cta.primaryButtonHref, locale)}
              className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
            >
              {data.cta.primaryButtonText}
            </Link>
            <Link
              href={localizedPath(data.cta.secondaryButtonHref, locale)}
              className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#e4c75f] hover:bg-white/5 font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
            >
              {data.cta.secondaryButtonText}
            </Link>
          </div>
          <p className={`text-white/50 text-sm mb-4 ${jost.className}`}>{data.cta.notice}</p>
          <p className={`text-white/70 text-sm ${jost.className}`}>
            Related:{" "}
            <Link href={localizedPath(data.cta.relatedHref, locale)} className="text-[#e4c75f] underline hover:text-white">
              {data.cta.relatedText}
            </Link>
          </p>
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
      </section>
    </main>
  );
}
