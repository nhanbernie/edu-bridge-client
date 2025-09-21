"use client";

import React from "react";
import { RoleGuard } from "@/components/guards";
import { MainLayout } from "@/components/layouts";
import StudentHomePage from "@/features/student/home/StudentHomePage";
const Student = () => {
  return (
    <RoleGuard allowedRoles={["STUDENT"]} requiredStatus={["APPROVED"]}>
      <MainLayout footer={true}>
        <StudentHomePage />
      </MainLayout>
    </RoleGuard>
  );
};

export default Student;
