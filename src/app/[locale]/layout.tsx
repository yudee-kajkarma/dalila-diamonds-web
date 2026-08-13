import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, Locale } from "@/lib/i18n/config";

// Prebuild every route under [locale] for the non-default locales so they are
// served from the CDN instead of per-request SSR. English lives at the
// unprefixed root routes; /en/* is redirected there in next.config.ts.
export function generateStaticParams() {
    return LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map(
        (locale) => ({ locale }),
    );
}

// NOTE: dynamicParams=false would 404 unknown locales at the router, but in
// Next 15.5 it cascades to the nested [slug] segment and cannot be overridden
// there — it would 404 every on-demand localized blog article. The runtime
// guard below handles invalid locales instead: each unknown first segment
// (scanner probes, typos like /wp-login.php) renders notFound() once —
// cheaply, with no data fetches — and the 404 response is then cached.

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (
        !LOCALES.includes(locale as Locale) ||
        locale === DEFAULT_LOCALE
    ) {
        notFound();
    }
    return children;
}
