import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog7/en.json";
import de from "@/data/blogs/blog7/de.json";
import fr from "@/data/blogs/blog7/fr.json";
import it from "@/data/blogs/blog7/it.json";
import nl from "@/data/blogs/blog7/nl.json";
import es from "@/data/blogs/blog7/es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type Blog7PageData = typeof en;

const byLocale: Record<Locale, Blog7PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getBlog7Data(locale: Locale = "en"): Blog7PageData {
  return localized[locale] ?? localized.en;
}

export const BLOG7_SLUG = "igi-diamond-certification";
export const BLOG7_PATH = `/blogs/${BLOG7_SLUG}`;
