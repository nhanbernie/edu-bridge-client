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

// Cache messages loading to avoid redundant imports
const getMessages = cache(async (locale: string) => {
  try {
    // Parallel import all translation files
    const [
      common,
      sessionUtils,
      tutor,
      auth,
      marketing,
      router,
      home,
      charity,
      studentHome,
      studentHomeCard,
      studentHomeFilter,
      studentMySchedule,
      studentFeedback,
      studentProfile,
      studentProfileForm,
      studentTransactions,
      studentTransactionsManage,
      studentTransactionsList,
      studentTransactionsStatus,
      studentOnboard,
      studentTutorDetail,
      studentTutorTabs,
      studentBooking,
      meeting,
      tutorOnboardProfileUnderPreview,
      tutorOnboardSteps,
      tutorOnboardStep1,
      tutorOnboardStep2,
      tutorDashboard,
      tutorSchedules,
      tutorSchedulesManage,
      tutorSchedulesCreate,
      tutorCoursesManage,
      tutorCoursesForm,
      tutorCoursesPreview,
      tutorCoursesCreate,
      tutorCoursesEdit,
      tutorCourses,
      tutorProfileForm,
      tutorProfileMedia,
      tutorProfile,
      tutorTransactionsManage,
      tutorTransactions,
      tutorFeedbackList,
      tutorFeedbackDetail,
      studentFeedbackList,
      studentFeedbackDetail,
      ratingSummary,
      enrolledCourseCard,
      tutorCourseCard,
      tutorDashboardMyCourses,
      tutorDashboardReviews,
      tutorDashboardSchedules,
      tutorDashboardTransactionChart,
      sessionList,
      sessionCard,
      sessionTabs,
      ebSchedule,
      availabilityCalendar,
      ebMediaCard,
      ebVideoUploadPlaceholder,
      tutorCard,
      tutorBankVerification,
      sidebar,
      validationAuth,
    ] = await Promise.all([
      import(`@/i18n/locales/${locale}/common.json`),
      import(`@/i18n/locales/${locale}/common/sessionUtils.json`),
      import(`@/i18n/locales/${locale}/tutor.json`),
      import(`@/i18n/locales/${locale}/auth.json`),
      import(`@/i18n/locales/${locale}/marketing.json`),
      import(`@/i18n/locales/${locale}/router/router.json`),
      import(`@/i18n/locales/${locale}/home/home.json`),
      // Charity translations
      import(`@/i18n/locales/${locale}/charity.json`),
      // Student translations
      import(`@/i18n/locales/${locale}/student/home/home.json`),
      import(`@/i18n/locales/${locale}/student/home/card.json`),
      import(`@/i18n/locales/${locale}/student/home/filter.json`),
      import(`@/i18n/locales/${locale}/student/my-schedule/mySchedule.json`),
      import(`@/i18n/locales/${locale}/student/feedback/feedback.json`),
      import(`@/i18n/locales/${locale}/student/profile/profile.json`),
      import(`@/i18n/locales/${locale}/student/profile/form.json`),
      import(`@/i18n/locales/${locale}/student/transactions/transactions.json`),
      import(`@/i18n/locales/${locale}/student/transactions/manage.json`),
      import(`@/i18n/locales/${locale}/student/transactions/list.json`),
      import(`@/i18n/locales/${locale}/student/transactions/status.json`),
      import(`@/i18n/locales/${locale}/student/onboard/onboard.json`),
      import(`@/i18n/locales/${locale}/student/tutor/detail.json`),
      import(`@/i18n/locales/${locale}/student/tutor/tabs.json`),
      import(`@/i18n/locales/${locale}/student/booking/booking.json`),
      // Meeting translations
      import(`@/i18n/locales/${locale}/meeting/meeting.json`),
      // Tutor onboarding translations
      import(`@/i18n/locales/${locale}/tutor/onboard/profile-under-preview.json`),
      import(`@/i18n/locales/${locale}/tutor/onboard/steps.json`),
      import(`@/i18n/locales/${locale}/tutor/onboard/step1.json`),
      import(`@/i18n/locales/${locale}/tutor/onboard/step2.json`),
      // Tutor dashboard translations
      import(`@/i18n/locales/${locale}/tutor/dashboard/dashboard.json`),
      // Tutor schedules translations
      import(`@/i18n/locales/${locale}/tutor/schedules/schedules.json`),
      import(`@/i18n/locales/${locale}/tutor/schedules/manage.json`),
      import(`@/i18n/locales/${locale}/tutor/schedules/create.json`),
      // Tutor courses translations
      import(`@/i18n/locales/${locale}/tutor/courses/manage.json`),
      import(`@/i18n/locales/${locale}/tutor/courses/form.json`),
      import(`@/i18n/locales/${locale}/tutor/courses/preview.json`),
      import(`@/i18n/locales/${locale}/tutor/courses/create.json`),
      import(`@/i18n/locales/${locale}/tutor/courses/edit.json`),
      import(`@/i18n/locales/${locale}/tutor/courses/courses.json`),
      // Tutor profile translations
      import(`@/i18n/locales/${locale}/tutor/profile/form.json`),
      import(`@/i18n/locales/${locale}/tutor/profile/media.json`),
      import(`@/i18n/locales/${locale}/tutor/profile/profile.json`),
      // Tutor transactions translations
      import(`@/i18n/locales/${locale}/tutor/transactions/manage.json`),
      import(`@/i18n/locales/${locale}/tutor/transactions/transactions.json`),
      // Tutor feedback translations
      import(`@/i18n/locales/${locale}/tutor/feedback/list.json`),
      import(`@/i18n/locales/${locale}/tutor/feedback/detail.json`),
      // Student feedback translations
      import(`@/i18n/locales/${locale}/student/feedback/list.json`),
      import(`@/i18n/locales/${locale}/student/feedback/detail.json`),
      // Components translations
      import(`@/i18n/locales/${locale}/components/rating-summary.json`),
      import(`@/i18n/locales/${locale}/components/enrolled-course-card.json`),
      import(`@/i18n/locales/${locale}/components/tutor-course-card.json`),
      import(`@/i18n/locales/${locale}/tutor/dashboard/my-courses.json`),
      import(`@/i18n/locales/${locale}/tutor/dashboard/reviews.json`),
      import(`@/i18n/locales/${locale}/tutor/dashboard/schedules.json`),
      import(`@/i18n/locales/${locale}/tutor/dashboard/transaction-chart.json`),
      import(`@/i18n/locales/${locale}/components/session-list.json`),
      import(`@/i18n/locales/${locale}/components/session-card.json`),
      import(`@/i18n/locales/${locale}/components/session-tabs.json`),
      import(`@/i18n/locales/${locale}/components/eb-schedule.json`),
      import(`@/i18n/locales/${locale}/components/availability-calendar.json`),
      import(`@/i18n/locales/${locale}/components/eb-media-card.json`),
      import(`@/i18n/locales/${locale}/components/eb-video-upload-placeholder.json`),
      import(`@/i18n/locales/${locale}/components/tutor-card.json`),
      // Tutor components translations
      import(`@/i18n/locales/${locale}/tutor/components/bank-verification.json`),
      // Sidebar translations
      import(`@/i18n/locales/${locale}/sidebar.json`),
      // Validation translations
      import(`@/i18n/locales/${locale}/validation/auth.json`),
    ]);

    return {
      common: {
        ...common.default,
        sessionUtils: sessionUtils.default,
      },
      router: router.default,
      home: home.default,
      tutor: {
        ...tutor.default,
        dashboard: {
          ...tutorDashboard.default,
          myCourses: tutorDashboardMyCourses.default,
          reviews: tutorDashboardReviews.default,
          schedules: tutorDashboardSchedules.default,
          transactionChart: tutorDashboardTransactionChart.default,
        },
        schedules: {
          ...tutorSchedules.default,
          manage: tutorSchedulesManage.default,
          create: tutorSchedulesCreate.default,
        },
        onboard: {
          "profile-under-preview": tutorOnboardProfileUnderPreview.default,
          steps: tutorOnboardSteps.default,
          step1: tutorOnboardStep1.default,
          step2: tutorOnboardStep2.default,
        },
        courses: {
          ...tutorCourses.default,
          manage: tutorCoursesManage.default,
          form: tutorCoursesForm.default,
          preview: tutorCoursesPreview.default,
          create: {
            ...tutorCoursesCreate.default,
            ...tutorCourses.default.create,
          },
          edit: tutorCoursesEdit.default,
        },
        profile: {
          ...tutorProfile.default,
          form: tutorProfileForm.default,
          media: tutorProfileMedia.default,
        },
        transactions: {
          ...tutorTransactions.default,
          manage: {
            ...tutorTransactionsManage.default,
            ...tutorTransactions.default.manage,
          },
        },
        feedback: {
          list: tutorFeedbackList.default,
          detail: tutorFeedbackDetail.default,
        },
        components: {
          bankVerification: tutorBankVerification.default,
        },
      },
      auth: auth.default,
      marketing: marketing.default,
      charity: charity.default,
      student: {
        home: {
          ...studentHome.default,
          card: studentHomeCard.default,
          filter: studentHomeFilter.default,
        },
        mySchedule: studentMySchedule.default,
        feedback: {
          ...studentFeedback.default,
          list: studentFeedbackList.default,
          detail: studentFeedbackDetail.default,
        },
        profile: {
          ...studentProfile.default,
          form: studentProfileForm.default,
        },
        transactions: {
          ...studentTransactions.default,
          manage: studentTransactionsManage.default,
          list: studentTransactionsList.default,
          status: studentTransactionsStatus.default,
        },
        onboard: studentOnboard.default,
        tutor: {
          detail: studentTutorDetail.default,
          tabs: studentTutorTabs.default,
        },
        booking: studentBooking.default,
      },
      meeting: meeting.default,
      components: {
        ratingSummary: ratingSummary.default,
        enrolledCourseCard: enrolledCourseCard.default,
        tutorCourseCard: tutorCourseCard.default,
        sessionList: sessionList.default,
        sessionCard: sessionCard.default,
        sessionTabs: sessionTabs.default,
        ebSchedule: ebSchedule.default,
        availabilityCalendar: availabilityCalendar.default,
        ebMediaCard: ebMediaCard.default,
        ebVideoUploadPlaceholder: ebVideoUploadPlaceholder.default,
        tutorCard: tutorCard.default,
      },
      sidebar: sidebar.default,
      validation: {
        auth: validationAuth.default,
      },
    };
  } catch (error) {
    notFound();
  }
});

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
