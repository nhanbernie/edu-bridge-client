import MeetingPage from "@/features/meeting/MeetingPage";

interface MeetingProps {
  params: Promise<{ sessionId: string }>;
}

const Meeting = async ({ params }: MeetingProps) => {
  const { sessionId } = await params;

  return <MeetingPage sessionId={sessionId} />;
};

export default Meeting;
