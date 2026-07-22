export type Locale = "en" | "de" | "fr" | "it" | "nl" | "es";

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: Locale[] = ["en", "de", "fr", "it", "nl", "es"];

export interface LanguageOption {
  code: Locale;
  label: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", label: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "de", label: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "nl", label: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "es", label: "Spanish", nativeName: "Español", flag: "🇪🇸" },
];

/**
  Extracts locale from path if present (e.g., /de/aboutUs -> "de").
  Returns DEFAULT_LOCALE ("en") if no prefix is present.
 */
export function getLocaleFromPath(pathname: string): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] as Locale;
  if (LOCALES.includes(firstSegment) && firstSegment !== DEFAULT_LOCALE) {
    return firstSegment;
  }
  return DEFAULT_LOCALE;
}

/**
  Strips locale prefix from pathname if present (e.g. /de/aboutUs -> /aboutUs).
 */
export function getCleanPath(pathname: string): string {
  if (!pathname) return "/";
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] as Locale;
  if (LOCALES.includes(firstSegment) && firstSegment !== DEFAULT_LOCALE) {
    const cleanSegments = segments.slice(1);
    return "/" + cleanSegments.join("/");
  }
  return pathname;
}

/**
  Generates localized URL path.
  English ("en"): /aboutUs (no prefix)
  Non-English ("de"): /de/aboutUs
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const cleanPath = getCleanPath(pathname);
  if (targetLocale === DEFAULT_LOCALE) {
    return cleanPath === "" ? "/" : cleanPath;
  }
  const suffix = cleanPath === "/" ? "" : cleanPath;
  return `/${targetLocale}${suffix}`;
}
