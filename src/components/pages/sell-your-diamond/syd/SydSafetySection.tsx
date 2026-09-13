import { marcellus, jost } from "@/lib/fonts";
import type { SydSafetyBlock } from "@/lib/i18n/sydTranslations";

interface SydSafetySectionProps {
  content: {
    id: string;
    title: string;
    intro: string[];
    blocks: SydSafetyBlock[];
  };
  variant?: "white" | "gray";
}

export default function SydSafetySection({ content, variant = "white" }: SydSafetySectionProps) {
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

        <div
          className={`space-y-5 text-gray-700 text-[15px] md:text-base leading-relaxed max-w-4xl ${jost.className}`}
        >
          {content.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {content.blocks.map((block) => (
            <div key={block.title}>
              <h3
                className={`text-xl md:text-2xl font-normal text-gray-900 mb-4 ${marcellus.className}`}
              >
                {block.title}
              </h3>

              <div
                className={`space-y-5 text-gray-700 text-[15px] md:text-base leading-relaxed max-w-4xl ${jost.className}`}
              >
                {block.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>

              {block.items.length > 0 ? (
                <ul className={`mt-5 space-y-3 ${jost.className}`} role="list">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-800 text-[15px] md:text-base leading-relaxed"
                    >
                      <span className="text-[#c89e3a] font-bold shrink-0 mt-0.5" aria-hidden="true">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {block.closing.length > 0 ? (
                <div
                  className={`mt-6 space-y-5 text-gray-700 text-[15px] md:text-base leading-relaxed max-w-4xl ${jost.className}`}
                >
                  {block.closing.map((paragraph, index) => (
                    <p key={index}>
                      {paragraph.map((part, partIndex) =>
                        part.href ? (
                          <a
                            key={partIndex}
                            href={part.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1a1a1a] underline underline-offset-2 hover:text-[#c89e3a]"
                          >
                            {part.text}
                          </a>
                        ) : (
                          <span key={partIndex}>{part.text}</span>
                        ),
                      )}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
