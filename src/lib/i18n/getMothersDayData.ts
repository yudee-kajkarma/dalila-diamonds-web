import type { Locale } from "@/lib/i18n/config";
import en from "@/data/event/antwerp-mothers-day-diamond-gifts.json";
import de from "@/data/event/antwerp-mothers-day-diamond-gifts.de.json";
import fr from "@/data/event/antwerp-mothers-day-diamond-gifts.fr.json";
import it from "@/data/event/antwerp-mothers-day-diamond-gifts.it.json";
import nl from "@/data/event/antwerp-mothers-day-diamond-gifts.nl.json";
import es from "@/data/event/antwerp-mothers-day-diamond-gifts.es.json";

export type MothersDayPageData = typeof en;

const byLocale: Record<Locale, MothersDayPageData> = {
  en,
  de: de as unknown as MothersDayPageData,
  fr: fr as unknown as MothersDayPageData,
  it: it as unknown as MothersDayPageData,
  nl: nl as unknown as MothersDayPageData,
  es: es as unknown as MothersDayPageData,
};

export function getMothersDayData(locale: Locale = "en"): MothersDayPageData {
  return byLocale[locale] ?? byLocale.en;
}
