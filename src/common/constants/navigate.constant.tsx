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

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export const navigationItems: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Find Tutors", href: "/tutors" },
  { label: "Dashboard", href: "/dashboard" },
];

export const navigateMarketItems: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Packages", href: "/packages" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
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
  {
    key: "language",
    icon: Globe,
    show: true,
  },
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
export const defaultTutorSidebarItems: EBSidebarItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/tutor",
  },
  {
    label: "Khóa học",
    icon: BookOpen,
    href: "/tutor/courses",
  },
  {
    label: "Lịch rảnh",
    icon: Calendar,
    href: "/tutor/schedules",
  },
  {
    label: "Lịch dạy của tôi",
    icon: CalendarCheck,
    href: "/tutor/my-schedule",
  },
  {
    label: "Giao dịch",
    icon: CreditCard,
    href: "/tutor/transactions",
  },
  {
    label: "Thống kê",
    icon: BarChart3,
    href: "/tutor/statistics",
  },
  {
    label: "Đánh giá",
    icon: Star,
    href: "/tutor/reviews",
  },
  {
    label: "Học sinh",
    icon: Users,
    href: "/tutor/students",
  },
];

export const defaultTutorActionButtons: EBActionButton[] = [
  {
    label: "Cài đặt",
    icon: Settings,
    href: "/tutor/settings",
  },
  {
    label: "Trợ giúp",
    icon: HelpCircle,
    onClick: () => {
      // Open help modal or navigate to help page
      window.open("/help", "_blank");
    },
  },
];

// Admin Dashboard Default Data
export const defaultAdminSidebarItems: EBSidebarItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Người dùng",
    icon: Users,
    href: "/admin/users",
  },
  {
    label: "Gia sư",
    icon: GraduationCap,
    href: "/admin/tutors",
  },
  {
    label: "Khóa học",
    icon: BookOpen,
    href: "/admin/courses",
  },
  {
    label: "Thống kê",
    icon: BarChart3,
    href: "/admin/analytics",
  },
  {
    label: "Báo cáo",
    icon: FileText,
    href: "/admin/reports",
  },
  {
    label: "Giao dịch",
    icon: CreditCard,
    href: "/admin/transactions",
  },
];

export const defaultAdminActionButtons: EBActionButton[] = [
  {
    label: "Cài đặt hệ thống",
    icon: Settings,
    href: "/admin/settings",
  },
  {
    label: "Bảo mật",
    icon: Shield,
    href: "/admin/security",
  },
];

// Student Dashboard Default Data
export const defaultStudentSidebarItems: EBSidebarItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/student",
  },
  {
    label: "Khóa học của tôi",
    icon: BookOpen,
    href: "/student/courses",
  },
  {
    label: "Lịch học",
    icon: Calendar,
    href: "/student/schedule",
  },
  {
    label: "Gia sư",
    icon: Users,
    href: "/student/tutors",
  },
  {
    label: "Đánh giá",
    icon: Star,
    href: "/student/reviews",
  },
  {
    label: "Thanh toán",
    icon: CreditCard,
    href: "/student/payments",
  },
];

export const defaultStudentActionButtons: EBActionButton[] = [
  {
    label: "Hồ sơ",
    icon: UserCheck,
    href: "/student/profile",
  },
  {
    label: "Trợ giúp",
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
export const getDefaultSidebarItems = (type: DashboardType): EBSidebarItem[] => {
  switch (type) {
    case "tutor":
      return defaultTutorSidebarItems;
    case "admin":
      return defaultAdminSidebarItems;
    case "student":
      return defaultStudentSidebarItems;
    default:
      return defaultTutorSidebarItems;
  }
};

/**
 * Get default action buttons based on dashboard type
 */
export const getDefaultActionButtons = (type: DashboardType): EBActionButton[] => {
  switch (type) {
    case "tutor":
      return defaultTutorActionButtons;
    case "admin":
      return defaultAdminActionButtons;
    case "student":
      return defaultStudentActionButtons;
    default:
      return defaultTutorActionButtons;
  }
};

/**
 * Get complete default layout config for a dashboard type
 */
export const getDefaultLayoutConfig = (type: DashboardType) => {
  return {
    sidebarItems: getDefaultSidebarItems(type),
    actionButtons: getDefaultActionButtons(type),
    showSearch: type !== "student", // Students might not need search
    showNotifications: true,
  };
};

/**
 * Get default header config for EBMainLayout
 */
export const getDefaultHeaderConfig = (type: DashboardType) => {
  return ({ go }: { go: (path: string) => void }) => {
    const items: HeaderItem[] = [];

    switch (type) {
      case "student":
        items.push(
          {
            key: "tutors",
            label: "Tìm gia sư",
            href: "/student",
            onClick: () => go("/student"),
          },
          {
            key: "my-schedule",
            label: "Lịch học của tôi",
            href: "/student/my-schedule",
            onClick: () => go("/student/my-schedule"),
          },
          {
            key: "transactions",
            label: "Giao dịch",
            href: "/student/transactions",
            onClick: () => go("/student/transactions"),
          }
        );
        break;
      case "tutor":
        items.push(
          { key: "dashboard", label: "Dashboard", href: "/tutor", onClick: () => go("/tutor") },
          {
            key: "courses",
            label: "Courses",
            href: "/tutor/courses",
            onClick: () => go("/tutor/courses"),
          },
          {
            key: "schedules",
            label: "Schedules",
            href: "/tutor/schedules",
            onClick: () => go("/tutor/schedules"),
          },
          {
            key: "my-schedule",
            label: "Lịch dạy của tôi",
            href: "/tutor/my-schedule",
            onClick: () => go("/tutor/my-schedule"),
          },
          {
            key: "transactions",
            label: "Transactions",
            href: "/tutor/transactions",
            onClick: () => go("/tutor/transactions"),
          }
        );
        break;
      case "admin":
        items.push(
          {
            key: "dashboard",
            label: "Dashboard",
            href: "/admin/dashboard",
            onClick: () => go("/admin/dashboard"),
          },
          { key: "users", label: "Users", href: "/admin", onClick: () => go("/admin") },
          {
            key: "transactions",
            label: "Transactions",
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
      //     label: "Profile",
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
  overrides?: {
    sidebarItems?: EBSidebarItem[];
    actionButtons?: EBActionButton[];
    showSearch?: boolean;
    showNotifications?: boolean;
  }
) => {
  const defaultConfig = getDefaultLayoutConfig(type);

  return {
    ...defaultConfig,
    ...overrides,
  };
};
