"use client";

import React from "react";
import MeetingPage from "./MeetingPage";

interface StudentMeetingPageProps {
  sessionId: string;
  userId?: string;
}

const StudentMeetingPage: React.FC<StudentMeetingPageProps> = ({
  sessionId,
  userId = "student-123",
}) => {
  return <MeetingPage sessionId={sessionId} userId={userId} />;
};

export default StudentMeetingPage;
