import Image from "next/image";
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

interface Ds4uProcessProps {
  content: Ds4uContent["process"];
}

export default function Ds4uProcess({ content }: Ds4uProcessProps) {
  return (
    <section
      id={content.id}
      className="bg-gray-50 py-12 md:py-16"
      aria-labelledby="ds4u-process-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="ds4u-process-heading"
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

        <div className="space-y-12 md:space-y-16">
          {content.steps.map((step) => (
            <article key={step.tag} className="max-w-4xl">
              <p
                className={`text-sm sm:text-base tracking-[0.08em] uppercase mb-3 ${jost.className} bg-gradient-to-r from-[#bd9f41] via-[#e4c75f] to-[#bd9f41] bg-clip-text text-transparent`}
              >
                Step {step.tag}
              </p>
              <h3 className={`text-2xl md:text-3xl text-gray-900 mb-5 ${marcellus.className}`}>
                {step.title}
              </h3>
              <div className={`space-y-4 text-gray-700 text-[15px] md:text-base leading-relaxed ${jost.className}`}>
                {step.paragraphs.map((paragraph, index) => {
                  if (step.tag === "3" && paragraph.startsWith("The GIA 4Cs")) {
                    return (
                      <p key={paragraph.slice(0, 40)}>
                        The{" "}
                        <a
                          href="https://4cs.gia.edu/en-us/4cs-of-diamond-quality/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8a7028] underline hover:text-[#c89e3a]"
                        >
                          GIA 4Cs
                        </a>{" "}
                        provide an important foundation for describing diamond quality. However, the
                        final decision should also consider the appearance of the individual stone and
                        whether it suits the intended jewellery.
                      </p>
                    );
                  }

                  if (step.tag === "4" && paragraph.includes("GIA Report Check")) {
                    return (
                      <p key={paragraph.slice(0, 40)}>
                        Report information can be checked through the issuing laboratory’s official
                        verification service. GIA-graded diamonds can be checked using{" "}
                        <a
                          href="https://www.gia.edu/report-check-landing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8a7028] underline hover:text-[#c89e3a]"
                        >
                          GIA Report Check
                        </a>
                        , while IGI and HRD provide their own official verification systems.
                      </p>
                    );
                  }

                  if (step.tag === "4" && paragraph.includes("GIA vs IGI vs HRD")) {
                    return (
                      <p key={paragraph.slice(0, 40)}>
                        Online report verification confirms that the report information exists in the
                        laboratory’s records. The physical diamond must still be matched to the report
                        through its inscription, measurements and identifying characteristics. Buyers
                        unfamiliar with the differences between laboratories can also read Dalila’s{" "}
                        <Link
                          href="/blogs/hrd-vs-gia-vs-igi-diamond-certification"
                          className="text-[#8a7028] underline hover:text-[#c89e3a]"
                        >
                          GIA vs IGI vs HRD guide
                        </Link>
                        .
                      </p>
                    );
                  }

                  if (step.bullets && paragraph === "The comparison can include:") {
                    return (
                      <div key="comparison-list">
                        <p>{paragraph}</p>
                        <ul className="mt-4 space-y-2">
                          {step.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3">
                              <span className="text-[#c89e3a] font-bold shrink-0" aria-hidden="true">
                                •
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  return <p key={`${step.tag}-${index}`}>{paragraph}</p>;
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
