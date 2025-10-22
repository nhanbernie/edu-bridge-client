import { getRequestConfig } from "next-intl/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./i18n/config";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const validLocale = SUPPORTED_LOCALES.includes(locale as any) ? locale : DEFAULT_LOCALE;

  return {
    locale: validLocale as string,
    messages: (await import(`./i18n/locales/${validLocale}/index.ts`)).default,
  };
});
