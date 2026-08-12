"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { getQualityChartData, type QualityChartPageData } from "@/lib/i18n/getQualityChartData";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";
import { s3Asset } from "@/lib/s3Assets";

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

function localizedPath(path: string, locale: Locale) {
  if (path.startsWith("http")) return path;
  return getLocalizedPath(path, locale);
}

function DataTable({ table }: { table: TableData }) {
  if (!table || table.headers.length === 0) return null;
  return (
    <div className="overflow-x-auto mb-6">
      <table className={`min-w-full border border-gray-200 text-left text-sm md:text-base ${jost.className}`}>
        {table.caption ? <caption className="sr-only">{table.caption}</caption> : null}
        <thead className="bg-slate-50">
          <tr>
            {table.headers.map((header) => (
              <th key={header} scope="col" className="border border-gray-200 px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} className="even:bg-gray-50/60">
              {row.map((cell, ci) => (
                <td key={ci} className="border border-gray-200 px-4 py-3 text-gray-700 align-top">
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

function SectionHeading({ id, title, level = 2 }: { id?: string; title: string; level?: 2 | 3 }) {
  const cls = level === 3
    ? `text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 leading-tight ${marcellus.className}`
    : `text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`;
  const Tag = level === 3 ? "h3" : "h2";
  return (
    <>
      <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
      <Tag id={id ? `${id}-heading` : undefined} className={cls}>{title}</Tag>
    </>
  );
}

function SubHeading({ children }: { children: string }) {
  return (
    <h3 className={`text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 mt-6 leading-tight ${marcellus.className}`}>
      {children}
    </h3>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;
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
  if (!items || items.length === 0) return null;
  return (
    <ul className={`space-y-3 mb-6 ${jost.className}`}>
      {items.map((item) => (
        <li key={item.slice(0, 48)} className="flex items-start gap-3 text-gray-700 text-base md:text-lg leading-relaxed">
          <span className="text-[#c89e3a] mt-1 font-bold text-xl shrink-0">•</span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function RichParagraph({ segments, locale }: { segments: RichSegment[]; locale: Locale }) {
  return (
    <p className={`text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.value}</span>;
        if (seg.external) {
          return <a key={i} href={seg.href} target="_blank" rel="noopener noreferrer" className="text-[#c89e3a] hover:underline font-medium">{seg.text}</a>;
        }
        return <Link key={i} href={localizedPath(seg.href, locale)} className="text-[#c89e3a] hover:underline font-medium">{seg.text}</Link>;
      })}
    </p>
  );
}

function Section({ id, title, children, className = "" }: { id?: string; title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`mb-12 ${className}`}>
      <AnimatedContainer direction="up">
        <section id={id} className="scroll-mt-28">
          <SectionHeading id={id} title={title} />
          {children}
        </section>
      </AnimatedContainer>
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${data.meta.canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: data.banner.breadcrumbHome, item: homeUrl },
          { "@type": "ListItem", position: 2, name: data.banner.breadcrumbResources, item: "https://www.daliladiamonds.com/resources" },
          { "@type": "ListItem", position: 3, name: data.banner.breadcrumbCurrent, item: data.meta.canonical },
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
    <main className={`${marcellus.variable} ${jost.variable} bg-white min-h-screen`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData(data, locale)) }} />

      {/* Banner */}
      <div className="relative bg-slate-900">
        <section className="relative min-h-[280px] xs:min-h-[300px] sm:min-h-[360px] md:min-h-[340px] lg:min-h-[320px] flex items-center justify-center overflow-hidden" aria-label="Page banner">
          <div className="absolute inset-0">
            <Image src={s3Asset("/images/banner-dalila-contact.png")} alt={data.banner.imageAlt} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
          </div>
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 relative z-10 text-center pt-24 sm:pt-28 pb-8 sm:pb-14">
            <AnimatedContainer direction="right">
              <p className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white mb-3 sm:mt-30 whitespace-nowrap sm:whitespace-normal ${marcellus.className}`} style={{ lineHeight: 1.15 }}>
                {data.banner.title}
              </p>
              <div className="w-2/3 sm:w-[35%] h-px bg-amber-400 mx-auto mb-6" aria-hidden="true" />
            </AnimatedContainer>
            <nav aria-label="Breadcrumb" className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 text-gray-300 text-xs xs:text-sm md:text-base">
              <Link href={localizedPath("/", locale)} className={`hover:text-amber-400 transition-colors ${jost.className}`}>{data.banner.breadcrumbHome}</Link>
              <span aria-hidden="true">›</span>
              <Link href={localizedPath("/resources", locale)} className={`hover:text-amber-400 transition-colors ${jost.className}`}>{data.banner.breadcrumbResources}</Link>
              <span aria-hidden="true">›</span>
              <span className={jost.className}>{data.banner.breadcrumbCurrent}</span>
            </nav>
          </div>
        </section>
      </div>

      {/* Hero — H1 + subheading only, full width */}
      <section className="bg-white py-10 md:py-12" aria-labelledby="dqc-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <h1 id="dqc-hero-heading" className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-3 tracking-tight leading-tight ${marcellus.className}`}>
              {data.hero.title}
            </h1>
            <p className={`text-lg md:text-xl text-gray-600 leading-relaxed ${jost.className}`}>{data.hero.subheading}</p>
          </AnimatedContainer>
        </div>
      </section>

      {/* Main grid — sidebar + article */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
          <aside className="sticky-sidebar order-2 lg:order-1">
            <ResourceSidebar currentPage="diamond-quality-chart" />
          </aside>

          <article className="order-1 lg:order-2 w-full min-w-0">

            {/* Intro paragraphs */}
            <div className="mb-10">
              <AnimatedContainer direction="up">
                <Paragraphs items={data.hero.introParagraphs} />
                {/* <p className={`inline-flex items-center rounded-full border border-[#c89e3a]/40 bg-[#FAF6EB] px-4 py-2 text-sm text-gray-800 mt-2 ${jost.className}`}>
                  <span className="font-medium">{data.hero.reviewDateLabel}</span>
                  <span className="ml-2">{data.hero.reviewDate}</span>
                </p> */}
              </AnimatedContainer>
            </div>

            {/* Quick Answer */}
            <div id={data.quickAnswer.id} className="scroll-mt-28 mb-10 bg-[#FAF6EB] border border-[#c89e3a]/20 p-6 md:p-8">
              <AnimatedContainer direction="up">
                <SectionHeading id={data.quickAnswer.id} title={data.quickAnswer.title} />
                <Paragraphs items={data.quickAnswer.introParagraphs} />
                <BulletList items={data.quickAnswer.attributes} />
                <Paragraphs items={data.quickAnswer.closingParagraphs} />
              </AnimatedContainer>
            </div>

            {/* Key Takeaways */}
            <Section id="key-takeaways" title={data.keyTakeaways.title}>
              <BulletList items={data.keyTakeaways.items} />
            </Section>

            {/* Guide Overview nav */}
            <div className="mb-12">
              <AnimatedContainer direction="up">
                <nav className="scroll-mt-28" aria-labelledby="dqc-overview-nav">
                  <SectionHeading id="dqc-overview-nav" title={data.overviewNav.title} />
                  <ol className={`space-y-4 list-decimal list-inside ${jost.className}`}>
                    {data.overviewNav.items.map((item: any) => (
                      <li key={item.id} className="text-gray-700 text-base md:text-lg leading-relaxed pl-2">
                        <a href={`#${item.id}`} className="text-[#1a1a1a] hover:text-[#c89e3a] underline-offset-2 hover:underline">{item.label}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </AnimatedContainer>
            </div>

            {/* Diamond Quality at a Glance */}
            <Section id={data.atAGlance.id} title={data.atAGlance.title}>
              <DataTable table={data.atAGlance.table} />
              <Paragraphs items={data.atAGlance.closing} />
            </Section>

            {/* How the 4Cs Work Together */}
            <Section id={data.howFourCsWork.id} title={data.howFourCsWork.title}>
              <Paragraphs items={data.howFourCsWork.paragraphs} />
              <BulletList items={data.howFourCsWork.bullets} />
              <Paragraphs items={data.howFourCsWork.closing} />
            </Section>

            {/* Diamond Cut Quality Chart */}
            <Section id={data.cutChart.id} title={data.cutChart.title}>
              <Paragraphs items={data.cutChart.introParagraphs} />
              <SubHeading>{data.cutChart.roundGradeChart.title}</SubHeading>
              <DataTable table={data.cutChart.roundGradeChart.table} />
              <p className={`text-gray-600 text-sm md:text-base italic mb-6 ${jost.className}`}>{data.cutChart.roundGradeChart.note}</p>
              <SubHeading>{data.cutChart.whatContributesTitle}</SubHeading>
              <Paragraphs items={data.cutChart.whatContributesParagraphs} />
              <BulletList items={data.cutChart.whatContributesBullets} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.cutChart.singleNumberNote}</p>
              <SubHeading>{data.cutChart.excellentMeansPerfectTitle}</SubHeading>
              <Paragraphs items={data.cutChart.excellentMeansPerfectParagraphs} />
              <BulletList items={data.cutChart.excellentMeansPerfectBullets} />
              <SubHeading>{data.cutChart.polishSymmetryChartTitle}</SubHeading>
              <DataTable table={data.cutChart.polishSymmetryTable} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.cutChart.polishSymmetryNote}</p>
            </Section>

            {/* Diamond Colour Chart */}
            <Section id={data.colourChart.id} title={data.colourChart.title}>
              <Paragraphs items={data.colourChart.introParagraphs} />
              <SubHeading>{data.colourChart.scaleTitle}</SubHeading>
              <DataTable table={data.colourChart.table} />
              <Paragraphs items={data.colourChart.afterTable} />
              <SubHeading>{data.colourChart.perceivedColourTitle}</SubHeading>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.colourChart.perceivedColourIntro}</p>
              <BulletList items={data.colourChart.perceivedColourBullets} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.colourChart.perceivedColourNote}</p>
              <SubHeading>{data.colourChart.higherAlwaysBetterTitle}</SubHeading>
              <Paragraphs items={data.colourChart.higherAlwaysBetterParagraphs} />
              <SubHeading>{data.colourChart.fancyColourTitle}</SubHeading>
              <Paragraphs items={data.colourChart.fancyColourParagraphs} />
              <BulletList items={data.colourChart.fancyColourBullets} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.colourChart.fancyColourNote}</p>
            </Section>

            {/* Diamond Clarity Chart */}
            <Section id={data.clarityChart.id} title={data.clarityChart.title}>
              <Paragraphs items={data.clarityChart.introParagraphs} />
              <SubHeading>{data.clarityChart.scaleTitle}</SubHeading>
              <DataTable table={data.clarityChart.table} />
              <Paragraphs items={data.clarityChart.afterTable} />
              <SubHeading>{data.clarityChart.whatDeterminesTitle}</SubHeading>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.clarityChart.whatDeterminesParagraph}</p>
              <BulletList items={data.clarityChart.whatDeterminesBullets} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.clarityChart.whatDeterminesNote}</p>
              <SubHeading>{data.clarityChart.eyeCleanTitle}</SubHeading>
              <Paragraphs items={data.clarityChart.eyeCleanParagraphs} />
              <BulletList items={data.clarityChart.eyeCleanBullets} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.clarityChart.eyeCleanNote}</p>
              <SubHeading>{data.clarityChart.closerExamTitle}</SubHeading>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.clarityChart.closerExamIntro}</p>
              <BulletList items={data.clarityChart.closerExamBullets} />
              <Paragraphs items={data.clarityChart.closing} />
            </Section>

            {/* Diamond Carat Weight Chart */}
            <Section id={data.caratChart.id} title={data.caratChart.title}>
              <Paragraphs items={data.caratChart.introParagraphs} />
              <SubHeading>{data.caratChart.conversionTitle}</SubHeading>
              <DataTable table={data.caratChart.table} />
              <p className={`text-gray-600 text-sm md:text-base italic mb-6 ${jost.className}`}>{data.caratChart.conversionNote}</p>
              <SubHeading>{data.caratChart.whyDifferentTitle}</SubHeading>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.caratChart.whyDifferentIntro}</p>
              <BulletList items={data.caratChart.whyDifferentBullets} />
              {data.caratChart.whyDifferentNote.split("\n").map((line: string, i: number) => (
                <p key={i} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{line}</p>
              ))}
              <SubHeading>{data.caratChart.thresholdsTitle}</SubHeading>
              <Paragraphs items={data.caratChart.thresholdsParagraphs} />
            </Section>

            {/* Diamond Quality for Fancy Shapes */}
            <Section id={data.fancyShapes.id} title={data.fancyShapes.title}>
              <Paragraphs items={data.fancyShapes.introParagraphs} />
              <SubHeading>{data.fancyShapes.checksTitle}</SubHeading>
              <DataTable table={data.fancyShapes.checksTable} />
              <Paragraphs items={data.fancyShapes.closing} />
            </Section>

            {/* Diamond Quality Beyond the 4Cs */}
            <Section id={data.beyond4cs.id} title={data.beyond4cs.title}>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.beyond4cs.introParagraph}</p>
              {data.beyond4cs.subsections.map((sub: any) => (
                <div key={sub.title} className="mb-8">
                  <SubHeading>{sub.title}</SubHeading>
                  <Paragraphs items={sub.paragraphs} />
                  {"bullets" in sub && sub.bullets && sub.bullets.length > 0 ? <BulletList items={sub.bullets as string[]} /> : null}
                </div>
              ))}
            </Section>

            {/* How to Choose the Right Quality Balance */}
            <Section id={data.qualityBalance.id} title={data.qualityBalance.title}>
              {data.qualityBalance.steps.map((step: any) => (
                <div key={step.title} className="mb-8">
                  <SubHeading>{step.title}</SubHeading>
                  <Paragraphs items={step.paragraphs} />
                  {"bullets" in step && step.bullets && step.bullets.length > 0 ? <BulletList items={step.bullets as string[]} /> : null}
                  {"note" in step && step.note ? (
                    <p className={`text-gray-600 text-sm md:text-base italic mb-4 ${jost.className}`}>{step.note as string}</p>
                  ) : null}
                </div>
              ))}
            </Section>

            {/* Worked Diamond Quality Comparison */}
            <Section id={data.workedComparison.id} title={data.workedComparison.title}>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.workedComparison.introParagraph}</p>
              <DataTable table={data.workedComparison.table} />
              <SubHeading>{data.workedComparison.chartShowsTitle}</SubHeading>
              <Paragraphs items={data.workedComparison.chartShowsParagraphs} />
              <BulletList items={data.workedComparison.chartShowsBullets} />
              <Paragraphs items={data.workedComparison.closing} />
            </Section>

            {/* Diamond Quality, Rarity, Price and Value */}
            <Section id={data.rarityPriceValue.id} title={data.rarityPriceValue.title}>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.rarityPriceValue.introParagraph}</p>
              <SubHeading>{data.rarityPriceValue.qualityTitle}</SubHeading>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.rarityPriceValue.qualityParagraph}</p>
              <SubHeading>{data.rarityPriceValue.rarityTitle}</SubHeading>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.rarityPriceValue.rarityParagraph}</p>
              <SubHeading>{data.rarityPriceValue.priceTitle}</SubHeading>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.rarityPriceValue.priceParagraph}</p>
              <BulletList items={data.rarityPriceValue.priceBullets} />
              <SubHeading>{data.rarityPriceValue.valueTitle}</SubHeading>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.rarityPriceValue.valueParagraph}</p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.rarityPriceValue.valueNote}</p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>{data.rarityPriceValue.reportNote}</p>
              <SubHeading>{data.rarityPriceValue.highestGradeTitle}</SubHeading>
              <Paragraphs items={data.rarityPriceValue.highestGradeParagraphs} />
              <BulletList items={data.rarityPriceValue.highestGradeBullets} />
            </Section>

            {/* Natural Diamond Quality Checklist */}
            <Section id={data.checklist.id} title={data.checklist.title}>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{data.checklist.introLead}</p>
              <BulletList items={data.checklist.items} />
            </Section>

          </article>
        </div>
      </div>

      {/* CTA — Already Comparing Natural Diamonds? */}
      <section id={data.cta.id} className="scroll-mt-28 bg-slate-900 text-white py-12 md:py-16" aria-labelledby="dqc-cta-heading">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full mx-auto" />
            <h2 id="dqc-cta-heading" className={`text-3xl md:text-4xl font-bold mb-6 ${marcellus.className}`}>{data.cta.title}</h2>
            <div className={`text-gray-200 max-w-3xl mx-auto`}>
              {(data.cta.richParagraphs as RichSegment[][]).map((segs, i) => (
                <RichParagraph key={i} segments={segs} locale={locale} />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href={localizedPath(data.cta.primaryButtonHref, locale)}
                className={`inline-flex items-center justify-center bg-[#c89e3a] px-6 py-3 text-white font-medium hover:bg-[#b8902f] transition-colors ${jost.className}`}
              >
                {data.cta.primaryButtonText}
              </Link>
              <Link
                href={localizedPath(data.cta.secondaryButtonHref, locale)}
                className={`inline-flex items-center justify-center border border-white/30 px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors ${jost.className}`}
              >
                {data.cta.secondaryButtonText}
              </Link>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 md:py-16" aria-labelledby="dqc-faq-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
            <h2 id="dqc-faq-heading" className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1a1a1a] mb-8 tracking-tight ${marcellus.className}`}>
              {data.faqs.title}
            </h2>
            <div className="border border-gray-200 divide-y divide-gray-200">
              {data.faqs.items.map((item: any, index: number) => (
                <details key={item.question} className="group bg-white open:bg-[#FAF6EB]/40 w-full" open={index === 0}>
                  <summary className="cursor-pointer list-none px-5 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c89e3a] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      <h3 className={`text-lg text-gray-900 text-left ${marcellus.className}`}>{item.question}</h3>
                      <span className="text-[#c89e3a] text-xl shrink-0 group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
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
      <section id={data.finalTakeaway.id} className="scroll-mt-28 bg-[#FAF6EB] py-12 md:py-16 border-t border-[#c89e3a]/20" aria-labelledby="dqc-final-takeaway-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedContainer direction="up">
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
            <h2 id="dqc-final-takeaway-heading" className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 ${marcellus.className}`}>
              {data.finalTakeaway.title}
            </h2>
            <Paragraphs items={data.finalTakeaway.paragraphs} />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
              <Link
                href={localizedPath(data.finalTakeaway.primaryButtonHref, locale)}
                className={`inline-flex items-center justify-center bg-[#c89e3a] px-6 py-3 text-white font-medium hover:bg-[#b8902f] transition-colors ${jost.className}`}
              >
                {data.finalTakeaway.primaryButtonText}
              </Link>
              <Link
                href={localizedPath(data.finalTakeaway.secondaryButtonHref, locale)}
                className={`inline-flex items-center justify-center border border-gray-300 px-6 py-3 text-gray-900 font-medium hover:bg-white transition-colors ${jost.className}`}
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




