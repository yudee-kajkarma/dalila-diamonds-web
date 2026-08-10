import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-valuation-calculator.json";
import de from "@/data/resources/diamond-valuation-calculator.de.json";
import fr from "@/data/resources/diamond-valuation-calculator.fr.json";
import it from "@/data/resources/diamond-valuation-calculator.it.json";
import nl from "@/data/resources/diamond-valuation-calculator.nl.json";
import es from "@/data/resources/diamond-valuation-calculator.es.json";

export type DiamondValuationCalculatorPageData = typeof en;

const byLocale: Record<Locale, DiamondValuationCalculatorPageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getDiamondValuationCalculatorData(locale: Locale = "en"): DiamondValuationCalculatorPageData {
  return byLocale[locale] ?? en;
}
