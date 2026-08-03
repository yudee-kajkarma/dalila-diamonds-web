import Link from "next/link";
import { getLocalizedPath, Locale } from "@/lib/i18n/config";
import { jost } from "./gradingReportFonts";

export type GradingReportRichSegment =
  | { type: "text"; value: string }
  | { type: "link"; text: string; href: string; external?: boolean };

interface RichParagraphProps {
  segments: GradingReportRichSegment[];
  className?: string;
  locale?: Locale;
}

export function RichParagraph({ segments, className = "", locale = "en" }: RichParagraphProps) {
  const localizedPath = (path: string) => getLocalizedPath(path, locale);

  return (
    <p className={`${className} ${jost.className}`.trim()}>
      {segments.map((segment, index) => {
        if (segment.type === "text") {
          return <span key={index}>{segment.value}</span>;
        }

        if (segment.external) {
          return (
            <a
              key={index}
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c89e3a] hover:underline font-medium"
            >
              {segment.text}
            </a>
          );
        }

        return (
          <Link key={index} href={localizedPath(segment.href)} className="text-[#c89e3a] hover:underline font-medium">
            {segment.text}
          </Link>
        );
      })}
    </p>
  );
}

interface RichParagraphListProps {
  paragraphs: GradingReportRichSegment[][];
  className?: string;
  locale?: Locale;
}

export function RichParagraphList({ paragraphs, className = "", locale = "en" }: RichParagraphListProps) {
  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <>
      {paragraphs.map((segments, index) => (
        <RichParagraph
          key={index}
          segments={segments}
          locale={locale}
          className={`leading-relaxed mb-4 ${className}`}
        />
      ))}
    </>
  );
}

export function SemanticBulletList({ items, className = "" }: { items: string[]; className?: string }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={`list-disc pl-6 space-y-2 mb-6 text-gray-700 ${jost.className} ${className}`.trim()}>
      {items.map((item) => (
        <li key={item.slice(0, 48)} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function SemanticOrderedList({ items, className = "" }: { items: string[]; className?: string }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ol className={`list-decimal pl-6 space-y-2 mb-6 text-gray-700 ${jost.className} ${className}`.trim()}>
      {items.map((item) => (
        <li key={item.slice(0, 48)} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ol>
  );
}
