import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-culet-guide.json";
import de from "@/data/resources/diamond-culet-guide.de.json";
import fr from "@/data/resources/diamond-culet-guide.fr.json";
import it from "@/data/resources/diamond-culet-guide.it.json";
import nl from "@/data/resources/diamond-culet-guide.nl.json";
import es from "@/data/resources/diamond-culet-guide.es.json";

export type CuletGuidePageData = typeof en;

const byLocale: Record<Locale, CuletGuidePageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getCuletGuideData(locale: Locale = "en"): CuletGuidePageData {
  return byLocale[locale] ?? en;
}
