import common from "./common.json";
import auth from "./auth.json";
import charity from "./charity.json";
import marketing from "./marketing.json";
import tutorCommon from "./tutor.json";

// Common
import sessionUtils from "./common/sessionUtils.json";

// Components
import availabilityCalendar from "./components/availability-calendar.json";
import ebMediaCard from "./components/eb-media-card.json";
import ebSchedule from "./components/eb-schedule.json";
import ebVideoUploadPlaceholder from "./components/eb-video-upload-placeholder.json";
import enrolledCourseCard from "./components/enrolled-course-card.json";
import ratingSummary from "./components/rating-summary.json";
import sessionCard from "./components/session-card.json";
import sessionList from "./components/session-list.json";
import sessionTabs from "./components/session-tabs.json";
import tutorCard from "./components/tutor-card.json";
import tutorCourseCard from "./components/tutor-course-card.json";
import userMenu from "./components/user-menu.json";

// Home
import home from "./home/home.json";

// Meeting
import meeting from "./meeting/meeting.json";

// Router
import router from "./router/router.json";

// Student
import studentFeedbackDetail from "./student/feedback/detail.json";
import studentFeedbackList from "./student/feedback/list.json";
import studentFeedback from "./student/feedback/feedback.json";
import studentHomeCard from "./student/home/card.json";
import studentHome from "./student/home/home.json";
import studentMySchedule from "./student/my-schedule/mySchedule.json";
import studentOnboard from "./student/onboard/onboard.json";
import studentProfile from "./student/profile/profile.json";
import studentTransactionsList from "./student/transactions/list.json";
import studentTransactionsManage from "./student/transactions/manage.json";
import studentTransactionsStatus from "./student/transactions/status.json";
import studentTransactions from "./student/transactions/transactions.json";
import studentTutorDetail from "./student/tutor/detail.json";

// Tutor
import tutorCourses from "./tutor/courses/courses.json";
import tutorCoursesCreate from "./tutor/courses/create.json";
import tutorCoursesEdit from "./tutor/courses/edit.json";
import tutorCoursesForm from "./tutor/courses/form.json";
import tutorCoursesManage from "./tutor/courses/manage.json";
import tutorCoursesPreview from "./tutor/courses/preview.json";
import tutorDashboard from "./tutor/dashboard/dashboard.json";
import tutorDashboardMyCourses from "./tutor/dashboard/my-courses.json";
import tutorDashboardReviews from "./tutor/dashboard/reviews.json";
import tutorDashboardSchedules from "./tutor/dashboard/schedules.json";
import tutorDashboardTransactionChart from "./tutor/dashboard/transaction-chart.json";
import tutorFeedbackDetail from "./tutor/feedback/detail.json";
import tutorFeedbackList from "./tutor/feedback/list.json";
import tutorOnboardProfileUnderPreview from "./tutor/onboard/profile-under-preview.json";
import tutorOnboardStep1 from "./tutor/onboard/step1.json";
import tutorOnboardStep2 from "./tutor/onboard/step2.json";
import tutorOnboardSteps from "./tutor/onboard/steps.json";
import tutorProfileForm from "./tutor/profile/form.json";
import tutorProfileMedia from "./tutor/profile/media.json";
import tutorProfile from "./tutor/profile/profile.json";
import tutorSchedulesCreate from "./tutor/schedules/create.json";
import tutorSchedulesManage from "./tutor/schedules/manage.json";
import tutorSchedules from "./tutor/schedules/schedules.json";
import tutorTransactions from "./tutor/transactions/transactions.json";

// Validation
import validationAuth from "./validation/auth.json";

const messages = {
  common,
  auth,
  charity,
  marketing,
  tutorCommon,
  sessionUtils,
  components: {
    availabilityCalendar,
    ebMediaCard,
    ebSchedule,
    ebVideoUploadPlaceholder,
    enrolledCourseCard,
    ratingSummary,
    sessionCard,
    sessionList,
    sessionTabs,
    tutorCard,
    tutorCourseCard,
    userMenu,
  },
  home,
  meeting,
  router,
  student: {
    feedback: {
      ...studentFeedback,
      detailPage: studentFeedbackDetail,
      listPage: studentFeedbackList,
    },
    home: {
      ...studentHome,
      card: studentHomeCard,
    },
    mySchedule: studentMySchedule,
    onboard: studentOnboard,
    profile: {
      ...studentProfile,
    },
    transactions: {
      list: studentTransactionsList,
      manage: studentTransactionsManage,
      status: studentTransactionsStatus,
      ...studentTransactions,
    },
    tutor: {
      detail: studentTutorDetail,
    },
  },
  tutor: {
    courses: {
      ...tutorCourses,
      create: tutorCoursesCreate,
      edit: tutorCoursesEdit,
      form: tutorCoursesForm,
      manage: tutorCoursesManage,
      preview: tutorCoursesPreview,
    },
    dashboard: {
      ...tutorDashboard,
      myCourses: tutorDashboardMyCourses,
      reviews: tutorDashboardReviews,
      schedules: tutorDashboardSchedules,
      transactionChart: tutorDashboardTransactionChart,
    },
    feedback: {
      detail: tutorFeedbackDetail,
      list: tutorFeedbackList,
    },
    onboard: {
      profileUnderPreview: tutorOnboardProfileUnderPreview,
      step1: tutorOnboardStep1,
      step2: tutorOnboardStep2,
      steps: tutorOnboardSteps,
    },
    profile: {
      form: tutorProfileForm,
      media: tutorProfileMedia,
      ...tutorProfile,
    },
    schedules: {
      create: tutorSchedulesCreate,
      manage: tutorSchedulesManage,
      ...tutorSchedules,
    },
    transactions: {
      ...tutorTransactions,
    },
  },
  validation: {
    auth: validationAuth,
  },
};

export default messages;

