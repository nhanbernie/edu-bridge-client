export const SUPPORTED_LOCALES = ["en", "vi"] as const;
export const DEFAULT_LOCALE = "vi" as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇺🇸",
  vi: "🇻🇳",
};
