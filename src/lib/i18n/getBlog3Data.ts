import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog3/en.json";
import de from "@/data/blogs/blog3/de.json";
import fr from "@/data/blogs/blog3/fr.json";
import it from "@/data/blogs/blog3/it.json";
import nl from "@/data/blogs/blog3/nl.json";
import es from "@/data/blogs/blog3/es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type Blog3PageData = typeof en;

const byLocale: Record<Locale, Blog3PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getBlog3Data(locale: Locale = "en"): Blog3PageData {
  return localized[locale] ?? localized.en;
}

export const BLOG3_SLUG = "best-diamond-colour-clarity-combination";
export const BLOG3_PATH = `/blogs/${BLOG3_SLUG}`;
