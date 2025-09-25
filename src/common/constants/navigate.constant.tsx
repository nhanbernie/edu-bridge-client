import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  BarChart3,
  Star,
  Users,
  Settings,
} from "lucide-react";
import { ReactNode } from "react";

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
export interface SidebarItem {
  label: string;
  icon: ReactNode;
  href: string;
  active?: boolean;
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
