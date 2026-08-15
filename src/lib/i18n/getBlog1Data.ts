import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog1/en.json";
import de from "@/data/blogs/blog1/de.json";
import fr from "@/data/blogs/blog1/fr.json";
import it from "@/data/blogs/blog1/it.json";
import nl from "@/data/blogs/blog1/nl.json";
import es from "@/data/blogs/blog1/es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type Blog1PageData = typeof en;

const byLocale: Record<Locale, Blog1PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getBlog1Data(locale: Locale = "en"): Blog1PageData {
  return localized[locale] ?? localized.en;
}

export const BLOG1_SLUG = "most-expensive-diamond-shapes";
export const BLOG1_PATH = `/blogs/${BLOG1_SLUG}`;
