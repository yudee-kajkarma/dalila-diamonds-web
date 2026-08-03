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

interface S2sFinalCtaProps {
  content: S2sContent["finalCta"];
  locale?: Locale;
}

export default function S2sFinalCta({ content, locale = "en" }: S2sFinalCtaProps) {
  const localizedPath = (path: string) => getLocalizedPath(path, locale);
  const href = localizedPath(content.buttonHref);

  return (
    <section className="bg-white py-16 md:py-20" aria-labelledby="s2s-final-cta-heading">
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        <h2
          id="s2s-final-cta-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal mb-5 text-gray-900 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>
        <p className={`text-gray-700 text-base md:text-lg mb-8 ${jost.className}`}>{content.text}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href={href}
            className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-9 py-3.5 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${jost.className}`}
          >
            {content.primaryButtonText}
          </Link>
          <Link
            href={href}
            className={`inline-flex items-center justify-center border border-[#c89e3a] text-[#8a7028] hover:bg-[#faf6eb] font-medium px-9 py-3.5 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase ${jost.className}`}
          >
            {content.secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
