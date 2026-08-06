import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/where-to-sell-diamond-ring.json";
import de from "@/data/resources/where-to-sell-diamond-ring.de.json";
import fr from "@/data/resources/where-to-sell-diamond-ring.fr.json";
import it from "@/data/resources/where-to-sell-diamond-ring.it.json";
import nl from "@/data/resources/where-to-sell-diamond-ring.nl.json";
import es from "@/data/resources/where-to-sell-diamond-ring.es.json";

export type WhereToSellDiamondRingPageData = typeof en;

const byLocale: Record<Locale, WhereToSellDiamondRingPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getWhereToSellDiamondRingData(locale: Locale = "en"): WhereToSellDiamondRingPageData {
  return byLocale[locale] ?? en;
}
