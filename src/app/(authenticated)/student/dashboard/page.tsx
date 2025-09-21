import React from "react";
import StudentDashboardPage from "@/features/student/dashboard/StudentDashboardPage";
import MainLayout from "@/components/layouts/MainLayout";
const StudentDashboard = () => {
  return (
    <MainLayout footer={true}>
      <StudentDashboardPage />
    </MainLayout>
  );
};

export default StudentDashboard;
