import AdminFeedbackPage from "@/features/admin/feedback/AdminFeedbackPage";

interface PageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { courseId } = await params;
  return <AdminFeedbackPage courseId={courseId} />;
}
