import type { Locale } from "@/lib/i18n/config";
import en from "@/data/wholesale/page8/en.json";
import de from "@/data/wholesale/page8/de.json";
import fr from "@/data/wholesale/page8/fr.json";
import it from "@/data/wholesale/page8/it.json";
import nl from "@/data/wholesale/page8/nl.json";
import es from "@/data/wholesale/page8/es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type WholesaleLooseDiamondsPageData = typeof en;

const byLocale: Record<Locale, WholesaleLooseDiamondsPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getWholesaleLooseDiamondsData(
  locale: Locale = "en",
): WholesaleLooseDiamondsPageData {
  return localized[locale] ?? localized.en;
}

export const WHOLESALE_LOOSE_SLUG = "buy-wholesale-diamonds-online";
export const WHOLESALE_LOOSE_PATH = `/wholesale/${WHOLESALE_LOOSE_SLUG}`;
