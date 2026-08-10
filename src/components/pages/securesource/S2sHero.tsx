import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import { getLocalizedPath, Locale } from "@/lib/i18n/config";
import type { S2sContent } from "@/lib/i18n/s2sTranslations";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

interface S2sHeroProps {
  content: S2sContent["hero"];
  locale?: Locale;
}

export default function S2sHero({ content, locale = "en" }: S2sHeroProps) {
  const localizedPath = (path: string) => getLocalizedPath(path, locale);

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20" aria-labelledby="s2s-hero-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-4 md:space-y-6 lg:pl-4 w-full">
            <p
              className={`text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase ${jost.className} bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent font-normal`}
            >
              {content.tagline}
            </p>
            <h1
              id="s2s-hero-heading"
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight ${marcellus.className}`}
            >
              {content.title}
            </h1>
            <p className={`text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed ${jost.className}`}>
              {content.subheading}
            </p>
            <p className={`text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed ${jost.className}`}>
              {content.subheadingSecondary}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Link
                href={localizedPath(content.primaryButtonHref)}
                className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${jost.className}`}
              >
                {content.primaryButtonText}
              </Link>
              <Link
                href={content.secondaryButtonHref}
                className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#8a7028] hover:bg-[#faf6eb] font-medium px-9 py-3.5 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
              >
                {content.secondaryButtonText}
              </Link>
            </div>

            <ul
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 ${jost.className}`}
              aria-label="S2S service trust indicators"
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
          </div>

          <div className="relative pb-6 md:pb-8 lg:pb-12 w-full">
            <div className="relative w-full h-64 sm:h-80 md:h-96 bg-black overflow-hidden shadow-2xl">
              <Image
                src="/secure_to_source/stos.jpg"
                alt={content.imageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
