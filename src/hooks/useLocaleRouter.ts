"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/i18n/config";

export const useLocaleRouter = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname with validation
  const getCurrentLocale = useCallback(() => {
    const segments = pathname.split("/");
    const locale = segments[1];

    // Validate locale is supported
    if (locale && SUPPORTED_LOCALES.includes(locale as any)) {
      return locale;
    }

    // Fallback to default locale
    return DEFAULT_LOCALE;
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
