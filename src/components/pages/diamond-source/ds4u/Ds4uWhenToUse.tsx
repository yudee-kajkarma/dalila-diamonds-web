import { Marcellus, Jost } from "next/font/google";
import type { Ds4uContent } from "@/lib/i18n/ds4uTranslations";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

interface Ds4uWhenToUseProps {
  content: Ds4uContent["whenToUse"];
}

export default function Ds4uWhenToUse({ content }: Ds4uWhenToUseProps) {
  return (
    <section
      id={content.id}
      className="bg-gray-50 py-12 md:py-16"
      aria-labelledby="ds4u-when-to-use-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="ds4u-when-to-use-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-8 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>

        <div className={`space-y-5 text-gray-700 text-[15px] md:text-base leading-relaxed ${jost.className}`}>
          {content.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <ul className={`mt-6 space-y-3 ${jost.className}`} role="list">
          {content.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-800 text-[15px] md:text-base leading-relaxed">
              <span className="text-[#c89e3a] font-bold shrink-0 mt-0.5" aria-hidden="true">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-8 space-y-5 text-gray-700 text-[15px] md:text-base leading-relaxed ${jost.className}`}>
          {content.closing.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
