import React from "react";
import DetailTutorPage from "@/features/student/tutor/DetailTutorPage";
import MainLayout from "@/components/layouts/MainLayout";

const DetailTutor = () => {
  return (
    <MainLayout footer={true}>
      <DetailTutorPage />
    </MainLayout>
  );
};

export default DetailTutor;
