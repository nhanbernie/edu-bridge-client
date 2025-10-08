import React from "react";
import MeetingPage from "@/features/meeting/MeetingPage";

interface StudentMeetingProps {
  params: Promise<{ sessionId: string }>;
}

const StudentMeeting = async ({ params }: StudentMeetingProps) => {
  const { sessionId } = await params;
  return <MeetingPage sessionId={sessionId} />;
};

export default StudentMeeting;
