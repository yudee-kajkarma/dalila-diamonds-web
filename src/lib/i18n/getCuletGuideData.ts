import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-culet-guide.json";
import de from "@/data/resources/diamond-culet-guide.de.json";
import fr from "@/data/resources/diamond-culet-guide.fr.json";
import it from "@/data/resources/diamond-culet-guide.it.json";
import nl from "@/data/resources/diamond-culet-guide.nl.json";
import es from "@/data/resources/diamond-culet-guide.es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type CuletGuidePageData = typeof en;

const byLocale: Record<Locale, CuletGuidePageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getCuletGuideData(locale: Locale = "en"): CuletGuidePageData {
  return localized[locale] ?? localized.en;
}
