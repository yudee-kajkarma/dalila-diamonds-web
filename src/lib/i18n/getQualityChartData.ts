import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-quality-chart.json";
import de from "@/data/resources/diamond-quality-chart.de.json";
import fr from "@/data/resources/diamond-quality-chart.fr.json";
import it from "@/data/resources/diamond-quality-chart.it.json";
import nl from "@/data/resources/diamond-quality-chart.nl.json";
import es from "@/data/resources/diamond-quality-chart.es.json";

export type QualityChartPageData = typeof en;

const byLocale: Record<Locale, QualityChartPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getQualityChartData(locale: Locale = "en"): QualityChartPageData {
  return byLocale[locale] ?? en;
}
