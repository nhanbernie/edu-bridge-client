import StudentFeedbackPage from "@/features/student/feedback/StudentFeedbackPage";

interface PageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { courseId } = await params;
  return <StudentFeedbackPage courseId={courseId} />;
}
