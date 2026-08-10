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

interface S2sComparisonProps {
  content: S2sContent["comparison"];
  locale?: Locale;
}

function ComparisonColumn({
  column,
  locale,
}: {
  column: S2sContent["comparison"]["s2s"];
  locale: Locale;
}) {
  const localizedPath = (path: string) => getLocalizedPath(path, locale);

  return (
    <article className="bg-white border border-gray-200 p-6 md:p-8 h-full flex flex-col">
      <h3 className={`text-2xl md:text-3xl text-gray-900 mb-4 ${marcellus.className}`}>{column.title}</h3>
      <p className={`text-gray-700 text-base leading-relaxed mb-6 ${jost.className}`}>{column.intro}</p>
      <ul className={`space-y-3 mb-8 flex-1 ${jost.className}`}>
        {column.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-gray-700 text-sm md:text-base leading-relaxed">
            <span className="text-[#c89e3a] font-bold shrink-0" aria-hidden="true">
              •
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <Link
        href={localizedPath(column.buttonHref)}
        className={`inline-flex items-center justify-center bg-[#c89e3a] hover:bg-[#b38d2f] text-white font-medium px-8 py-3 transition-all duration-300 text-[13px] tracking-[0.08em] uppercase shadow-md hover:shadow-lg ${jost.className}`}
      >
        {column.buttonText}
      </Link>
    </article>
  );
}

export default function S2sComparison({ content, locale = "en" }: S2sComparisonProps) {
  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="s2s-comparison-heading">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="s2s-comparison-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-10 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <ComparisonColumn column={content.s2s} locale={locale} />
          <ComparisonColumn column={content.ds4u} locale={locale} />
        </div>
      </div>
    </section>
  );
}
