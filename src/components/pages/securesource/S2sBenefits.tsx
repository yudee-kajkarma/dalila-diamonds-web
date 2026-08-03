import { Marcellus, Jost } from "next/font/google";
import type { S2sContent } from "@/lib/i18n/s2sTranslations";
import {
  FaEuroSign,
  FaShieldAlt,
  FaShippingFast,
  FaMapMarkerAlt,
  FaGlobeEurope,
  FaGem,
} from "react-icons/fa";
import type { IconType } from "react-icons";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const iconMap: Record<string, IconType> = {
  "Euro payment": FaEuroSign,
  "Expert quality control": FaShieldAlt,
  "Weekly shipments": FaShippingFast,
  "Delivery to Belgium": FaMapMarkerAlt,
  "EU shipping": FaGlobeEurope,
  "Antwerp support": FaGem,
};

interface S2sBenefitsProps {
  content: S2sContent["benefits"];
}

export default function S2sBenefits({ content }: S2sBenefitsProps) {
  return (
    <section className="bg-[#0B1A33] py-12 md:py-16" aria-labelledby="s2s-benefits-heading">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <h2
          id="s2s-benefits-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-center mb-10 md:mb-12 text-white tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {content.cards.map((card) => {
            const Icon = iconMap[card.title] || FaGem;
            return (
              <article key={card.title} className="flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#c89e3a] flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <Icon className="text-white" size={40} />
                </div>
                <h3 className={`text-xl md:text-2xl font-normal mb-2 text-white ${marcellus.className}`}>
                  {card.title}
                </h3>
                <p className={`text-white/90 text-[14px] md:text-[15px] leading-relaxed max-w-xs ${jost.className}`}>
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
