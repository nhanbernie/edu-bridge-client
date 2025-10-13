"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export const useLocaleRouter = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const getCurrentLocale = () => {
    const segments = pathname.split("/");
    return segments[1] || "en"; // Default to 'en' if no locale found
  };

  // Navigate with current locale
  const push = useCallback(
    (path: string) => {
      const locale = getCurrentLocale();
      const newPath = path.startsWith("/") ? path : `/${path}`;
      router.push(`/${locale}${newPath}`);
    },
    [router, pathname, getCurrentLocale]
  );

  // Navigate to specific locale
  const pushWithLocale = useCallback(
    (path: string, locale?: string) => {
      const targetLocale = locale || getCurrentLocale();
      const newPath = path.startsWith("/") ? path : `/${path}`;
      router.push(`/${targetLocale}${newPath}`);
    },
    [router, pathname, getCurrentLocale]
  );

  return {
    push,
    pushWithLocale,
    getCurrentLocale,
  };
};
