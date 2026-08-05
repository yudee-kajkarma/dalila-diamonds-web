import type { Locale } from "@/lib/i18n/config";
import en from "@/data/resources/diamond-girdle-guide.json";
import de from "@/data/resources/diamond-girdle-guide.de.json";
import fr from "@/data/resources/diamond-girdle-guide.fr.json";
import it from "@/data/resources/diamond-girdle-guide.it.json";
import nl from "@/data/resources/diamond-girdle-guide.nl.json";
import es from "@/data/resources/diamond-girdle-guide.es.json";

export type GirdleGuidePageData = typeof en;

const byLocale: Record<Locale, GirdleGuidePageData> = {
  en,
  de,
  fr,
  it,
  nl,
  es,
};

export function getGirdleGuideData(locale: Locale = "en"): GirdleGuidePageData {
  return byLocale[locale] ?? en;
}
