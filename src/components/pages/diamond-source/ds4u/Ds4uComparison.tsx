import Link from "next/link";
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

interface Ds4uComparisonProps {
  content: Ds4uContent["comparison"];
}

export default function Ds4uComparison({ content }: Ds4uComparisonProps) {
  return (
    <section
      id={content.id}
      className="bg-white py-12 md:py-16"
      aria-labelledby="ds4u-comparison-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="ds4u-comparison-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-4 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>
        <p className={`text-gray-700 text-[15px] md:text-base leading-relaxed mb-10 ${jost.className}`}>
          {content.intro}
        </p>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          <article className="bg-white border border-gray-200 p-6 md:p-8 h-full">
            <h3 className={`text-2xl md:text-3xl text-gray-900 mb-6 ${marcellus.className}`}>
              {content.ds4u.title}
            </h3>
            <ul className={`space-y-3 ${jost.className}`}>
              {content.ds4u.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-700 text-sm md:text-base leading-relaxed">
                  <span className="text-[#c89e3a] font-bold shrink-0" aria-hidden="true">
                    •
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="bg-white border border-gray-200 p-6 md:p-8 h-full flex flex-col">
            <h3 className={`text-2xl md:text-3xl text-gray-900 mb-6 ${marcellus.className}`}>
              {content.s2s.title}
            </h3>
            <ul className={`space-y-3 mb-8 flex-1 ${jost.className}`}>
              {content.s2s.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-700 text-sm md:text-base leading-relaxed">
                  <span className="text-[#c89e3a] font-bold shrink-0" aria-hidden="true">
                    •
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            {content.s2s.buttonText && content.s2s.buttonHref && (
              <Link
                href={content.s2s.buttonHref}
                className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${jost.className}`}
              >
                {content.s2s.buttonText}
              </Link>
            )}
          </article>
        </div>

        <div className={`space-y-5 text-gray-700 text-[15px] md:text-base leading-relaxed ${jost.className}`}>
          <p>{content.closing[0]}</p>
          <p>
            If your business requires ongoing natural-diamond supply, repeat orders, commercial parcels
            or a structured procurement relationship, use Dalila’s{" "}
            <Link
              href={content.s2sLinkHref}
              className="text-[#8a7028] underline hover:text-[#c89e3a]"
            >
              {content.s2sLinkText}
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
