import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog6/en.json";
import de from "@/data/blogs/blog6/de.json";
import fr from "@/data/blogs/blog6/fr.json";
import it from "@/data/blogs/blog6/it.json";
import nl from "@/data/blogs/blog6/nl.json";
import es from "@/data/blogs/blog6/es.json";

export type Blog6PageData = typeof en;

const byLocale: Record<Locale, Blog6PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getBlog6Data(locale: Locale = "en"): Blog6PageData {
  return byLocale[locale] ?? en;
}

export const BLOG6_SLUG = "diamond-bow-tie-effect";
export const BLOG6_PATH = `/blogs/${BLOG6_SLUG}`;
