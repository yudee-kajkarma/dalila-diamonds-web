import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-quality-chart.json";
import de from "@/data/resources/diamond-quality-chart.de.json";
import fr from "@/data/resources/diamond-quality-chart.fr.json";
import it from "@/data/resources/diamond-quality-chart.it.json";
import nl from "@/data/resources/diamond-quality-chart.nl.json";
import es from "@/data/resources/diamond-quality-chart.es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type QualityChartPageData = typeof en;

const byLocale: Record<Locale, any> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getQualityChartData(locale: Locale = "en"): any {
  return localized[locale] ?? localized.en;
}
