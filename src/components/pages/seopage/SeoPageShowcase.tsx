"use client";
import Image from "next/image";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";

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

export interface ShowcaseSection {
  label: string;
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}

interface SeoPageShowcaseProps {
  sections: ShowcaseSection[];
}

export default function SeoPageShowcase({ sections }: SeoPageShowcaseProps) {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-14 lg:gap-16 items-center ${
              index < sections.length - 1 ? "mb-20" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`order-1 ${
                section.imagePosition === "right" ? "md:order-2" : "md:order-none"
              } w-full`}
            >
              <AnimatedContainer direction="scale-out" delay={index * 0.1}>
                <div className="relative h-[320px] md:h-[380px] lg:h-[420px] w-full max-w-[520px] lg:max-w-[580px] mx-auto overflow-hidden shadow-2xl">
                  <Image
                    src={section.imageSrc}
                    alt={section.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </AnimatedContainer>
            </div>

            {/* Text */}
            <div
              className={`order-2 ${
                section.imagePosition === "right" ? "md:order-1" : "md:order-none"
              } w-full`}
            >
              <div className="max-w-xl mx-auto">
                <AnimatedContainer direction="up" delay={index * 0.1}>
                  <p
                    className={`text-sm sm:text-base md:text-lg tracking-[0.05em] uppercase ${marcellus.className} bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent font-normal mb-4`}
                  >
                    {section.label}
                  </p>
                  <h2
                    className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-5 text-gray-900 leading-[1.15] tracking-tight ${marcellus.className}`}
                    dangerouslySetInnerHTML={{ __html: section.heading }}
                  />
                </AnimatedContainer>
                <div
                  className={`text-gray-600 leading-relaxed mb-6 text-[15px] md:text-base font-normal ${jost.className}`}
                  dangerouslySetInnerHTML={{ __html: section.description }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
