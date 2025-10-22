"use client";

import React, { useState } from "react";
import { RoleGuard } from "@/components/guards";
import EBManageLayout from "@/components/layouts/EBManageLayout";
import BankVerificationDialog from "@/features/tutor/components/BankVerificationDialog";
import { useBankVerificationReminder } from "@/hooks/useBankVerificationReminder";
import { useGetAndStoreUser } from "@/hooks/useGetAndStoreUser";
import { useUserId } from "@/hooks/useUserId";

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  const { shouldShow, markAsShown } = useBankVerificationReminder();
  const [showManualDialog, setShowManualDialog] = useState(false);
  const { userId } = useUserId();
  const { refetch } = useGetAndStoreUser({ userId: userId || "", enabled: true });

  const handleVerifyBankAccount = () => {
    setShowManualDialog(true);
  };

  const handleCloseDialog = async () => {
    // Refetch user data to check if bank account is verified
    await refetch();
    setShowManualDialog(false);
    markAsShown(); // Also mark reminder as shown
  };

  const handleCloseAutoReminder = async () => {
    // Refetch user data to check if bank account is verified
    await refetch();
    markAsShown();
  };

  return (
    <RoleGuard allowedRoles={["TUTOR"]} requiredStatus={["APPROVED"]}>
      <EBManageLayout onVerifyBankAccount={handleVerifyBankAccount}>
        {children}
      </EBManageLayout>
      
      {/* Automatic reminder dialog */}
      <BankVerificationDialog isOpen={shouldShow} onClose={handleCloseAutoReminder} />
      
      {/* Manual trigger dialog */}
      <BankVerificationDialog isOpen={showManualDialog} onClose={handleCloseDialog} />
    </RoleGuard>
  );
}
