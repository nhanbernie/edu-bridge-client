import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  // Load messages dynamically
  let messages;
  try {
    const common = await import(`@/i18n/locales/${locale}/common.json`);
    const tutor = await import(`@/i18n/locales/${locale}/tutor.json`);

    messages = {
      common: common.default,
      tutor: tutor.default,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }

  // Child layout - NO html/body tags (parent layout already has them)
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
