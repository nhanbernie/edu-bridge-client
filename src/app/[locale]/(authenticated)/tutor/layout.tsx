"use client";

import React, { useState } from "react";
import { RoleGuard } from "@/components/guards";
import EBManageLayout from "@/components/layouts/EBManageLayout";
import BankVerificationDialog from "@/features/tutor/components/BankVerificationDialog";
import { useBankVerificationReminder } from "@/hooks/useBankVerificationReminder";

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  const { shouldShow, markAsShown } = useBankVerificationReminder();
  const [showManualDialog, setShowManualDialog] = useState(false);

  const handleVerifyBankAccount = () => {
    setShowManualDialog(true);
  };

  const handleCloseDialog = () => {
    setShowManualDialog(false);
    markAsShown(); // Also mark reminder as shown
  };

  return (
    <RoleGuard allowedRoles={["TUTOR"]} requiredStatus={["APPROVED"]}>
      <EBManageLayout onVerifyBankAccount={handleVerifyBankAccount}>
        {children}
      </EBManageLayout>
      
      {/* Automatic reminder dialog */}
      <BankVerificationDialog isOpen={shouldShow} onClose={markAsShown} />
      
      {/* Manual trigger dialog */}
      <BankVerificationDialog isOpen={showManualDialog} onClose={handleCloseDialog} />
    </RoleGuard>
  );
}
