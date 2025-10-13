"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import MarketingFeature from "@/features/marketing/MarketingFeature";
import { NextIntlClientProvider } from "next-intl";
import { DEFAULT_LOCALE } from "@/i18n/config";

export default function MainPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Load messages for default locale
  const loadMessages = async () => {
    try {
      const common = await import(`@/i18n/locales/${DEFAULT_LOCALE}/common.json`);
      const tutor = await import(`@/i18n/locales/${DEFAULT_LOCALE}/tutor.json`);
      const auth = await import(`@/i18n/locales/${DEFAULT_LOCALE}/auth.json`);
      const marketing = await import(`@/i18n/locales/${DEFAULT_LOCALE}/marketing.json`);

      return {
        common: common.default,
        tutor: tutor.default,
        auth: auth.default,
        marketing: marketing.default,
      };
    } catch (error) {
      console.error(`Failed to load messages for locale: ${DEFAULT_LOCALE}`, error);
      return {};
    }
  };

  const [messages, setMessages] = React.useState({});
  const [messagesLoaded, setMessagesLoaded] = React.useState(false);

  React.useEffect(() => {
    loadMessages().then((msgs) => {
      setMessages(msgs);
      setMessagesLoaded(true);
    });
  }, []);

  if (!messagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <NextIntlClientProvider locale={DEFAULT_LOCALE} messages={messages}>
      <MarketingFeature />
    </NextIntlClientProvider>
  );
}
