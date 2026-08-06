import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog3/en.json";
import de from "@/data/blogs/blog3/de.json";
import fr from "@/data/blogs/blog3/fr.json";
import it from "@/data/blogs/blog3/it.json";
import nl from "@/data/blogs/blog3/nl.json";
import es from "@/data/blogs/blog3/es.json";

export type Blog3PageData = typeof en;

const byLocale: Record<Locale, Blog3PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getBlog3Data(locale: Locale = "en"): Blog3PageData {
  return byLocale[locale] ?? en;
}

export const BLOG3_SLUG = "best-diamond-colour-clarity-combination";
export const BLOG3_PATH = `/blogs/${BLOG3_SLUG}`;
