"use client";

import React from "react";
import { RoleGuard } from "@/components/guards";
import { EBMainLayout } from "@/components/layouts";
import { getDefaultHeaderConfig } from "@/common/constants/navigate.constant";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const buildHeader = getDefaultHeaderConfig("student");

  return (
    <RoleGuard allowedRoles={["STUDENT"]} requiredStatus={["APPROVED"]}>
      <EBMainLayout footer={true} buildHeader={buildHeader}>
        {children}
      </EBMainLayout>
    </RoleGuard>
  );
}
