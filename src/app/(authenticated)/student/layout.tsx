import React from "react";
import { RoleGuard } from "@/components/guards";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={["STUDENT"]} requiredStatus={["APPROVED"]}>
      {children}
    </RoleGuard>
  );
}
