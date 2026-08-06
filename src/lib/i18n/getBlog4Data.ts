import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog4/en.json";
import de from "@/data/blogs/blog4/de.json";
import fr from "@/data/blogs/blog4/fr.json";
import it from "@/data/blogs/blog4/it.json";
import nl from "@/data/blogs/blog4/nl.json";
import es from "@/data/blogs/blog4/es.json";

export type Blog4PageData = typeof en;

const byLocale: Record<Locale, Blog4PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getBlog4Data(locale: Locale = "en"): Blog4PageData {
  return byLocale[locale] ?? en;
}

export const BLOG4_SLUG = "fancy-shaped-diamond-cut-quality";
export const BLOG4_PATH = `/blogs/${BLOG4_SLUG}`;
