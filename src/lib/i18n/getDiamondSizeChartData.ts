import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-size-chart.json";
import de from "@/data/resources/diamond-size-chart.de.json";
import fr from "@/data/resources/diamond-size-chart.fr.json";
import it from "@/data/resources/diamond-size-chart.it.json";
import nl from "@/data/resources/diamond-size-chart.nl.json";
import es from "@/data/resources/diamond-size-chart.es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type DiamondSizeChartPageData = typeof en;

const byLocale: Record<Locale, DiamondSizeChartPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getDiamondSizeChartData(locale: Locale = "en"): DiamondSizeChartPageData {
  return localized[locale] ?? localized.en;
}
