import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/where-to-sell-diamond-ring.json";
import de from "@/data/resources/where-to-sell-diamond-ring.de.json";
import fr from "@/data/resources/where-to-sell-diamond-ring.fr.json";
import it from "@/data/resources/where-to-sell-diamond-ring.it.json";
import nl from "@/data/resources/where-to-sell-diamond-ring.nl.json";
import es from "@/data/resources/where-to-sell-diamond-ring.es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type WhereToSellDiamondRingPageData = typeof en;

const byLocale: Record<Locale, WhereToSellDiamondRingPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getWhereToSellDiamondRingData(locale: Locale = "en"): WhereToSellDiamondRingPageData {
  return localized[locale] ?? localized.en;
}
