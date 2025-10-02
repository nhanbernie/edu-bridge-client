import React from "react";
import DetailTutorPage from "@/features/student/tutor/DetailTutorPage";
import EBMainLayout from "@/components/layouts/EBMainLayout";

interface DetailTutorProps {
  params: Promise<{
    id: string;
  }>;
}

const DetailTutor = async ({ params }: DetailTutorProps) => {
  const { id } = await params;

  return (
    <EBMainLayout footer={true}>
      <DetailTutorPage tutorId={id} />
    </EBMainLayout>
  );
};

export default DetailTutor;
