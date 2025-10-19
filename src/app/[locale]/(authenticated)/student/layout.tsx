"use client";

import React from "react";
import { RoleGuard } from "@/components/guards";
import { EBMainLayout } from "@/components/layouts";
import { getDefaultHeaderConfig } from "@/common/constants/navigate.constant";
import { useTranslations } from "next-intl";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const buildHeader = getDefaultHeaderConfig("student", t);

  return (
    <RoleGuard allowedRoles={["STUDENT"]} requiredStatus={["APPROVED"]}>
      <EBMainLayout footer={true} buildHeader={buildHeader}>
        {children}
      </EBMainLayout>
    </RoleGuard>
  );
}
