import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog1/en.json";
import de from "@/data/blogs/blog1/de.json";
import fr from "@/data/blogs/blog1/fr.json";
import it from "@/data/blogs/blog1/it.json";
import nl from "@/data/blogs/blog1/nl.json";
import es from "@/data/blogs/blog1/es.json";

export type Blog1PageData = typeof en;

const byLocale: Record<Locale, Blog1PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getBlog1Data(locale: Locale = "en"): Blog1PageData {
  return byLocale[locale] ?? en;
}

export const BLOG1_SLUG = "most-expensive-diamond-shapes";
export const BLOG1_PATH = `/blogs/${BLOG1_SLUG}`;
