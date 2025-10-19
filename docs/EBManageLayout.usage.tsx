/**
 * Usage examples for EBManageLayout with default data from constants
 */

import React from "react";
import EBManageLayout from "../src/components/layouts/EBManageLayout";
import {
  getDefaultLayoutConfig,
  createLayoutConfig,
  DashboardType,
  getDefaultTutorSidebarItems,
  getDefaultAdminActionButtons,
} from "@/common/constants/navigate.constant";
import { BookOpen, Users } from "lucide-react";

// ===== METHOD 1: Using Default Data (Simplest) =====

export const TutorLayoutSimple: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <EBManageLayout>{children}</EBManageLayout>;
};

// ===== METHOD 2: Using Helper Functions =====

export const TutorLayoutWithHelper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Note: This would need useTranslations hook in real usage
  const config = getDefaultLayoutConfig("tutor", () => "translation");

  return <EBManageLayout {...config}>{children}</EBManageLayout>;
};

export const AdminLayoutWithHelper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Note: This would need useTranslations hook in real usage
  const config = getDefaultLayoutConfig("admin", () => "translation");

  return <EBManageLayout {...config}>{children}</EBManageLayout>;
};

export const StudentLayoutWithHelper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Note: This would need useTranslations hook in real usage
  const config = getDefaultLayoutConfig("student", () => "translation");

  return <EBManageLayout {...config}>{children}</EBManageLayout>;
};

// ===== METHOD 3: Using Custom Config with Overrides =====

export const CustomTutorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Note: This would need useTranslations hook in real usage
  const config = createLayoutConfig("tutor", () => "translation", {
    // Override specific items
    showSearch: false,
    showNotifications: false,
    // Add custom action button
    actionButtons: [
      ...getDefaultAdminActionButtons(() => "translation"),
      {
        label: "Custom Action",
        icon: BookOpen,
        onClick: () => console.log("Custom action clicked"),
      },
    ],
  });

  return <EBManageLayout {...config}>{children}</EBManageLayout>;
};

// ===== METHOD 4: Completely Custom =====

export const CompletelyCustomLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const customSidebarItems = [
    {
      label: "Custom Dashboard",
      icon: BookOpen,
      href: "/custom",
    },
    {
      label: "Custom Users",
      icon: Users,
      href: "/custom/users",
    },
  ];

  const customActionButtons = [
    {
      label: "Custom Settings",
      icon: BookOpen,
      href: "/custom/settings",
    },
  ];

  return (
    <EBManageLayout
      sidebarItems={customSidebarItems}
      actionButtons={customActionButtons}
      showSearch={true}
      showNotifications={false}
    >
      {children}
    </EBManageLayout>
  );
};

// ===== METHOD 5: Dynamic Based on User Role =====

interface DynamicLayoutProps {
  children: React.ReactNode;
  userRole: "tutor" | "admin" | "student";
}

export const DynamicLayout: React.FC<DynamicLayoutProps> = ({ children, userRole }) => {
  // Note: This would need useTranslations hook in real usage
  const config = getDefaultLayoutConfig(userRole, () => "translation");

  return <EBManageLayout {...config}>{children}</EBManageLayout>;
};

// ===== METHOD 6: With Custom Logic =====

export const SmartLayout: React.FC<{
  children: React.ReactNode;
  dashboardType: DashboardType;
  hideSearch?: boolean;
  customActions?: any[];
}> = ({ children, dashboardType, hideSearch = false, customActions = [] }) => {
  // Note: This would need useTranslations hook in real usage
  const config = createLayoutConfig(dashboardType, () => "translation", {
    showSearch: !hideSearch,
    actionButtons: customActions.length > 0 ? customActions : undefined,
  });

  return <EBManageLayout {...config}>{children}</EBManageLayout>;
};

// ===== USAGE IN ACTUAL LAYOUT FILES =====

// In src/app/(authenticated)/tutor/layout.tsx
export const TutorLayoutExample = ({ children }: { children: React.ReactNode }) => {
  return (
    <EBManageLayout>
      {/* Uses defaultTutorSidebarItems and defaultTutorActionButtons automatically */}
      {children}
    </EBManageLayout>
  );
};

// In src/app/(authenticated)/admin/layout.tsx
export const AdminLayoutExample = ({ children }: { children: React.ReactNode }) => {
  // Note: This would need useTranslations hook in real usage
  const config = getDefaultLayoutConfig("admin", () => "translation");

  return <EBManageLayout {...config}>{children}</EBManageLayout>;
};

// In src/app/(authenticated)/student/layout.tsx
export const StudentLayoutExample = ({ children }: { children: React.ReactNode }) => {
  // Note: This would need useTranslations hook in real usage
  const config = createLayoutConfig("student", () => "translation", {
    showSearch: false, // Students don't need search
  });

  return <EBManageLayout {...config}>{children}</EBManageLayout>;
};
