"use client";

import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import { getNaturalVsLabGrownData, type NaturalVsLabGrownPageData } from "@/lib/i18n/getNaturalVsLabGrownData";
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

function buildStructuredData(data: NaturalVsLabGrownPageData, locale: Locale) {
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

export default function NaturalVsLabGrownDiamonds({ locale = "en" }: { locale?: Locale }) {
  const data = getNaturalVsLabGrownData(locale);

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

      <section className="bg-white py-10 md:py-14" aria-labelledby="nvlg-hero-heading">
        <div className="container mx-auto max-w-7xl px-4">
          <h1
            id="nvlg-hero-heading"
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
              <ResourceSidebar currentPage="natural-vs-lab-grown-diamonds" />
            </div>
          </aside>

          <article className="flex-1 w-full min-w-0">
            <nav className="mb-12" aria-labelledby="nvlg-overview">
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
              <Paragraphs items={data.quickAnswer.paragraphs} />
            </section>

            <section id={data.atAGlance.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.atAGlance.id} title={data.atAGlance.title} />
              <DataTable table={data.atAGlance.table} />
              <Paragraphs items={data.atAGlance.closing} />
            </section>

            <section id={data.whatIsNatural.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.whatIsNatural.id} title={data.whatIsNatural.title} />
              <Paragraphs items={data.whatIsNatural.paragraphs} />
              <BulletList items={data.whatIsNatural.bullets} />
              <Paragraphs items={data.whatIsNatural.closing} />
            </section>

            <section id={data.whatIsLabGrown.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.whatIsLabGrown.id} title={data.whatIsLabGrown.title} />
              <Paragraphs items={data.whatIsLabGrown.intro} />
              {data.whatIsLabGrown.subsections.map((sub) => (
                <div key={sub.title} className="mb-8">
                  <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{sub.title}</h3>
                  <Paragraphs items={sub.paragraphs} />
                </div>
              ))}
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 ${jost.className}`}>
                The{" "}
                <a
                  href={data.whatIsLabGrown.giaGrowthUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c89e3a] hover:underline font-medium"
                >
                  GIA explanation of HPHT and CVD growth
                </a>{" "}
                provides further technical information about these production methods.
              </p>
              <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg">
                <Image
                  src={data.images.formation.src}
                  alt={data.images.formation.alt}
                  width={data.images.formation.width}
                  height={data.images.formation.height}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </section>

            <section id={data.areReal.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.areReal.id} title={data.areReal.title} />
              <Paragraphs items={data.areReal.paragraphs} />
              <BulletList items={data.areReal.bullets} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                {data.areReal.closing[0]}
              </p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                The{" "}
                <a
                  href={data.areReal.cibjoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c89e3a] hover:underline font-medium"
                >
                  CIBJO diamond nomenclature guidance
                </a>{" "}
                requires clear terminology that distinguishes laboratory-grown diamonds from natural diamonds.
              </p>
            </section>

            <section id={data.lookTheSame.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.lookTheSame.id} title={data.lookTheSame.title} />
              <Paragraphs items={data.lookTheSame.paragraphs} />
              <BulletList items={data.lookTheSame.bullets} />
              <Paragraphs items={data.lookTheSame.closing} />
            </section>

            <section id={data.tellApart.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.tellApart.id} title={data.tellApart.title} />
              <Paragraphs items={data.tellApart.paragraphs} />
              <BulletList items={data.tellApart.bullets} />
              <Paragraphs items={data.tellApart.closing} />
              <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mt-6">
                <Image
                  src={data.images.identification.src}
                  alt={data.images.identification.alt}
                  width={data.images.identification.width}
                  height={data.images.identification.height}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </section>

            <section id={data.gradingReports.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.gradingReports.id} title={data.gradingReports.title} />
              <Paragraphs items={data.gradingReports.paragraphs} />
              <BulletList items={data.gradingReports.bullets} />
              <Paragraphs items={data.gradingReports.closing} />
            </section>

            <section id={data.price.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.price.id} title={data.price.title} />
              <Paragraphs items={data.price.paragraphs} />
              <BulletList items={data.price.budgetBullets} />
              <Paragraphs items={data.price.mid} />
              <BulletList items={data.price.naturalFactors} />
              <Paragraphs items={data.price.closing} />
            </section>

            <section id={data.priceChange.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.priceChange.id} title={data.priceChange.title} />
              <Paragraphs items={data.priceChange.intro} />
              {data.priceChange.subsections.map((sub) => (
                <div key={sub.title} className="mb-8">
                  <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>{sub.title}</h3>
                  <Paragraphs items={sub.intro} />
                  <BulletList items={sub.bullets} />
                  <Paragraphs items={sub.closing} />
                </div>
              ))}
            </section>

            <section id={data.resale.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.resale.id} title={data.resale.title} />
              <Paragraphs items={data.resale.paragraphs} />
              <BulletList items={data.resale.retailBullets} />
              <Paragraphs items={data.resale.mid} />
              <BulletList items={data.resale.questions} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                Dalila’s guide to{" "}
                <Link
                  href={localizedPath(data.resale.valueRetentionHref, locale)}
                  className="text-[#c89e3a] hover:underline font-medium"
                >
                  {data.resale.valueRetentionText}
                </Link>{" "}
                explains why resale value and investment profit are not the same thing.
              </p>
            </section>

            <section id={data.rarity.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.rarity.id} title={data.rarity.title} />
              <Paragraphs items={data.rarity.paragraphs} />
              <BulletList items={data.rarity.bullets} />
              <Paragraphs items={data.rarity.closing} />
            </section>

            <section id={data.sustainability.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.sustainability.id} title={data.sustainability.title} />
              <Paragraphs items={data.sustainability.paragraphs} />
              <BulletList items={data.sustainability.bullets} />
              <Paragraphs items={data.sustainability.closing} />
            </section>

            <section id={data.ethics.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.ethics.id} title={data.ethics.title} />
              <Paragraphs items={data.ethics.paragraphs} />
              <BulletList items={data.ethics.bullets} />
              <Paragraphs items={data.ethics.closing} />
            </section>

            <section id={data.traceability.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.traceability.id} title={data.traceability.title} />
              <Paragraphs items={data.traceability.paragraphs} />
              <BulletList items={data.traceability.bullets} />
              <Paragraphs items={data.traceability.closing} />
            </section>

            <section id={data.engagementRing.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.engagementRing.id} title={data.engagementRing.title} />
              <Paragraphs items={data.engagementRing.intro} />
              <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>
                {data.engagementRing.naturalTitle}
              </h3>
              <BulletList items={data.engagementRing.naturalBullets} />
              <h3 className={`text-2xl md:text-3xl text-[#1a1a1a] mb-4 ${marcellus.className}`}>
                {data.engagementRing.labTitle}
              </h3>
              <BulletList items={data.engagementRing.labBullets} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
                {data.engagementRing.closing[0]}
              </p>
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                For ring-specific considerations, read Dalila’s{" "}
                <Link
                  href={localizedPath(data.engagementRing.engagementGuideHref, locale)}
                  className="text-[#c89e3a] hover:underline font-medium"
                >
                  {data.engagementRing.engagementGuideText}
                </Link>
                .
              </p>
            </section>

            <section id={data.simulants.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.simulants.id} title={data.simulants.title} />
              <Paragraphs items={data.simulants.intro} />
              <DataTable table={data.simulants.table} />
              <Paragraphs items={data.simulants.closing} />
            </section>

            <div className="relative w-full aspect-[14/10] overflow-hidden bg-black shadow-lg mb-12">
              <Image
                src={data.images.priorities.src}
                alt={data.images.priorities.alt}
                width={data.images.priorities.width}
                height={data.images.priorities.height}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>

            <section id={data.whichToChoose.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.whichToChoose.id} title={data.whichToChoose.title} />
              <Paragraphs items={data.whichToChoose.intro} />
              <DataTable table={data.whichToChoose.table} />
              <Paragraphs items={data.whichToChoose.closing} />
            </section>

            <section id={data.checklist.id} className="scroll-mt-28 mb-12">
              <SectionHeading id={data.checklist.id} title={data.checklist.title} />
              <Paragraphs items={data.checklist.intro} />
              <BulletList items={data.checklist.items} />
              <p className={`text-gray-700 text-base md:text-lg leading-relaxed ${jost.className}`}>
                You can also use Dalila’s{" "}
                <Link href={localizedPath(data.checklist.sizeChartHref, locale)} className="text-[#c89e3a] hover:underline font-medium">
                  {data.checklist.sizeChartText}
                </Link>{" "}
                to compare carat weight with approximate visible measurements.
              </p>
            </section>
          </article>
        </div>
      </div>

      <section id={data.whyDalila.id} className="scroll-mt-28 bg-[#0B1A33] py-12 md:py-16 text-white">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className={`text-3xl md:text-4xl mb-6 ${marcellus.className}`}>{data.whyDalila.title}</h2>
          {data.whyDalila.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className={`text-white/80 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>
              {p}
            </p>
          ))}
          <ul className={`space-y-2 mb-8 ${jost.className}`}>
            {data.whyDalila.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/80 text-base md:text-lg">
                <span className="text-[#e4c75f] font-bold" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <Link
              href={localizedPath(data.whyDalila.primaryButtonHref, locale)}
              className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
            >
              {data.whyDalila.primaryButtonText}
            </Link>
            <Link
              href={localizedPath(data.whyDalila.secondaryButtonHref, locale)}
              className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#e4c75f] hover:bg-white/5 font-medium px-8 py-3.5 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
            >
              {data.whyDalila.secondaryButtonText}
            </Link>
          </div>
          <p className={`text-white/50 text-sm leading-relaxed ${jost.className}`}>{data.whyDalila.notice}</p>
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
