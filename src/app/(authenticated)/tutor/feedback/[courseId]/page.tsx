import TutorFeedbackPage from "@/features/tutor/feedback/TutorFeedbackPage";

interface PageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { courseId } = await params;
  return <TutorFeedbackPage courseId={courseId} />;
}
