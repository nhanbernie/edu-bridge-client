"use client";

import React from "react";
import { RoleGuard } from "@/components/guards";
import EBManageLayout from "@/components/layouts/EBManageLayout";
import BankVerificationDialog from "@/features/tutor/components/BankVerificationDialog";
import { useBankVerificationReminder } from "@/hooks/useBankVerificationReminder";

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  const { shouldShow, markAsShown } = useBankVerificationReminder();

  return (
    <RoleGuard allowedRoles={["TUTOR"]} requiredStatus={["APPROVED"]}>
      <EBManageLayout>{children}</EBManageLayout>
      <BankVerificationDialog isOpen={shouldShow} onClose={markAsShown} />
    </RoleGuard>
  );
}
