"use client";

import React from "react";
import AdminTutorDetailPage from "@/features/admin/tutor-detail/AdminTutorDetailPage";

interface UserDetailPageProps {
  params: {
    userId: string;
  };
}

const UserDetailPage: React.FC<UserDetailPageProps> = ({ params }) => {
  return <AdminTutorDetailPage tutorId={params.userId} />;
};

export default UserDetailPage;
