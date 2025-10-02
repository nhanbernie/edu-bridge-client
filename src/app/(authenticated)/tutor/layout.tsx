import React from "react";
import { RoleGuard } from "@/components/guards";
import EBManageLayout from "@/components/layouts/EBManageLayout";
import { sidebarItems } from "@/constants/navigate.constant";

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["TUTOR"]} requiredStatus={["APPROVED"]}>
      {/* <EBMainLayout footer={true}>
        <div>abc</div>
      </EBMainLayout> */}
      <EBManageLayout>{children}</EBManageLayout>
    </RoleGuard>
  );
}
