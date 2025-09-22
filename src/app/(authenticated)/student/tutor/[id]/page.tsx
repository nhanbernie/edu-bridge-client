import React from "react";
import DetailTutorPage from "@/features/student/tutor/DetailTutorPage";
import MainLayout from "@/components/layouts/MainLayout";

interface DetailTutorProps {
  params: Promise<{
    id: string;
  }>;
}

const DetailTutor = async ({ params }: DetailTutorProps) => {
  const { id } = await params;

  return (
    <MainLayout footer={true}>
      <DetailTutorPage tutorId={id} />
    </MainLayout>
  );
};

export default DetailTutor;
