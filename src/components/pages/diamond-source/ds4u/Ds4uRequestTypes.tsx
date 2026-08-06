import Image from "next/image";
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

interface Ds4uRequestTypesProps {
  content: Ds4uContent["requestTypes"];
}

export default function Ds4uRequestTypes({ content }: Ds4uRequestTypesProps) {
  return (
    <section
      id={content.id}
      className="bg-white py-12 md:py-16"
      aria-labelledby="ds4u-request-types-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="ds4u-request-types-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-8 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>

        <div className="relative w-full aspect-[14/10] max-w-3xl mx-auto mb-12 overflow-hidden shadow-xl bg-black">
          <Image
            src={content.imageSrc}
            alt={content.imageAlt}
            width={1400}
            height={1000}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        <div className="space-y-10 md:space-y-12">
          {content.cards.map((card) => (
            <article key={card.title} className="max-w-4xl">
              <h3 className={`text-2xl md:text-3xl text-gray-900 mb-4 ${marcellus.className}`}>
                {card.title}
              </h3>
              <div className={`space-y-4 text-gray-700 text-[15px] md:text-base leading-relaxed ${jost.className}`}>
                {card.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
