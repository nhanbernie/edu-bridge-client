"use client";

import { RoleGuard } from "@/components/guards";
import { MainLayout } from "@/components/layouts";

const TutorPage = () => {
  return (
    <RoleGuard allowedRoles={["TUTOR"]} requiredStatus={["APPROVED"]}>
      <MainLayout footer={true}>
        <div>abc</div>
      </MainLayout>
    </RoleGuard>
  );
};

export default TutorPage;
