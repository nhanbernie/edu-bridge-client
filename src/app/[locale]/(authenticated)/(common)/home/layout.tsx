"use client";

import React from "react";
import { EBMainLayout } from "@/components/layouts";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <EBMainLayout footer={false}>{children}</EBMainLayout>;
}
