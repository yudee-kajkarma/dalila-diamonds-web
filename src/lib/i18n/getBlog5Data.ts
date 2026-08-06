import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog5/en.json";
import de from "@/data/blogs/blog5/de.json";
import fr from "@/data/blogs/blog5/fr.json";
import it from "@/data/blogs/blog5/it.json";
import nl from "@/data/blogs/blog5/nl.json";
import es from "@/data/blogs/blog5/es.json";

export type Blog5PageData = typeof en;

const byLocale: Record<Locale, Blog5PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getBlog5Data(locale: Locale = "en"): Blog5PageData {
  return byLocale[locale] ?? en;
}

export const BLOG5_SLUG = "cushion-cut-diamond";
export const BLOG5_PATH = `/blogs/${BLOG5_SLUG}`;
