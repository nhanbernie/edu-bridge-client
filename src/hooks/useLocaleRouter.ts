"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useRef } from "react";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/i18n/config";

export const useLocaleRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const localeCache = useRef<{ pathname: string; locale: string } | null>(null);

  // Extract current locale from pathname with validation (cached)
  const getCurrentLocale = useCallback(() => {
    // Return cached result if pathname hasn't changed
    if (localeCache.current && localeCache.current.pathname === pathname) {
      return localeCache.current.locale;
    }

    const segments = pathname.split("/");
    const locale = segments[1];

    // Validate locale is supported
    const result = locale && SUPPORTED_LOCALES.includes(locale as any) ? locale : DEFAULT_LOCALE;

    // Cache the result
    localeCache.current = { pathname, locale: result };
    return result;
  }, [pathname]);

  // Navigate with current locale (validated)
  const push = useCallback(
    (path: string) => {
      const locale = getCurrentLocale();
      const newPath = path.startsWith("/") ? path : `/${path}`;

      // Ensure locale is valid before navigation
      const validLocale = SUPPORTED_LOCALES.includes(locale as any) ? locale : DEFAULT_LOCALE;
      router.push(`/${validLocale}${newPath}`);
    },
    [router, getCurrentLocale]
  );

  // Navigate to specific locale (with validation)
  const pushWithLocale = useCallback(
    (path: string, targetLocale?: string) => {
      const locale = targetLocale || getCurrentLocale();
      const newPath = path.startsWith("/") ? path : `/${path}`;

      // Validate target locale
      const validLocale = SUPPORTED_LOCALES.includes(locale as any) ? locale : DEFAULT_LOCALE;
      router.push(`/${validLocale}${newPath}`);
    },
    [router, getCurrentLocale]
  );

  return {
    push,
    pushWithLocale,
    getCurrentLocale,
  };
};
