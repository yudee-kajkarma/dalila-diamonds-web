"use client";
import { marcellus, jost } from "@/lib/fonts";
import AnimatedContainer from "@/components/shared/AnimatedContainer";

export interface ContentSection {
  title: string;
  content: string;
  bulletPoints?: string[];
}

interface SeoPageContentProps {
  sections: ContentSection[];
}

export default function SeoPageContent({ sections }: SeoPageContentProps) {
  return (
    <div className="bg-white py-2 md:py-3 lg:py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {sections.map((section, index) => (
          <AnimatedContainer key={index} direction="up" delay={index * 0.1}>
            <div className="py-2 md:py-3 mb-2 last:mb-0">
              {/* Decorative Top Border */}
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#C8AA4A] to-[#e4c75f] mb-6 rounded-full"></div>
              
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-light text-[#C8AA4A] mb-8 leading-tight tracking-tight ${marcellus.className}`}
              >
                {section.title}
              </h2>
              
              {section.content && (
                <div
                  className={`text-gray-700 text-[15px] md:text-[17px] lg:text-lg leading-[1.8] mb-8 whitespace-pre-line ${jost.className} font-normal`}
                >
                  {section.content}
                </div>
              )}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className={`space-y-5 ${jost.className}`}>
                  {section.bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-700 text-[15px] md:text-[17px] lg:text-lg leading-[1.8] group">
                      <span className="text-[#C8AA4A] mt-1 font-bold text-xl shrink-0 group-hover:scale-110 transition-transform duration-200">•</span>
                      <span className="flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </AnimatedContainer>
        ))}
      </div>
    </div>
  );
}
