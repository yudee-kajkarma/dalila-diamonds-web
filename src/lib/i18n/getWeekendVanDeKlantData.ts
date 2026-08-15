import type { Locale } from "@/lib/i18n/config";
import en from "@/data/event/weekend-van-de-klant-antwerp-diamond-appointments.json";
import de from "@/data/event/weekend-van-de-klant-antwerp-diamond-appointments.de.json";
import fr from "@/data/event/weekend-van-de-klant-antwerp-diamond-appointments.fr.json";
import it from "@/data/event/weekend-van-de-klant-antwerp-diamond-appointments.it.json";
import nl from "@/data/event/weekend-van-de-klant-antwerp-diamond-appointments.nl.json";
import es from "@/data/event/weekend-van-de-klant-antwerp-diamond-appointments.es.json";

export type WeekendVanDeKlantPageData = typeof en;

const byLocale: Record<Locale, WeekendVanDeKlantPageData> = {
  en,
  de: de as unknown as WeekendVanDeKlantPageData,
  fr: fr as unknown as WeekendVanDeKlantPageData,
  it: it as unknown as WeekendVanDeKlantPageData,
  nl: nl as unknown as WeekendVanDeKlantPageData,
  es: es as unknown as WeekendVanDeKlantPageData,
};

export function getWeekendVanDeKlantData(
  locale: Locale = "en"
): WeekendVanDeKlantPageData {
  return byLocale[locale] ?? byLocale.en;
}
