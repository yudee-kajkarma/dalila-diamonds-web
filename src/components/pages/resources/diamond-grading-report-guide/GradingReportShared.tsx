import type { ReactNode } from "react";
import type { GradingReportTable } from "@/lib/i18n/diamondGradingReportGuideTranslations";
import { Locale } from "@/lib/i18n/config";
import { jost, marcellus } from "./gradingReportFonts";
import {
  GradingReportRichSegment,
  RichParagraphList,
  SemanticBulletList,
  SemanticOrderedList,
} from "./gradingReportRichText";

interface SectionShellProps {
  id?: string;
  title: string;
  headingLevel?: 2 | 3 | 4;
  paragraphs?: string[];
  paragraphsBefore?: string[];
  paragraphsAfter?: string[];
  richParagraphs?: GradingReportRichSegment[][];
  bullets?: string[];
  numberedSteps?: string[];
  table?: GradingReportTable;
  children?: ReactNode;
  className?: string;
  locale?: Locale;
}

function PlainParagraphs({ items, className = "" }: { items: string[]; className?: string }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {items.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className={`text-gray-700 leading-relaxed mb-4 ${jost.className} ${className}`.trim()}>
          {paragraph}
        </p>
      ))}
    </>
  );
}

export function SectionShell({
  id,
  title,
  headingLevel = 2,
  paragraphs = [],
  paragraphsBefore = [],
  paragraphsAfter = [],
  richParagraphs = [],
  bullets = [],
  numberedSteps = [],
  table,
  children,
  className = "",
  locale = "en",
}: SectionShellProps) {
  const HeadingTag = headingLevel === 4 ? "h4" : headingLevel === 3 ? "h3" : "h2";
  const headingClass =
    headingLevel === 4
      ? `text-lg md:text-xl font-normal text-gray-900 mb-3 ${marcellus.className}`
      : headingLevel === 3
        ? `text-xl md:text-2xl font-normal text-gray-900 mb-4 ${marcellus.className}`
        : `text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-gray-900 mb-6 tracking-tight ${marcellus.className}`;

  const before = paragraphsBefore.length > 0 ? paragraphsBefore : paragraphs;

  return (
    <section id={id} className={`scroll-mt-28 ${className}`} aria-labelledby={id ? `${id}-heading` : undefined}>
      {title ? (
        <>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full" />
          <HeadingTag id={id ? `${id}-heading` : undefined} className={headingClass}>
            {title}
          </HeadingTag>
        </>
      ) : null}

      <PlainParagraphs items={before} />
      <RichParagraphList paragraphs={richParagraphs} locale={locale} />
      <SemanticBulletList items={bullets} />
      <SemanticOrderedList items={numberedSteps} />
      {table && table.headers.length > 0 ? <DataTable table={table} /> : null}
      <PlainParagraphs items={paragraphsAfter} />

      {children}
    </section>
  );
}

export function Subheading({ children, level = 3 }: { children: string; level?: 3 | 4 }) {
  const Tag = level === 4 ? "h4" : "h3";
  const className =
    level === 4
      ? `text-lg md:text-xl font-normal text-gray-900 mb-3 mt-2 ${marcellus.className}`
      : `text-xl md:text-2xl font-normal text-gray-900 mb-4 mt-6 ${marcellus.className}`;

  return <Tag className={className}>{children}</Tag>;
}

export function DataTable({ table }: { table: GradingReportTable }) {
  if (table.headers.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto mb-6">
      <table className={`min-w-full border border-gray-200 text-left text-sm md:text-base ${jost.className}`}>
        {table.caption ? <caption className="sr-only">{table.caption}</caption> : null}
        <thead className="bg-slate-50">
          <tr>
            {table.headers.map((header) => (
              <th key={header} scope="col" className="border border-gray-200 px-4 py-3 font-semibold text-gray-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {table.rows.length > 0 ? (
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="even:bg-gray-50/60">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-gray-200 px-4 py-3 text-gray-700 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}
