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

interface S2sWhoIsForProps {
  content: S2sContent["whoIsFor"];
}

export default function S2sWhoIsFor({ content }: S2sWhoIsForProps) {
  return (
    <section className="bg-gray-50 py-12 md:py-16" aria-labelledby="s2s-audience-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="s2s-audience-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-10 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.cards.map((card) => (
            <article
              key={card.title}
              className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className={`text-xl text-gray-900 mb-3 ${marcellus.className}`}>{card.title}</h3>
              <p className={`text-gray-700 text-sm md:text-base leading-relaxed ${jost.className}`}>
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
