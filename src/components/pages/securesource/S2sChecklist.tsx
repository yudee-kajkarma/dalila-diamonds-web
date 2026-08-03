import { Marcellus, Jost } from "next/font/google";
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

interface S2sChecklistProps {
  content: S2sContent["checklist"];
}

export default function S2sChecklist({ content }: S2sChecklistProps) {
  return (
    <section className="bg-gray-50 py-12 md:py-16" aria-labelledby="s2s-checklist-heading">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="s2s-checklist-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-4 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>
        <p className={`text-gray-700 text-base md:text-lg leading-relaxed mb-8 ${jost.className}`}>
          {content.intro}
        </p>

        <ul className={`space-y-4 ${jost.className}`} role="list">
          {content.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-800 text-base md:text-lg leading-relaxed">
              <span
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c89e3a] text-white text-sm font-bold mt-0.5"
                aria-hidden="true"
              >
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
