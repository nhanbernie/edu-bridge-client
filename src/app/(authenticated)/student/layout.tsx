"use client";

import React from "react";
import { RoleGuard } from "@/components/guards";
import { EBMainLayout } from "@/components/layouts";
import { getDefaultLayoutConfig } from "@/common/constants/navigate.constant";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const config = getDefaultLayoutConfig("student");

  return (
    <RoleGuard allowedRoles={["STUDENT"]} requiredStatus={["APPROVED"]}>
      <EBMainLayout footer={true} {...config}>
        {children}
      </EBMainLayout>
    </RoleGuard>
  );
}
