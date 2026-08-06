import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-size-chart.json";
import de from "@/data/resources/diamond-size-chart.de.json";
import fr from "@/data/resources/diamond-size-chart.fr.json";
import it from "@/data/resources/diamond-size-chart.it.json";
import nl from "@/data/resources/diamond-size-chart.nl.json";
import es from "@/data/resources/diamond-size-chart.es.json";

export type DiamondSizeChartPageData = typeof en;

const byLocale: Record<Locale, DiamondSizeChartPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getDiamondSizeChartData(locale: Locale = "en"): DiamondSizeChartPageData {
  return byLocale[locale] ?? en;
}
