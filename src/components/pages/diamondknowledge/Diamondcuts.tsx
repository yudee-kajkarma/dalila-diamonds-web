"use client";
import Image from "next/image";
import { Gem } from "lucide-react";
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

export default function Diamondcuts() {
  const { dictionary } = useLanguage();

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedContainer direction="up">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 font-normal tracking-tight ${marcellus.className}`}
            >
              {dictionary?.dk?.cutsTitle || "The 4Cs of Diamonds"}
            </h1>
          </AnimatedContainer>
          <p
            className={`text-gray-600 leading-relaxed text-[18px] md:text-base max-w-4xl mx-auto font-light ${jost.className}`}
          >
            {dictionary?.dk?.cutsSubtitle || "When it comes to evaluating a diamond's quality and beauty, professionals rely on the 4Cs Cut, Color, Clarity, and Carat Weight. Understanding these characteristics will help you choose a diamond that matches your preferences and budget."}
          </p>
        </div>

        {/* 4Cs Section */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 lg:gap-20 items-start mt-16">
          {/* Image first on mobile, left on desktop */}
          <div className="order-1 md:order-none w-full flex justify-center items-center">
            <AnimatedContainer direction="left">
              <div className="relative w-full max-w-[500px] aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/diamond.png"
                    alt="Brilliant cut diamonds"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </AnimatedContainer>
          </div>

          {/* 4Cs Grid second on mobile, right on desktop */}
          <div className="order-2 md:order-none w-full">
            <AnimatedContainer direction="right">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-10 md:gap-y-10">
                {/* Cut */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 mb-2">
                    <Gem
                      className="text-amber-500 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <h3
                      className={`text-lg md:text-xl font-medium text-gray-900 leading-tight ${marcellus.className}`}
                    >
                      {dictionary?.dk?.cutTitle || "Cut: The Sparkle Factor"}
                    </h3>
                  </div>
                  <p
                    className={`text-gray-600 text-[13px] md:text-[18px] leading-relaxed font-light ${jost.className}`}
                  >
                    {dictionary?.dk?.cutDesc || "A diamond's cut determines how well it reflects light and that's what gives it brilliance. Even if a diamond has perfect color or clarity, a poor cut can make it look dull. The ideal cut brings out the stone's natural fire and radiance."}
                  </p>
                </div>

                {/* Color */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 mb-2">
                    <Gem
                      className="text-amber-500 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <h3
                      className={`text-lg md:text-xl font-medium text-gray-900 leading-tight ${marcellus.className}`}
                    >
                      {dictionary?.dk?.colorTitle || "Color: The Shade of Purity"}
                    </h3>
                  </div>
                  <p
                    className={`text-gray-600 text-[13px] md:text-[18px] leading-relaxed font-light ${jost.className}`}
                  >
                    {dictionary?.dk?.colorDesc || "Diamond color grades range from D (colorless) to Z (light yellow or brown). The less color a diamond has, the rarer and more valuable it is. Colorless diamonds reflect more light, resulting in unmatched sparkle and purity."}
                  </p>
                </div>

                {/* Clarity */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 mb-2">
                    <Gem
                      className="text-amber-500 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <h3
                      className={`text-lg md:text-xl font-medium text-gray-900 leading-tight ${marcellus.className}`}
                    >
                      {dictionary?.dk?.clarityTitle || "Clarity: Nature's Signature"}
                    </h3>
                  </div>
                  <p
                    className={`text-gray-600 text-[13px] md:text-[18px] leading-relaxed font-light ${jost.className}`}
                  >
                    {dictionary?.dk?.clarityDesc || "Every natural diamond has tiny inclusions or blemishes formed during its creation. These are nature's fingerprints, making each diamond unique. Clarity is graded from Flawless (F) to Included (I), and most inclusions are microscopic, not visible to the naked eye."}
                  </p>
                </div>

                {/* Carat Weight */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 mb-2">
                    <Gem
                      className="text-amber-500 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <h3
                      className={`text-lg md:text-xl font-medium text-gray-900 leading-tight ${marcellus.className}`}
                    >
                      {dictionary?.dk?.caratTitle || "Carat Weight: The Measure of Size"}
                    </h3>
                  </div>
                  <p
                    className={`text-gray-600 text-[13px] md:text-[18px] leading-relaxed font-light ${jost.className}`}
                  >
                    {dictionary?.dk?.caratDesc || "Carat refers to a diamond's weight, not its size. Larger diamonds are rarer, but two diamonds of the same carat can appear different depending on their cut. It's always best to balance carat with the other Cs for true value."}
                  </p>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
