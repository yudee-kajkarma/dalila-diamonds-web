"use client";

import Image from "next/image";
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

export default function DiamondSourceHero() {
  const { dictionary } = useLanguage();

  return (
    <div className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image first on mobile, right on desktop */}
          <div className="order-1 lg:order-2 w-full relative pb-6 md:pb-8 lg:pb-12">
            <AnimatedContainer direction="scale-out">
              <div className="relative w-full h-64 sm:h-80 md:h-96 bg-black overflow-hidden shadow-2xl">
                <Image
                  src="/diamonds_source/diamondsourceforyou.jpg"
                  alt="Diamond shapes collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </AnimatedContainer>
          </div>
          <div className="order-2 lg:order-1 w-full space-y-3 lg:pl-4">
            <p
              className={`text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase ${jost.className} bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent font-normal`}
            >
              {dictionary?.ds4u?.heroTagline || "Our Specialty"}
            </p>
            <AnimatedContainer direction="up">
              <h3
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight ${marcellus.className}`}
              >
                {dictionary?.ds4u?.heroTitle || "Diamond Source For You"}
              </h3>
            </AnimatedContainer>
            <AnimatedContainer direction="up" delay={0.5}>
              <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed pt-2">
                {dictionary?.ds4u?.heroText || "Personalized diamond sourcing from our exclusive worldwide network."}
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
