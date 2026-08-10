import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-fluorescence-guide.json";
import de from "@/data/resources/diamond-fluorescence-guide.de.json";
import fr from "@/data/resources/diamond-fluorescence-guide.fr.json";
import it from "@/data/resources/diamond-fluorescence-guide.it.json";
import nl from "@/data/resources/diamond-fluorescence-guide.nl.json";
import es from "@/data/resources/diamond-fluorescence-guide.es.json";

export type FluorescenceGuidePageData = typeof en;

const byLocale: Record<Locale, FluorescenceGuidePageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getFluorescenceGuideData(locale: Locale = "en"): FluorescenceGuidePageData {
  return byLocale[locale] ?? en;
}
