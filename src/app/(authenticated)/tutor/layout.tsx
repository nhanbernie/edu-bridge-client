import React from "react";
import { RoleGuard } from "@/components/guards";
import ManageLayout from "@/components/layouts/ManageLayout";
import { sidebarItems } from "@/constants/navigate.constant";

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["TUTOR"]} requiredStatus={["APPROVED"]}>
      {/* <MainLayout footer={true}>
        <div>abc</div>
      </MainLayout> */}
      <ManageLayout>{children}</ManageLayout>
    </RoleGuard>
  );
}
