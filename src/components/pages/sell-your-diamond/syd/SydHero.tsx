import Image from "next/image";
import { Marcellus, Jost } from "next/font/google";
import type { SydContent } from "@/lib/i18n/sydTranslations";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

interface SydHeroProps {
  content: SydContent["hero"];
}

export default function SydHero({ content }: SydHeroProps) {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20" aria-labelledby="syd-hero-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-4 md:space-y-6 lg:pl-4 w-full">
            <p
              className={`text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase ${jost.className} bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent font-normal`}
            >
              {content.tagline}
            </p>
            <h1
              id="syd-hero-heading"
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight ${marcellus.className}`}
            >
              {content.title}
            </h1>
            <div className={`space-y-4 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed ${jost.className}`}>
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <a
                href={content.primaryButtonHref}
                className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${jost.className}`}
              >
                {content.primaryButtonText}
              </a>
              <a
                href={content.secondaryButtonHref}
                className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#8a7028] hover:bg-[#faf6eb] font-medium px-9 py-3.5 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
              >
                {content.secondaryButtonText}
              </a>
            </div>

            <ul
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 ${jost.className}`}
              aria-label="Sell Your Diamond trust indicators"
            >
              {content.trustIndicators.map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                  <span className="text-[#c89e3a] font-bold" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className={`text-gray-500 text-sm leading-relaxed pt-2 ${jost.className}`}>
              {content.notice}
            </p>
          </div>

          <div className="relative pb-6 md:pb-8 lg:pb-12 w-full">
            <div className="relative w-full aspect-[16/9] bg-black overflow-hidden shadow-2xl">
              <Image
                src={content.imageSrc}
                alt={content.imageAlt}
                width={1600}
                height={900}
                className="object-cover w-full h-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <p
                className={`absolute bottom-4 left-4 right-4 text-white text-sm sm:text-base tracking-[0.14em] uppercase ${jost.className}`}
              >
                {content.imageOverlay}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
