"use client";

import React from "react";
import MeetingPage from "./MeetingPage";

interface StudentMeetingPageProps {
  sessionId: string;
}

const StudentMeetingPage: React.FC<StudentMeetingPageProps> = ({ sessionId }) => {
  return <MeetingPage sessionId={sessionId} />;
};

export default StudentMeetingPage;
