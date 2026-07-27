import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, Locale } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static files, api routes, next internal files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/dalila_img") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with any non-default locale (e.g. /de, /fr, /it, /nl, /es)
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0] as Locale;

  let locale: Locale = DEFAULT_LOCALE;
  if (LOCALES.includes(firstSegment) && firstSegment !== DEFAULT_LOCALE) {
    locale = firstSegment;
  }

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static resources
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
