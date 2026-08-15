"use client";

import Image from "next/image";
import Link from "next/link";
import { marcellus, jost } from "@/lib/fonts";
import { useLanguage } from "@/context/LanguageContext";
import { getMothersDayData } from "@/lib/i18n/getMothersDayData";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";
import ProductsSection from "./ProductsSection";

// ── Date component ──────────────────────────────────────────────────────────
function MothersDayDate({ data }: { data: ReturnType<typeof getMothersDayData> }) {
  const now = new Date();
  const cutoff = new Date(
    data.dateComponent.cutoffYear,
    data.dateComponent.cutoffMonth - 1,
    data.dateComponent.cutoffDay + 1
  );
  const label = now < cutoff
    ? data.dateComponent.current
    : data.dateComponent.next;

  return (
    <div className={`inline-flex items-center gap-2 bg-[#FAF6EB] border border-[#c89e3a]/40 px-4 py-2 text-sm text-gray-800 mb-6 ${jost.className}`}>
      <span className="w-2 h-2 rounded-full bg-[#c89e3a] shrink-0" aria-hidden="true" />
      {label}
    </div>
  );
}

// ── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ title }: { title: string }) {
  return (
    <>
      <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
      <h2 className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}>{title}</h2>
    </>
  );
}

// ── Two-column layout helper ─────────────────────────────────────────────────
function TwoCol({
  imageSlot,
  textSlot,
  imageRight = false,
}: {
  imageSlot: React.ReactNode;
  textSlot: React.ReactNode;
  imageRight?: boolean;
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 ${imageRight ? "" : ""}`}>
      <div className={imageRight ? "order-1 lg:order-2" : "order-1"}>{imageSlot}</div>
      <div className={imageRight ? "order-2 lg:order-1" : "order-2"}>{textSlot}</div>
    </div>
  );
}

function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden shadow-xl bg-gray-100">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function AntwerpMothersDayPage({ locale: localeProp }: { locale?: Locale }) {
  const { locale: ctxLocale } = useLanguage();
  const locale = localeProp ?? ctxLocale;
  const data = getMothersDayData(locale);

  const lp = (path: string) => getLocalizedPath(path, locale);

  const { sections } = data;

  return (
    <main className={`bg-white min-h-screen ${jost.className}`}>

      {/* ── Banner ── */}
      <div className="relative bg-slate-900">
        <section className="relative min-h-[280px] sm:min-h-[340px] flex items-center justify-center overflow-hidden" aria-label="Page banner">
          <div className="absolute inset-0">
            <Image src="/event_pages/page_1/1.png" alt={data.banner.imageAlt} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center pt-32 pb-12">
            <p className={`text-2xl sm:text-4xl lg:text-5xl text-white mb-3 ${marcellus.className}`}>
              {sections.hero.heading}
            </p>
            <div className="w-2/3 sm:w-[35%] h-px bg-amber-400 mx-auto mb-6" aria-hidden="true" />
            <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center justify-center gap-2 text-gray-300 text-sm md:text-base ${jost.className}`}>
              <Link href={lp("/")} className="hover:text-amber-400 transition-colors">{data.banner.breadcrumbHome}</Link>
              <span aria-hidden="true">›</span>
              <span>{data.banner.breadcrumbCurrent}</span>
            </nav>
          </div>
        </section>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">

        {/* ── Section 1 — Hero ── */}
        <TwoCol
          imageRight
          imageSlot={<Img src="/event_pages/page_1/1.png" alt={sections.hero.imageAlt} />}
          textSlot={
            <div>
              <MothersDayDate data={data} />
              <SectionHeading title={sections.hero.heading} />
              {sections.hero.paragraphs.map((p, i) => (
                <p key={i} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{p}</p>
              ))}
              <div className={`mt-2 mb-6 p-4 border-l-4 border-[#c89e3a] bg-[#FAF6EB] text-sm text-gray-800 ${jost.className}`}>
                {sections.hero.urgency}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Link href={lp("/contact")}
                  className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}>
                  {data.primaryCta}
                </Link>
                <Link href={lp("/inventory")}
                  className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#8a7028] hover:bg-[#FAF6EB] font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}>
                  {data.secondaryCta}
                </Link>
              </div>
              <p className={`text-xs text-gray-500 mt-3 ${jost.className}`}>{data.trustMicrocopy}</p>
            </div>
          }
        />

        {/* ── Section 2 — The local tradition ── */}
        <TwoCol
          imageSlot={<Img src="/event_pages/page_1/2.png" alt={sections.tradition.imageAlt} />}
          textSlot={
            <div>
              <SectionHeading title={sections.tradition.heading} />
              {sections.tradition.paragraphs.map((p, i) => (
                <p key={i} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{p}</p>
              ))}
              <a href={sections.tradition.inlineLink.href} target="_blank" rel="noopener noreferrer"
                className={`text-[#c89e3a] hover:underline font-medium text-sm ${jost.className}`}>
                {sections.tradition.inlineLink.text} →
              </a>
            </div>
          }
        />

        {/* ── Section 3 — Why a loose natural diamond ── */}
        <TwoCol
          imageRight
          imageSlot={<Img src="/event_pages/page_1/3.png" alt={sections.whyLoose.imageAlt} />}
          textSlot={
            <div>
              <SectionHeading title={sections.whyLoose.heading} />
              {sections.whyLoose.paragraphs.map((p, i) => (
                <p key={i} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{p}</p>
              ))}
              <Link href={lp("/contact")}
                className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}>
                {data.askGradedCta}
              </Link>
            </div>
          }
        />

        {/* ── Section 4 — Product recommendations ── */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full mx-auto" />
            <h2 className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] ${marcellus.className}`}>{sections.products.heading}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.products.items.map((item, i) => (
              <div key={i} className="relative bg-white border border-gray-200 hover:border-[#c89e3a]/60 hover:shadow-md transition-all duration-200 p-6 flex flex-col">
                {/* Number badge */}
                <span className={`absolute -top-4 left-6 w-8 h-8 rounded-full bg-[#c89e3a] text-white text-sm font-bold flex items-center justify-center shadow ${jost.className}`}>
                  {i + 1}
                </span>
                {/* Gold accent line */}
                <div className="w-10 h-0.5 bg-[#c89e3a] mt-2 mb-4" />
                <h3 className={`text-base font-bold text-[#1a1a1a] mb-3 leading-snug flex-1 ${marcellus.className}`}>{item.title}</h3>
                <p className={`text-gray-500 text-sm leading-relaxed mb-4 ${jost.className}`}>{item.body}</p>
                <Link href={lp("/contact")}
                  className={`inline-flex items-center gap-1 text-xs font-semibold text-white bg-[#c89e3a] hover:bg-[#b38d2f] px-4 py-2 transition-colors self-start ${jost.className}`}>
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Products Section ── */}
        <ProductsSection locale={locale} />

        {/* ── Section 5 — Selection guide ── */}
        <TwoCol
          imageRight
          imageSlot={<Img src="/event_pages/page_1/5.png" alt={sections.guide.imageAlt} />}
          textSlot={
            <div>
              <SectionHeading title={sections.guide.heading} />
              {sections.guide.paragraphs.map((p, i) => (
                <p key={i} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{p}</p>
              ))}
              <div className={`bg-[#FAF6EB] border border-[#e4c75f]/40 p-4 text-sm text-gray-700 mb-6 ${jost.className}`}>
                <span className="font-semibold text-[#1a1a1a]">Quick brief fields: </span>
                {sections.guide.briefFields}
              </div>
              <Link href={lp("/contact")}
                className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}>
                {data.primaryCta}
              </Link>
            </div>
          }
        />

        {/* ── Section 6 — Why Dalila ── */}
        <TwoCol
          imageSlot={<Img src="/event_pages/page_1/6.png" alt={sections.whyDalila.imageAlt} />}
          textSlot={
            <div>
              <SectionHeading title={sections.whyDalila.heading} />
              {sections.whyDalila.paragraphs.map((p, i) => (
                <p key={i} className={`text-gray-700 text-base md:text-lg leading-relaxed mb-4 ${jost.className}`}>{p}</p>
              ))}
              <div className={`border-l-4 border-[#c89e3a] pl-4 py-2 text-sm text-gray-600 mb-6 italic ${jost.className}`}>
                {sections.whyDalila.tradeNote}
              </div>
              <Link href={lp("/contact")}
                className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3.5 text-sm transition-colors ${jost.className}`}>
                {sections.whyDalila.cta}
              </Link>
            </div>
          }
        />

        {/* ── Section 8 — FAQ ── */}
        <section className="mb-16">
          <SectionHeading title={sections.faqs.heading} />
          <div className="w-full space-y-3">
            {sections.faqs.items.map((faq, i) => (
              <details key={i} className="border border-gray-200 p-4 bg-white group">
                <summary className={`cursor-pointer font-semibold text-[#1a1a1a] list-none flex justify-between items-start gap-4 ${marcellus.className}`}>
                  {faq.q}
                  <span className="text-[#c89e3a] group-open:rotate-45 transition-transform text-xl leading-none shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className={`mt-3 text-gray-700 text-base leading-relaxed ${jost.className}`}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Byline */}
        <p className={`text-xs text-gray-400 text-center mb-8 ${jost.className}`}>
          Prepared by Dalila Diamonds&apos; Antwerp sourcing team. Last reviewed: August 2026.
        </p>

      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-[#c89e3a]/30 bg-[#0B1A33] p-3">
        <Link href={lp("/contact")}
          className={`block w-full text-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium py-3 text-sm tracking-[0.08em] uppercase ${jost.className}`}>
          {data.primaryCta}
        </Link>
      </div>

    </main>
  );
}
