import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import type { ReactNode } from "react";
import { cache } from "react";

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

  // Load messages dynamically with parallel imports
  let messages;
  try {
    // Parallel import all translation files
    const [
      common,
      tutor,
      auth,
      marketing,
      router,
      home,
      studentHome,
      studentHomeCard,
      studentHomeFilter,
      studentMySchedule,
      studentFeedback,
      studentProfile,
      studentTransactions,
      studentTransactionsList,
      studentTransactionsStatus,
      studentOnboard,
      meeting,
      tutorOnboardProfileUnderPreview,
      tutorOnboardSteps,
      tutorDashboard,
      tutorSchedules,
      validationAuth,
    ] = await Promise.all([
      import(`@/i18n/locales/${locale}/common.json`),
      import(`@/i18n/locales/${locale}/tutor.json`),
      import(`@/i18n/locales/${locale}/auth.json`),
      import(`@/i18n/locales/${locale}/marketing.json`),
      import(`@/i18n/locales/${locale}/router/router.json`),
      import(`@/i18n/locales/${locale}/home/home.json`),
      // Student translations
      import(`@/i18n/locales/${locale}/student/home/home.json`),
      import(`@/i18n/locales/${locale}/student/home/card.json`),
      import(`@/i18n/locales/${locale}/student/home/filter.json`),
      import(`@/i18n/locales/${locale}/student/my-schedule/mySchedule.json`),
      import(`@/i18n/locales/${locale}/student/feedback/feedback.json`),
      import(`@/i18n/locales/${locale}/student/profile/profile.json`),
      import(`@/i18n/locales/${locale}/student/transactions/transactions.json`),
      import(`@/i18n/locales/${locale}/student/transactions/list.json`),
      import(`@/i18n/locales/${locale}/student/transactions/status.json`),
      import(`@/i18n/locales/${locale}/student/onboard/onboard.json`),
      // Meeting translations
      import(`@/i18n/locales/${locale}/meeting/meeting.json`),
      // Tutor onboarding translations
      import(`@/i18n/locales/${locale}/tutor/onboard/profile-under-preview.json`),
      import(`@/i18n/locales/${locale}/tutor/onboard/steps.json`),
      // Tutor dashboard translations
      import(`@/i18n/locales/${locale}/tutor/dashboard/dashboard.json`),
      // Tutor schedules translations
      import(`@/i18n/locales/${locale}/tutor/schedules/schedules.json`),
      // Validation translations
      import(`@/i18n/locales/${locale}/validation/auth.json`),
    ]);

    messages = {
      common: common.default,
      router: router.default,
      home: home.default,
      tutor: {
        ...tutor.default,
        dashboard: tutorDashboard.default,
        schedules: tutorSchedules.default,
        onboard: {
          "profile-under-preview": tutorOnboardProfileUnderPreview.default,
          steps: tutorOnboardSteps.default,
        },
      },
      auth: auth.default,
      marketing: marketing.default,
      student: {
        home: {
          ...studentHome.default,
          card: studentHomeCard.default,
          filter: studentHomeFilter.default,
        },
        mySchedule: studentMySchedule.default,
        feedback: studentFeedback.default,
        profile: studentProfile.default,
        transactions: {
          ...studentTransactions.default,
          list: studentTransactionsList.default,
          status: studentTransactionsStatus.default,
        },
        onboard: studentOnboard.default,
      },
      meeting: meeting.default,
      validation: {
        auth: validationAuth.default,
      },
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
