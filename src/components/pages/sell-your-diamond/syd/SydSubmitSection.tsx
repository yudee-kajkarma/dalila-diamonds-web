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

interface SydSubmitSectionProps {
  content: SydContent["submitSection"];
}

export default function SydSubmitSection({ content }: SydSubmitSectionProps) {
  return (
    <section
      id={content.id}
      className="bg-[#0B1A33] py-12 md:py-16"
      aria-labelledby="syd-submit-heading"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2
          id="syd-submit-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-white mb-6 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>
        <div
          className={`space-y-4 text-white/80 text-[15px] md:text-base leading-relaxed mb-8 ${jost.className}`}
        >
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <div className="flex justify-center mb-8">
          <a
            href={content.primaryButtonHref}
            className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${jost.className}`}
          >
            {content.primaryButtonText}
          </a>
        </div>
        <p className={`text-white/50 text-sm leading-relaxed ${jost.className}`}>{content.notice}</p>
      </div>
    </section>
  );
}
