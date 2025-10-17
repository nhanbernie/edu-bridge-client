import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  BarChart3,
  Star,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
  FileText,
  CreditCard,
  Bell,
  UserCheck,
  GraduationCap,
  CalendarCheck,
  Search,
  MessageSquare,
  Globe,
} from "lucide-react";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { HeaderItem, HeaderActionButton } from "@/components/layouts/types";
import { useTranslations } from "next-intl";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

// Navigation items with translation keys
export const getNavigationItems = (t: any): NavItem[] => [
  { label: t("router.navigation.home"), href: "/home", active: true },
  { label: t("router.navigation.findTutors"), href: "/home" },
  { label: t("router.navigation.findStudents"), href: "/home" },
];

export const getNavigateMarketItems = (t: any): NavItem[] => [
  { label: t("router.navigation.home"), href: "/", active: true },
  { label: t("router.navigation.teachers"), href: "/" },
  { label: t("router.navigation.contact"), href: "/" },
];

// Default Header Action Buttons
export const defaultHeaderActionButtons: HeaderActionButton[] = [
  // {
  //   key: "search",
  //   icon: Search,
  //   show: true,
  // },
  // {
  //   key: "message",
  //   icon: MessageSquare,
  //   show: true,
  // },
  // {
  //   key: "language",
  //   icon: Globe,
  //   show: true,
  // },
];
export interface SidebarItem {
  label: string;
  icon: ReactNode;
  href: string;
  active?: boolean;
}

// Enhanced interfaces for EBManageLayout
export interface EBSidebarItem {
  label: string;
  icon: LucideIcon;
  href: string;
  active?: boolean;
}

export interface EBActionButton {
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
}
export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/tutor",
    active: false,
  },
  {
    label: "Khóa học",
    icon: <BookOpen className="w-5 h-5" />,
    href: "/tutor/courses",
    active: false,
  },
  {
    label: "Lịch rảnh",
    icon: <Calendar className="w-5 h-5" />,
    href: "/tutor/schedules",
    active: false,
  },
  {
    label: "Thống kê",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "/tutor/statistics",
    active: false,
  },
  {
    label: "Đánh giá",
    icon: <Star className="w-5 h-5" />,
    href: "/tutor/reviews",
    active: false,
  },
  {
    label: "Học sinh",
    icon: <Users className="w-5 h-5" />,
    href: "/tutor/students",
    active: false,
  },
];

// ===== DEFAULT DATA FOR EBManageLayout =====

// Tutor Dashboard Default Data
export const getDefaultTutorSidebarItems = (t: any): EBSidebarItem[] => [
  {
    label: t("router.sidebar.dashboard"),
    icon: LayoutDashboard,
    href: "/tutor",
  },
  {
    label: t("router.sidebar.myTeachingSchedule"),
    icon: CalendarCheck,
    href: "/tutor/my-schedule",
  },
  {
    label: t("router.sidebar.courses"),
    icon: BookOpen,
    href: "/tutor/courses",
  },
  {
    label: t("router.sidebar.availableSchedule"),
    icon: Calendar,
    href: "/tutor/schedules",
  },
  {
    label: t("router.sidebar.transactions"),
    icon: CreditCard,
    href: "/tutor/transactions",
  },
  // {
  //   label: t("router.sidebar.statistics"),
  //   icon: BarChart3,
  //   href: "/tutor/statistics",
  // },
  {
    label: t("router.sidebar.reviews"),
    icon: Star,
    href: "/tutor/feedback",
  },
  // {
  //   label: t("router.sidebar.students"),
  //   icon: Users,
  //   href: "/tutor/students",
  // },
];

// NOTE: customize button for tutor
export const getDefaultTutorActionButtons = (t: any): EBActionButton[] => [
  // {
  //   label: t("router.actions.settings"),
  //   icon: Settings,
  //   href: "/tutor/settings",
  // },
  // {
  //   label: t("router.actions.help"),
  //   icon: HelpCircle,
  //   onClick: () => {
  //     // Open help modal or navigate to help page
  //     window.open("/help", "_blank");
  //   },
  // },
];

// Admin Dashboard Default Data
export const getDefaultAdminSidebarItems = (t: any): EBSidebarItem[] => [
  {
    label: t("router.sidebar.dashboard"),
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: t("router.sidebar.users"),
    icon: Users,
    href: "/admin/users",
  },
  {
    label: t("router.sidebar.tutors"),
    icon: GraduationCap,
    href: "/admin/tutors",
  },
  {
    label: t("router.sidebar.courses"),
    icon: BookOpen,
    href: "/admin/courses",
  },
  {
    label: t("router.sidebar.analytics"),
    icon: BarChart3,
    href: "/admin/analytics",
  },
  {
    label: t("router.sidebar.reports"),
    icon: FileText,
    href: "/admin/reports",
  },
  {
    label: t("router.sidebar.transactions"),
    icon: CreditCard,
    href: "/admin/transactions",
  },
];

export const getDefaultAdminActionButtons = (t: any): EBActionButton[] => [
  {
    label: t("router.actions.systemSettings"),
    icon: Settings,
    href: "/admin/settings",
  },
  {
    label: t("router.actions.security"),
    icon: Shield,
    href: "/admin/security",
  },
];

// Student Dashboard Default Data
export const getDefaultStudentSidebarItems = (t: any): EBSidebarItem[] => [
  {
    label: t("router.sidebar.dashboard"),
    icon: LayoutDashboard,
    href: "/student",
  },
  {
    label: t("router.sidebar.myCourses"),
    icon: BookOpen,
    href: "/student/courses",
  },
  {
    label: t("router.sidebar.mySchedule"),
    icon: Calendar,
    href: "/student/schedule",
  },
  {
    label: t("router.sidebar.tutors"),
    icon: Users,
    href: "/student/tutors",
  },
  {
    label: t("router.sidebar.reviews"),
    icon: Star,
    href: "/student/reviews",
  },
  {
    label: t("router.sidebar.payments"),
    icon: CreditCard,
    href: "/student/payments",
  },
];

export const getDefaultStudentActionButtons = (t: any): EBActionButton[] => [
  {
    label: t("router.actions.profile"),
    icon: UserCheck,
    href: "/student/profile",
  },
  {
    label: t("router.actions.help"),
    icon: HelpCircle,
    onClick: () => {
      window.open("/help", "_blank");
    },
  },
];

// ===== HELPER FUNCTIONS =====

export type DashboardType = "tutor" | "admin" | "student";

/**
 * Get default sidebar items based on dashboard type
 */
export const getDefaultSidebarItems = (type: DashboardType, t: any): EBSidebarItem[] => {
  switch (type) {
    case "tutor":
      return getDefaultTutorSidebarItems(t);
    case "admin":
      return getDefaultAdminSidebarItems(t);
    case "student":
      return getDefaultStudentSidebarItems(t);
    default:
      return getDefaultTutorSidebarItems(t);
  }
};

/**
 * Get default action buttons based on dashboard type
 */
export const getDefaultActionButtons = (type: DashboardType, t: any): EBActionButton[] => {
  switch (type) {
    case "tutor":
      return getDefaultTutorActionButtons(t);
    case "admin":
      return getDefaultAdminActionButtons(t);
    case "student":
      return getDefaultStudentActionButtons(t);
    default:
      return getDefaultTutorActionButtons(t);
  }
};

/**
 * Get complete default layout config for a dashboard type
 */
export const getDefaultLayoutConfig = (type: DashboardType, t: any) => {
  return {
    sidebarItems: getDefaultSidebarItems(type, t),
    actionButtons: getDefaultActionButtons(type, t),
    showSearch: type !== "student", // Students might not need search
    showNotifications: true,
  };
};

/**
 * Get default header config for EBMainLayout
 */
export const getDefaultHeaderConfig = (type: DashboardType, t: any) => {
  return ({ go }: { go: (path: string) => void }) => {
    const items: HeaderItem[] = [];

    switch (type) {
      case "student":
        items.push(
          {
            key: "tutors",
            label: t("router.header.findTutors"),
            href: "/student",
            onClick: () => go("/student"),
          },
          {
            key: "my-schedule",
            label: t("router.header.mySchedule"),
            href: "/student/my-schedule",
            onClick: () => go("/student/my-schedule"),
          },
          {
            key: "transactions",
            label: t("router.header.transactions"),
            href: "/student/transactions",
            onClick: () => go("/student/transactions"),
          },
          {
            key: "feedback",
            label: t("router.header.feedback"),
            href: "/student/feedback",
            onClick: () => go("/student/feedback"),
          }
        );
        break;
      case "tutor":
        items.push(
          {
            key: "dashboard",
            label: t("router.sidebar.dashboard"),
            href: "/tutor",
            onClick: () => go("/tutor"),
          },
          {
            key: "courses",
            label: t("router.header.courses"),
            href: "/tutor/courses",
            onClick: () => go("/tutor/courses"),
          },
          {
            key: "schedules",
            label: t("router.header.schedules"),
            href: "/tutor/schedules",
            onClick: () => go("/tutor/schedules"),
          },
          {
            key: "my-schedule",
            label: t("router.header.teachingSchedule"),
            href: "/tutor/my-schedule",
            onClick: () => go("/tutor/my-schedule"),
          },
          {
            key: "transactions",
            label: t("router.header.transactions"),
            href: "/tutor/transactions",
            onClick: () => go("/tutor/transactions"),
          }
        );
        break;
      case "admin":
        items.push(
          {
            key: "dashboard",
            label: t("router.sidebar.dashboard"),
            href: "/admin/dashboard",
            onClick: () => go("/admin/dashboard"),
          },
          {
            key: "users",
            label: t("router.sidebar.users"),
            href: "/admin",
            onClick: () => go("/admin"),
          },
          {
            key: "transactions",
            label: t("router.header.transactions"),
            href: "/admin/transactions",
            onClick: () => go("/admin/transactions"),
          }
        );
        break;
    }

    return {
      items,
      // Only add CTA for specific roles if needed
      // ...(type === "student" && {
      //   cta: {
      //     label: t("router.actions.profile"),
      //     onClick: () => go("/profile"),
      //   },
      // }),
    };
  };
};

/**
 * Create custom layout config with overrides
 */
export const createLayoutConfig = (
  type: DashboardType,
  t: any,
  overrides?: {
    sidebarItems?: EBSidebarItem[];
    actionButtons?: EBActionButton[];
    showSearch?: boolean;
    showNotifications?: boolean;
  }
) => {
  const defaultConfig = getDefaultLayoutConfig(type, t);

  return {
    ...defaultConfig,
    ...overrides,
  };
};
