import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog7/en.json";
import de from "@/data/blogs/blog7/de.json";
import fr from "@/data/blogs/blog7/fr.json";
import it from "@/data/blogs/blog7/it.json";
import nl from "@/data/blogs/blog7/nl.json";
import es from "@/data/blogs/blog7/es.json";

export type Blog7PageData = typeof en;

const byLocale: Record<Locale, Blog7PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getBlog7Data(locale: Locale = "en"): Blog7PageData {
  return byLocale[locale] ?? en;
}

export const BLOG7_SLUG = "igi-diamond-certification";
export const BLOG7_PATH = `/blogs/${BLOG7_SLUG}`;
