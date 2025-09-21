"use client";

import React from "react";
import { RoleGuard } from "@/components/guards";
import { MainLayout } from "@/components/layouts";
import StudentHomePage from "@/features/student/dashboard/StudentHomePage";

const StudentPage = () => {
  return (
    <RoleGuard allowedRoles={["STUDENT"]} requiredStatus={["APPROVED"]}>
      <MainLayout>
        <StudentHomePage />
      </MainLayout>
    </RoleGuard>
  );
};

export default StudentPage;
