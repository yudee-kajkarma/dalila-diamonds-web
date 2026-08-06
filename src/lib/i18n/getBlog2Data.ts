import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog2/en.json";
import de from "@/data/blogs/blog2/de.json";
import fr from "@/data/blogs/blog2/fr.json";
import it from "@/data/blogs/blog2/it.json";
import nl from "@/data/blogs/blog2/nl.json";
import es from "@/data/blogs/blog2/es.json";

export type Blog2PageData = typeof en;

const byLocale: Record<Locale, Blog2PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getBlog2Data(locale: Locale = "en"): Blog2PageData {
  return byLocale[locale] ?? en;
}

export const BLOG2_SLUG = "vs1-vs-vs2-diamond-clarity";
export const BLOG2_PATH = `/blogs/${BLOG2_SLUG}`;
