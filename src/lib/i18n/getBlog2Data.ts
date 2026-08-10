import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog2/en.json";
import de from "@/data/blogs/blog2/de.json";
import fr from "@/data/blogs/blog2/fr.json";
import it from "@/data/blogs/blog2/it.json";
import nl from "@/data/blogs/blog2/nl.json";
import es from "@/data/blogs/blog2/es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type Blog2PageData = typeof en;

const byLocale: Record<Locale, Blog2PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getBlog2Data(locale: Locale = "en"): Blog2PageData {
  return localized[locale] ?? localized.en;
}

export const BLOG2_SLUG = "vs1-vs-vs2-diamond-clarity";
export const BLOG2_PATH = `/blogs/${BLOG2_SLUG}`;
