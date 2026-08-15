import type { Locale } from "@/lib/i18n/config";
import en from "@/data/blogs/blog4/en.json";
import de from "@/data/blogs/blog4/de.json";
import fr from "@/data/blogs/blog4/fr.json";
import it from "@/data/blogs/blog4/it.json";
import nl from "@/data/blogs/blog4/nl.json";
import es from "@/data/blogs/blog4/es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type Blog4PageData = typeof en;

const byLocale: Record<Locale, Blog4PageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getBlog4Data(locale: Locale = "en"): Blog4PageData {
  return localized[locale] ?? localized.en;
}

export const BLOG4_SLUG = "fancy-shaped-diamond-cut-quality";
export const BLOG4_PATH = `/blogs/${BLOG4_SLUG}`;
