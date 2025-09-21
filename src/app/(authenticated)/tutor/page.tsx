"use client";

import { RoleGuard } from "@/components/guards";
import { MainLayout } from "@/components/layouts";
import TutorHomePage from "@/features/tutor/home/TutorHomePage";

const TutorPage = () => {
  return (
    <RoleGuard allowedRoles={["TUTOR"]} requiredStatus={["APPROVED"]}>
      <MainLayout>
        <TutorHomePage />
      </MainLayout>
    </RoleGuard>
  );
};

export default TutorPage;
