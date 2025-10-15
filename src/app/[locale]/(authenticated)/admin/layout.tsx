"use client";

import React from "react";
import { RoleGuard } from "@/components/guards";
import EBManageLayout from "@/components/layouts/EBManageLayout";
import { getDefaultLayoutConfig } from "@/common/constants/navigate.constant";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const config = getDefaultLayoutConfig("admin");

  return (
    <RoleGuard allowedRoles={["ADMIN"]} requiredStatus={["APPROVED"]}>
      <EBManageLayout {...config}>{children}</EBManageLayout>
    </RoleGuard>
  );
}
