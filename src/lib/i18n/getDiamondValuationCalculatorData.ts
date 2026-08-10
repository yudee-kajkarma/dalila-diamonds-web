import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-valuation-calculator.json";
import de from "@/data/resources/diamond-valuation-calculator.de.json";
import fr from "@/data/resources/diamond-valuation-calculator.fr.json";
import it from "@/data/resources/diamond-valuation-calculator.it.json";
import nl from "@/data/resources/diamond-valuation-calculator.nl.json";
import es from "@/data/resources/diamond-valuation-calculator.es.json";
import { withS3Assets } from "@/lib/s3Assets";

export type DiamondValuationCalculatorPageData = typeof en;

const byLocale: Record<Locale, DiamondValuationCalculatorPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

// Static JSON holds absolute S3 URLs; rebase them onto NEXT_PUBLIC_S3_BASE_URL once.
const localized = withS3Assets(byLocale);

export function getDiamondValuationCalculatorData(locale: Locale = "en"): DiamondValuationCalculatorPageData {
  return localized[locale] ?? localized.en;
}
