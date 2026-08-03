import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import { getLocalizedPath, Locale } from "@/lib/i18n/config";
import type { S2sStep } from "@/lib/i18n/s2sTranslations";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

interface S2sStepsShowcaseProps {
  steps: S2sStep[];
  locale?: Locale;
}

function StepBlock({
  step,
  index,
  locale,
}: {
  step: S2sStep;
  index: number;
  locale: Locale;
}) {
  const localizedPath = (path: string) => getLocalizedPath(path, locale);
  const imageFirst = step.imagePosition === "left";
  const sectionId = index === 0 ? "how-s2s-works" : undefined;

  return (
    <div
      id={sectionId}
      className={`flex flex-col md:grid md:grid-cols-2 gap-16 items-center ${index < 2 ? "mb-32" : "mb-25 mt-25"}`}
    >
      <div className={`${imageFirst ? "order-1 md:order-none" : "order-1 md:order-2"} w-full`}>
        <div className="relative h-[290px] md:h-[340px] w-full max-w-[480px] mx-auto overflow-hidden shadow-2xl">
          <Image src={step.imageSrc} alt={step.imageAlt} fill className="object-cover" />
        </div>
      </div>

      <div className={`${imageFirst ? "order-2 md:order-none" : "order-2 md:order-1"} w-full`}>
        <div className="max-w-xl mx-auto">
          <p
            className={`text-sm sm:text-base md:text-lg tracking-[0.05em] uppercase ${marcellus.className} bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent font-normal mb-4`}
          >
            {step.tag}
          </p>
          <h2
            className={`text-[2.75rem] md:text-5xl lg:text-[3.25rem] font-light mb-7 text-gray-900 leading-[1.15] tracking-tight ${marcellus.className}`}
          >
            {step.title}
          </h2>
          <p className={`text-gray-600 leading-relaxed mb-6 text-[15px] md:text-base font-normal ${jost.className}`}>
            {step.text}
          </p>

          {step.bullets && step.bullets.length > 0 && (
            <ul className={`space-y-3 mb-6 ${jost.className}`}>
              {step.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-gray-700 text-[15px] md:text-base leading-relaxed">
                  <span className="text-[#c89e3a] mt-1 font-bold text-xl shrink-0" aria-hidden="true">
                    •
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
              {index === 0 && (
                <li className="flex items-start gap-3 text-gray-700 text-[15px] md:text-base leading-relaxed">
                  <span className="text-[#c89e3a] mt-1 font-bold text-xl shrink-0" aria-hidden="true">
                    •
                  </span>
                  <span>
                    Need inspiration first? You can{" "}
                    <Link
                      href={localizedPath("/inventory")}
                      className="text-[#8a7028] underline hover:text-[#c89e3a]"
                    >
                      browse loose natural diamonds
                    </Link>{" "}
                    in our inventory before searching elsewhere
                  </span>
                </li>
              )}
              {index === 1 && (
                <li className="flex items-start gap-3 text-gray-700 text-[15px] md:text-base leading-relaxed">
                  <span className="text-[#c89e3a] mt-1 font-bold text-xl shrink-0" aria-hidden="true">
                    •
                  </span>
                  <span>
                    If you need guidance on certificate terms, read how to{" "}
                    <Link
                      href={localizedPath("/diamondKnowledge")}
                      className="text-[#8a7028] underline hover:text-[#c89e3a]"
                    >
                      understand diamond grading reports
                    </Link>{" "}
                    before you buy
                  </span>
                </li>
              )}
            </ul>
          )}

          {step.note && (
            <aside className="mb-6 p-5 bg-[#FAF6EB] border border-[#e4c75f]/40 rounded-sm">
              <p className={`text-gray-800 text-sm md:text-base leading-relaxed ${jost.className}`}>
                {step.note}
              </p>
            </aside>
          )}

          {step.buttonText && step.buttonHref && (
            <Link
              href={localizedPath(step.buttonHref)}
              className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${jost.className}`}
            >
              {step.buttonText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function S2sStepsShowcase({ steps, locale = "en" }: S2sStepsShowcaseProps) {
  return (
    <section className="bg-white py-24" aria-label="How S2S works">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {steps.map((step, index) => (
          <StepBlock key={step.title} step={step} index={index} locale={locale} />
        ))}
      </div>
    </section>
  );
}
