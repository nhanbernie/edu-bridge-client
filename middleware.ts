import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./src/i18n/config";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Check if pathname already has a locale
  const hasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) {
    // Validate that the locale is supported
    const currentLocale = pathname.split("/")[1];
    if (SUPPORTED_LOCALES.includes(currentLocale as any)) {
      return NextResponse.next();
    } else {
      // Invalid locale, redirect to default
      const url = req.nextUrl.clone();
      url.pathname = `/${DEFAULT_LOCALE}${pathname.replace(`/${currentLocale}`, "")}`;
      return NextResponse.redirect(url);
    }
  }

  // Redirect to default locale
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Match all pathnames except:
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /favicon.ico, /robots.txt, etc. (static files)
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};
