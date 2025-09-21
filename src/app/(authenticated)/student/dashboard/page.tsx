import React from "react";
import StudentDashboardPage from "@/features/student/dashboard/StudentDashboardPage";
import { RoleGuard } from "@/components/guards";
const StudentDashboard = () => {
  return (
    <RoleGuard allowedRoles={["STUDENT"]} requiredStatus={["APPROVED"]}>
      <StudentDashboardPage />
    </RoleGuard>
  );
};

export default StudentDashboard;
