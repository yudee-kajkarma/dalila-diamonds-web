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

interface Ds4uWhatIsProps {
  content: Ds4uContent["whatIs"];
}

export default function Ds4uWhatIs({ content }: Ds4uWhatIsProps) {
  return (
    <section
      id={content.id}
      className="bg-white py-12 md:py-16"
      aria-labelledby="ds4u-what-is-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id="ds4u-what-is-heading"
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-8 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>

        <div className={`space-y-5 text-gray-700 text-[15px] md:text-base leading-relaxed ${jost.className}`}>
          <p>{content.paragraphs[0]}</p>
          <p>
            Instead of spending time comparing hundreds of loosely related listings, you can submit
            one detailed sourcing brief. Dalila will then look for available natural diamonds that meet
            the most important parts of that brief. The search can extend beyond the diamonds currently
            shown in Dalila’s{" "}
            <Link href="/inventory" className="text-[#8a7028] underline hover:text-[#c89e3a]">
              certified diamond inventory
            </Link>
            .
          </p>
          {content.paragraphs.slice(2).map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
