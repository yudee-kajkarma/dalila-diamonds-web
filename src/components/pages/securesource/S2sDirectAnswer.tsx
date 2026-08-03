import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import { getLocalizedPath, Locale } from "@/lib/i18n/config";
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

interface S2sDirectAnswerProps {
  content: S2sContent["directAnswer"];
  locale?: Locale;
}

export default function S2sDirectAnswer({ content, locale = "en" }: S2sDirectAnswerProps) {
  const localizedPath = (path: string) => getLocalizedPath(path, locale);

  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="s2s-direct-answer-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="s2s-direct-answer-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-8 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>

        <div className={`space-y-5 text-gray-700 text-[15px] md:text-base leading-relaxed ${jost.className}`}>
          <p>{content.paragraphs[0]}</p>
          <p>{content.paragraphs[1]}</p>
          <p>
            This service is designed for jewellers, retailers, wholesalers and trade buyers who regularly
            source certified loose diamonds online and want a clearer workflow for cross-border purchases.
            If you prefer to buy from our own stock, you can{" "}
            <Link href={localizedPath("/inventory")} className="text-[#8a7028] underline hover:text-[#c89e3a]">
              browse loose natural diamonds
            </Link>{" "}
            in our inventory. If you need a stone sourced to your exact specifications from our global
            network, explore{" "}
            <Link href={localizedPath("/diamond-source")} className="text-[#8a7028] underline hover:text-[#c89e3a]">
              custom diamond sourcing
            </Link>{" "}
            through DS4U.
          </p>
          <p>
            Before submitting a request, it helps to review the independent grading report and understand
            how laboratories such as GIA, IGI and HRD describe the diamond&apos;s quality. Our{" "}
            <Link href={localizedPath("/diamondKnowledge")} className="text-[#8a7028] underline hover:text-[#c89e3a]">
              understand diamond grading reports
            </Link>{" "}
            resources can help you interpret certificate details with more confidence. When you are ready,
            you can{" "}
            <Link href={localizedPath("/contact")} className="text-[#8a7028] underline hover:text-[#c89e3a]">
              submit an S2S request
            </Link>{" "}
            or return to our homepage to{" "}
            <Link href={localizedPath("/")} className="text-[#8a7028] underline hover:text-[#c89e3a]">
              buy natural diamonds
            </Link>{" "}
            from Dalila.
          </p>
        </div>

        <aside
          className="mt-8 p-6 md:p-8 bg-[#FAF6EB] border border-[#e4c75f]/40 rounded-sm"
          aria-label="Quick answer"
        >
          <p className={`text-sm uppercase tracking-[0.12em] text-[#8a7028] mb-3 ${jost.className}`}>
            Quick answer
          </p>
          <p className={`text-gray-900 text-base md:text-lg leading-relaxed ${jost.className}`}>
            {content.quickAnswer}
          </p>
        </aside>
      </div>
    </section>
  );
}
