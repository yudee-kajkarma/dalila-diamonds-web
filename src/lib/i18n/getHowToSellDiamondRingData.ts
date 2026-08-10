import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/how-to-sell-diamond-ring.json";
import de from "@/data/resources/how-to-sell-diamond-ring.de.json";
import fr from "@/data/resources/how-to-sell-diamond-ring.fr.json";
import it from "@/data/resources/how-to-sell-diamond-ring.it.json";
import nl from "@/data/resources/how-to-sell-diamond-ring.nl.json";
import es from "@/data/resources/how-to-sell-diamond-ring.es.json";

export type HowToSellDiamondRingPageData = typeof en;

const byLocale: Record<Locale, HowToSellDiamondRingPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getHowToSellDiamondRingData(locale: Locale = "en"): HowToSellDiamondRingPageData {
  return byLocale[locale] ?? en;
}
