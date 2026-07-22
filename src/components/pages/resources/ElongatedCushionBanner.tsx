"use client";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import { useLanguage } from "@/context/LanguageContext";

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

const ElongatedCushionBanner = () => {
  const { locale, dictionary } = useLanguage();
  const localizedPath = (path: string) => {
    if (!locale || locale === "en") return path;
    return `/${locale}${path}`;
  };

  return (
    <div className="relative bg-slate-900">
      {/* Banner Section */}
      <section className="relative h-[36vh] xs:h-[44vh] sm:h-[60vh] md:h-[55vh] lg:h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner-dalila-contact.png"
            alt="Elongated Cushion Cut Diamond Guide"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 relative z-10 text-center py-8 sm:py-14">
          <AnimatedContainer direction="right">
            <div className="opacity-100">
              <h1
                className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white mb-3 mt-8 sm:mt-30 whitespace-nowrap sm:whitespace-normal ${marcellus.className}`}
                style={{ lineHeight: 1.15 }}
              >
                {dictionary?.nav?.articleCushion?.toUpperCase() || "ELONGATED CUSHION CUT DIAMOND GUIDE"}
              </h1>
              <div className="w-2/3 sm:w-[35%] h-px bg-amber-400 mx-auto mb-6" />
            </div>
          </AnimatedContainer>

          <div className="opacity-100 mt-4 sm:mt-6">
            <div className="flex flex-wrap items-center justify-center gap-2 text-gray-300 text-xs xs:text-sm md:text-base">
              <Link
                href={localizedPath("/")}
                className={`hover:text-amber-400 transition-colors ${jost.className}`}
              >
                {dictionary?.dk?.breadcrumbHome || "Home"}
              </Link>
              <span>›</span>
              <Link
                href={localizedPath("/blogs")}
                className={`hover:text-amber-400 transition-colors ${jost.className}`}
              >
                {dictionary?.nav?.resources || "Resources"}
              </Link>
              <span>›</span>
              <span>{dictionary?.nav?.articleCushion || "Elongated Cushion Cut Diamond Guide"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ElongatedCushionBanner.displayName = "ElongatedCushionBanner";

export default memo(ElongatedCushionBanner);
