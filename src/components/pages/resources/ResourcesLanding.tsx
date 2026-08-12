"use client";

import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedPath } from "@/lib/i18n/config";

// Resource data loaders
import { getQualityChartData } from "@/lib/i18n/getQualityChartData";
import { getCuletGuideData } from "@/lib/i18n/getCuletGuideData";
import { getDiamondSizeChartData } from "@/lib/i18n/getDiamondSizeChartData";
import { getDiamondValuationCalculatorData } from "@/lib/i18n/getDiamondValuationCalculatorData";
import { getHowToSellDiamondRingData } from "@/lib/i18n/getHowToSellDiamondRingData";
import { getSellDiamondWithoutCertificateData } from "@/lib/i18n/getSellDiamondWithoutCertificateData";
import { getGradingReportData } from "@/lib/i18n/getGradingReportData";
import { getFluorescenceGuideData } from "@/lib/i18n/getFluorescenceGuideData";
import { getGirdleGuideData } from "@/lib/i18n/getGirdleGuideData";
import { getNaturalVsLabGrownData } from "@/lib/i18n/getNaturalVsLabGrownData";
import { getWhereToSellDiamondRingData } from "@/lib/i18n/getWhereToSellDiamondRingData";
import { getDiamondAppraisalAntwerpData } from "@/lib/i18n/getDiamondAppraisalAntwerpData";

// Sell / B2B / Cushion translations
import { getSellContent } from "@/lib/i18n/sellTranslations";
import { getB2bContent } from "@/lib/i18n/b2bTranslations";
import { getGuideContent } from "@/lib/i18n/guideTranslations";

const marcellus = Marcellus({ subsets: ["latin"], weight: "400" });
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

interface ResourceCard {
  href: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export default function ResourcesLanding() {
  const { locale, dictionary } = useLanguage();

  const localizedPath = (path: string) => getLocalizedPath(path, locale);

  // Load all resource data in current locale
  const qualityChart = getQualityChartData(locale);
  const culet = getCuletGuideData(locale);
  const sizeChart = getDiamondSizeChartData(locale);
  const valuation = getDiamondValuationCalculatorData(locale);
  const howToSell = getHowToSellDiamondRingData(locale);
  const sellWithoutCert = getSellDiamondWithoutCertificateData(locale);
  const gradingReport = getGradingReportData(locale);
  const fluorescence = getFluorescenceGuideData(locale);
  const girdle = getGirdleGuideData(locale);
  const naturalVsLab = getNaturalVsLabGrownData(locale);
  const whereToSell = getWhereToSellDiamondRingData(locale);
  const appraisal = getDiamondAppraisalAntwerpData(locale);

  // Non-JSON resource pages — use sellTranslations / b2bTranslations / guideTranslations
  const sellContent = getSellContent(locale);
  const b2bContent = getB2bContent(locale);
  const guideContent = getGuideContent(locale);

  // b2bContent has initialSections[0].heading for the main title
  const b2bTitle =
    b2bContent?.initialSections?.[0]?.heading?.replace(/<br\s*\/?>/gi, " ") ||
    "Premium B2B Diamond Supplier in Belgium";
  const b2bDesc =
    b2bContent?.initialSections?.[0]?.description?.slice(0, 160) ||
    "Dalila Diamonds offers premium B2B diamond supply in Belgium — certified quality, reliable service and trusted sourcing.";

  // sellContent has whySellingSection or servicesSections
  const sellTitle =
    b2bContent?.initialSections?.[0]?.heading
      ? locale === "de"
        ? "Diamanten sicher verkaufen"
        : locale === "fr"
        ? "Vendez votre diamant en toute sécurité"
        : locale === "it"
        ? "Vendi il tuo diamante in sicurezza"
        : locale === "nl"
        ? "Verkoop uw diamant veilig"
        : locale === "es"
        ? "Vende tu diamante de forma segura"
        : "Sell Your Diamond Safely"
      : "Sell Your Diamond Safely";
  const sellDesc =
    "Sell your diamond safely with Dalila Diamonds in Belgium — trusted buyer offering secure transactions and fair value.";

  const resources: ResourceCard[] = [
    {
      href: "/premium-b2b-diamond-supplier-belgium",
      title: b2bTitle,
      description: b2bDesc,
      image: "/b2b/business-partnership.jpg",
      imageAlt: "Premium B2B Diamond Supplier in Belgium",
    },
    {
      href: "/sell-your-diamond-safely",
      title: sellTitle,
      description: sellDesc,
      image: "/selllSafe/sell-diamonds.jpg",
      imageAlt: "Sell Your Diamond Safely",
    },
    {
      href: "/elongated-cushion-cut-diamond-guide",
      title: guideContent.introTitle || "Elongated Cushion Cut Diamond Guide",
      description: guideContent.introContent?.slice(0, 160) ||
        "Discover everything you need to know about elongated cushion cut diamonds — proportions, colour, clarity and settings.",
      image: "/DiamondsinBlubg/Cushion.jpg",
      imageAlt: "Elongated Cushion Cut Diamond Guide",
    },
    {
      href: "/resources/diamond-grading-report-guide",
      title: gradingReport.hero.title,
      description: gradingReport.meta.description,
      image: "/b2b/diamant-certificat-GIA.webp",
      imageAlt: "Diamond Grading Report Guide",
    },
    {
      href: "/resources/diamond-quality-chart",
      title: qualityChart.hero.title,
      description: qualityChart.meta.description,
      image: "/b2b/close-up.jpg",
      imageAlt: qualityChart.hero.title,
    },
    {
      href: "/resources/diamond-fluorescence-guide",
      title: fluorescence.hero.title,
      description: fluorescence.meta.description,
      image: "/DiamondsinBlubg/Round.jpg",
      imageAlt: fluorescence.hero.title,
    },
    {
      href: "/resources/diamond-culet-guide",
      title: culet.hero.title,
      description: culet.meta.description,
      image: "/DiamondsinBlubg/Asscher.jpg",
      imageAlt: culet.hero.title,
    },
    {
      href: "/resources/diamond-girdle-guide",
      title: girdle.hero.title,
      description: girdle.meta.description,
      image: "/DiamondsinBlubg/Emerald.jpg",
      imageAlt: girdle.hero.title,
    },
    {
      href: "/resources/diamond-size-chart",
      title: sizeChart.hero.title,
      description: sizeChart.meta.description,
      image: "/DiamondsinBlubg/Oval.jpg",
      imageAlt: sizeChart.hero.title,
    },
    {
      href: "/resources/natural-vs-lab-grown-diamonds",
      title: naturalVsLab.hero.title,
      description: naturalVsLab.meta.description,
      image: "/b2b/looseround.webp",
      imageAlt: naturalVsLab.hero.title,
    },
    {
      href: "/resources/diamond-valuation-calculator",
      title: valuation.hero.title,
      description: valuation.meta.description,
      image: "/b2b/diamondsourceforyou.jpg",
      imageAlt: valuation.hero.title,
    },
    {
      href: "/resources/where-to-sell-diamond-ring",
      title: whereToSell.hero.title,
      description: whereToSell.meta.description,
      image: "/selllSafe/tray.jpg",
      imageAlt: whereToSell.hero.title,
    },
    {
      href: "/resources/how-to-sell-diamond-ring",
      title: howToSell.hero.title,
      description: howToSell.meta.description,
      image: "/selllSafe/loose.jpg",
      imageAlt: howToSell.hero.title,
    },
    {
      href: "/resources/sell-diamond-without-certificate",
      title: sellWithoutCert.hero.title,
      description: sellWithoutCert.meta.description,
      image: "/selllSafe/diamondwork.png",
      imageAlt: sellWithoutCert.hero.title,
    },
    {
      href: "/resources/diamond-appraisal-antwerp-belgium",
      title: appraisal.hero.title,
      description: appraisal.meta.description,
      image: "/b2b/stos.jpg",
      imageAlt: appraisal.hero.title,
    },
  ];

  const bannerTitle =
    dictionary?.nav?.resources
      ? `${dictionary.nav.resources} & Guides`
      : "Diamond Resources & Guides";

  const readGuideLabel = locale === "de"
    ? "Leitfaden lesen"
    : locale === "fr"
    ? "Lire le guide"
    : locale === "it"
    ? "Leggi la guida"
    : locale === "nl"
    ? "Gids lezen"
    : locale === "es"
    ? "Leer la guía"
    : "Read Guide";

  return (
    <main className={`bg-white min-h-screen ${jost.className}`}>
      {/* Banner */}
      <div className="relative bg-slate-900">
        <section
          className="relative min-h-[280px] sm:min-h-[340px] flex items-center justify-center overflow-hidden"
          aria-label="Resources page banner"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/banner-dalila-contact.png"
              alt="Dalila Diamonds Resources"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center pt-24 pb-8">
            <h1
              className={`text-3xl sm:text-5xl lg:text-6xl text-white mb-3 ${marcellus.className}`}
            >
              {bannerTitle}
            </h1>
            <div
              className="w-2/3 sm:w-[35%] h-px bg-amber-400 mx-auto mb-6"
              aria-hidden="true"
            />
            <nav
              aria-label="Breadcrumb"
              className={`flex flex-wrap items-center justify-center gap-2 text-gray-300 text-sm md:text-base ${jost.className}`}
            >
              <Link
                href={localizedPath("/")}
                className="hover:text-amber-400 transition-colors"
              >
                {dictionary?.dk?.breadcrumbHome || "Home"}
              </Link>
              <span aria-hidden="true">›</span>
              <span>{dictionary?.nav?.resources || "Resources"}</span>
            </nav>
          </div>
        </section>
      </div>

      {/* Intro */}
      <section className="bg-white py-10 md:py-14">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
          <h2
            className={`text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 leading-tight ${marcellus.className}`}
          >
            {dictionary?.nav?.resources || "Resources"} &amp; Guides
          </h2>
          <p
            className={`text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl ${jost.className}`}
          >
            {locale === "de"
              ? "Von Grading-Berichten bis hin zum sicheren Verkauf Ihres Diamanten – unsere Ressourcenbibliothek deckt alles ab, was Sie für fundierte Entscheidungen über Naturdiamanten benötigen."
              : locale === "fr"
              ? "Des rapports de classification à la vente sécurisée de votre diamant, notre bibliothèque de ressources couvre tout ce dont vous avez besoin pour prendre des décisions éclairées sur les diamants naturels."
              : locale === "it"
              ? "Dai rapporti di classificazione alla vendita sicura del tuo diamante, la nostra biblioteca di risorse copre tutto ciò di cui hai bisogno per prendere decisioni informate sui diamanti naturali."
              : locale === "nl"
              ? "Van graderingsrapporten tot het veilig verkopen van uw diamant – onze resourcebibliotheek behandelt alles wat u nodig heeft voor weloverwogen beslissingen over natuurlijke diamanten."
              : locale === "es"
              ? "Desde informes de graduación hasta la venta segura de su diamante, nuestra biblioteca de recursos cubre todo lo que necesita para tomar decisiones informadas sobre diamantes naturales."
              : "From understanding grading reports to selling your diamond safely, our resource library covers everything you need to make confident decisions about natural diamonds."}
          </p>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="bg-white pb-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={localizedPath(resource.href)}
                className="group flex flex-col bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={resource.image}
                    alt={resource.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#c89e3a]/0 group-hover:bg-[#c89e3a]/10 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="w-10 h-0.5 bg-[#c89e3a] mb-3" />
                  <h3
                    className={`text-lg font-bold text-[#1a1a1a] mb-2 leading-snug group-hover:text-[#c89e3a] transition-colors ${marcellus.className}`}
                  >
                    {resource.title}
                  </h3>
                  <p
                    className={`text-gray-600 text-sm leading-relaxed flex-1 ${jost.className}`}
                  >
                    {resource.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className={`text-sm font-medium text-[#c89e3a] ${jost.className}`}
                    >
                      {readGuideLabel}
                    </span>
                    <span
                      className="text-[#c89e3a] group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
