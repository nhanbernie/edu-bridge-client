/**
 * Example usage of EBManageLayout component
 * This file demonstrates how to use the optimized layout with props
 */

import React from "react";
import EBManageLayout from "../src/components/layouts/EBManageLayout";
import { EBSidebarItem, EBActionButton } from "../src/common/constants/navigate.constant";
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
} from "lucide-react";

// Example sidebar items for tutor dashboard
const tutorSidebarItems: EBSidebarItem[] = [
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

// Example action buttons for bottom sidebar
const tutorActionButtons: EBActionButton[] = [
  {
    label: "Settings",
    icon: Settings,
    href: "/tutor/settings",
  },
  {
    label: "Help",
    icon: HelpCircle,
    onClick: () => {
      // Open help modal or navigate to help page
      console.log("Open help");
    },
  },
];

// Example admin sidebar items
const adminSidebarItems: EBSidebarItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
  },
];

const adminActionButtons: EBActionButton[] = [
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
  {
    label: "Logout",
    icon: LogOut,
    onClick: () => {
      // Handle logout
      console.log("Logout");
    },
  },
];

// Example usage components
export const TutorLayoutExample: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <EBManageLayout
      sidebarItems={tutorSidebarItems}
      actionButtons={tutorActionButtons}
      showSearch={true}
      showNotifications={true}
    >
      {children}
    </EBManageLayout>
  );
};

export const AdminLayoutExample: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <EBManageLayout
      sidebarItems={adminSidebarItems}
      actionButtons={adminActionButtons}
      showSearch={true}
      showNotifications={false} // Admin might not need notifications
    >
      {children}
    </EBManageLayout>
  );
};

// Minimal layout example
export const MinimalLayoutExample: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <EBManageLayout
      sidebarItems={[
        {
          label: "Home",
          icon: LayoutDashboard,
          href: "/",
        },
      ]}
      actionButtons={[]} // No action buttons
      showSearch={false}
      showNotifications={false}
    >
      {children}
    </EBManageLayout>
  );
};
