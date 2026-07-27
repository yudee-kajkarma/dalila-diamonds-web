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

export default function AboutHero() {
  const { dictionary } = useLanguage();

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
          {/* Image first on mobile, left on desktop */}
          <div className="order-1 lg:order-none w-full relative pb-12">
            <AnimatedContainer direction="scale-out">
              <div className="relative w-full h-96 bg-black rounded-none overflow-hidden shadow-2xl">
                <Image
                  src="/diamondcuts/aboutus.jpg"
                  alt="Diamond shapes collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </AnimatedContainer>
            <div
              className="absolute bottom-0 -right-2 sm:-right-3 md:-right-4 lg:-right-6 px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 shadow-xl mb-6"
              style={{ backgroundColor: "#c89e3a" }}
            >
              <h3
                className={`text-xs sm:text-base md:text-lg lg:text-xl font-normal text-white whitespace-nowrap tracking-wide ${marcellus.className}`}
                style={{ minWidth: 'unset', minHeight: 'unset' }}
              >
                {dictionary?.nav?.aboutUs || "ABOUT DALILA"}
              </h3>
            </div>
          </div>

          {/* Content second on mobile, right on desktop */}
          <div className="order-2 lg:order-none w-full space-y-6 lg:pl-4">
            {/* Main Heading */}
            <AnimatedContainer direction="up">
              <h3
                className={`text-3xl md:text-4xl lg:text-5xl text-gray-800 leading-tight ${marcellus.className}`}
              >
                {dictionary?.about?.aboutHeroTitle || "Shape Brilliance into Timeless Value."}
              </h3>
            </AnimatedContainer>

            {/* Description */}
            <AnimatedContainer direction="up" delay={0.4}>
              <p
                className={`text-gray-500 text-sm md:text-base leading-relaxed ${jost.className}`}
              >
                {dictionary?.about?.aboutHeroText1 || "At DALILA DIAMONDS, we believe diamonds represent more than beauty..."}
              </p>

              <p
                className={`text-gray-500 text-sm md:text-base leading-relaxed ${jost.className}`}
              >
                {dictionary?.about?.aboutHeroText2 || "With a legacy spanning over five decades..."}
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
