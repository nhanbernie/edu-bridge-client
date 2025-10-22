"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";

export const useLanguageToggle = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Get current locale from pathname
  const getCurrentLocale = useCallback((): Locale => {
    const segments = pathname.split("/");
    const locale = segments[1];
    return SUPPORTED_LOCALES.includes(locale as Locale) ? (locale as Locale) : "vi";
  }, [pathname]);

  // Toggle between supported locales
  const toggleLanguage = useCallback(() => {
    const currentLocale = getCurrentLocale();
    const nextLocale = currentLocale === "vi" ? "en" : "vi";

    // Replace locale in pathname
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const newPathname = segments.join("/");

    router.push(newPathname);
  }, [pathname, router, getCurrentLocale]);

  return {
    currentLocale: getCurrentLocale(),
    toggleLanguage,
  };
};
