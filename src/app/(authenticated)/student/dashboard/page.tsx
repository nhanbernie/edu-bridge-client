import React from "react";
import StudentDashboardPage from "@/features/student/dashboard/StudentDashboardPage";
import EBMainLayout from "@/components/layouts/EBMainLayout";
const StudentDashboard = () => {
  return (
    <EBMainLayout footer={true}>
      <StudentDashboardPage />
    </EBMainLayout>
  );
};

export default StudentDashboard;
