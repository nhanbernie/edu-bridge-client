"use client";

import React from "react";

export default function MeetingLayout({ children }: { children: React.ReactNode }) {
  // Meeting room không có EBMainLayout - fullscreen
  return <>{children}</>;
}
