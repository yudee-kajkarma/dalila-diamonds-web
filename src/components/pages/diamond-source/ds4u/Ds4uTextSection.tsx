import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

interface Ds4uTextSectionProps {
  content: {
    id: string;
    title: string;
    paragraphs: string[];
  };
  variant?: "white" | "gray";
  linkMode?: "certification" | "pricing" | "antwerp" | "none";
}

export default function Ds4uTextSection({
  content,
  variant = "white",
  linkMode = "none",
}: Ds4uTextSectionProps) {
  const bg = variant === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <section
      id={content.id}
      className={`${bg} py-12 md:py-16`}
      aria-labelledby={`${content.id}-heading`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
        <h2
          id={`${content.id}-heading`}
          className={`text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-8 tracking-tight ${marcellus.className}`}
        >
          {content.title}
        </h2>

        <div className={`space-y-5 text-gray-700 text-[15px] md:text-base leading-relaxed max-w-4xl ${jost.className}`}>
          {content.paragraphs.map((paragraph) => {
            if (linkMode === "certification" && paragraph.includes("reading a GIA diamond report")) {
              return (
                <p key={paragraph.slice(0, 40)}>
                  Before approving a sourced diamond, review the report number, carat weight,
                  measurements, colour, clarity, fluorescence, comments and inscription details where
                  applicable. Dalila’s guide to{" "}
                  <Link
                    href="/blogs/how-to-read-gia-diamond-certificate"
                    className="text-[#8a7028] underline hover:text-[#c89e3a]"
                  >
                    reading a GIA diamond report
                  </Link>{" "}
                  explains the main sections buyers should examine.
                </p>
              );
            }

            if (linkMode === "pricing" && paragraph.includes("diamond price guide")) {
              return (
                <p key={paragraph.slice(0, 40)}>
                  Dalila’s{" "}
                  <Link
                    href="/blogs/diamond-price-guide"
                    className="text-[#8a7028] underline hover:text-[#c89e3a]"
                  >
                    diamond price guide
                  </Link>{" "}
                  can help you understand the principal factors influencing natural-diamond pricing.
                  The price of the actual sourced diamond must still be confirmed through a dated
                  written quotation.
                </p>
              );
            }

            if (linkMode === "antwerp" && paragraph.includes("Antwerp diamond sourcing")) {
              return (
                <p key={paragraph.slice(0, 40)}>
                  You can learn more about the distinction in Dalila’s guide to{" "}
                  <Link
                    href="/blogs/hatton-garden-vs-antwerp-diamonds"
                    className="text-[#8a7028] underline hover:text-[#c89e3a]"
                  >
                    Antwerp diamond sourcing
                  </Link>
                  .
                </p>
              );
            }

            return <p key={paragraph.slice(0, 48)}>{paragraph}</p>;
          })}
        </div>
      </div>
    </section>
  );
}
