import type { Locale } from "@/lib/i18n/config";
import en from "@/data/diamonds/page10/en.json";
import de from "@/data/diamonds/page10/de.json";
import fr from "@/data/diamonds/page10/fr.json";
import it from "@/data/diamonds/page10/it.json";
import nl from "@/data/diamonds/page10/nl.json";
import es from "@/data/diamonds/page10/es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type NaturalRoughDiamondsPageData = typeof en;

const byLocale: Record<Locale, NaturalRoughDiamondsPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getNaturalRoughDiamondsData(
  locale: Locale = "en",
): NaturalRoughDiamondsPageData {
  return localized[locale] ?? localized.en;
}

export const NATURAL_ROUGH_SLUG = "natural-rough-diamonds";
export const NATURAL_ROUGH_PATH = `/diamonds/${NATURAL_ROUGH_SLUG}`;
