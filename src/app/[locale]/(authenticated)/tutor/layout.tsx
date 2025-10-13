import React from "react";
import { RoleGuard } from "@/components/guards";
import EBManageLayout from "@/components/layouts/EBManageLayout";

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["TUTOR"]} requiredStatus={["APPROVED"]}>
      <EBManageLayout>{children}</EBManageLayout>
    </RoleGuard>
  );
}
