"use client";

import React from "react";
import { EBMainLayout } from "@/components/layouts";
import StudentHomePage from "@/features/student/home/StudentHomePage";
const Student = () => {
  return (
    <EBMainLayout footer={true}>
      <StudentHomePage />
    </EBMainLayout>
  );
};

export default Student;
