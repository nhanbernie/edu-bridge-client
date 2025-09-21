import React from "react";
import { RoleGuard } from "@/components/guards";
import TutorDashboardPage from "@/features/tutor/dashboard/TutorDashboardPage";
const page = () => {
  return (
    <RoleGuard allowedRoles={["TUTOR"]} requiredStatus={["APPROVED"]}>
      <TutorDashboardPage />
    </RoleGuard>
  );
};

export default page;
