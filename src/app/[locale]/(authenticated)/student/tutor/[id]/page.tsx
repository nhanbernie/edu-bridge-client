import React from "react";
import DetailTutorPage from "@/features/student/tutor/DetailTutorPage";

interface DetailTutorProps {
  params: Promise<{
    id: string;
  }>;
}

const DetailTutor = async ({ params }: DetailTutorProps) => {
  const { id } = await params;

  return <DetailTutorPage tutorId={id} />;
};

export default DetailTutor;
