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

export default function SecureSourceHero() {
  const { dictionary } = useLanguage();

  return (
    <div className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Use flex-col-reverse for mobile, flex-row for desktop */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Text Section */}
          <div className="space-y-4 md:space-y-6 lg:pl-4 w-full">
            <p
              className={`text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase ${jost.className} bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent font-normal`}
            >
              {dictionary?.s2s?.heroTagline || "Here's How We Help"}
            </p>
            <AnimatedContainer direction="up">
              <h3
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight ${marcellus.className}`}
              >
                {dictionary?.s2s?.heroTitle || "TRUSTED DIAMOND SOURCING"}
              </h3>
            </AnimatedContainer>
            <AnimatedContainer direction="up" delay={0.5}>
              <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed">
                {dictionary?.s2s?.heroText || "We offer two specialised diamond-sourcing services..."}
              </p>
            </AnimatedContainer>
          </div>

          {/* Image Section */}
          <div className="relative pb-6 md:pb-8 lg:pb-12 w-full">
            <AnimatedContainer direction="scale-out">
              <div className="relative w-full h-64 sm:h-80 md:h-96 bg-black overflow-hidden shadow-2xl">
                <Image
                  src="/secure_to_source/stos.jpg"
                  alt="Diamond shapes collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
