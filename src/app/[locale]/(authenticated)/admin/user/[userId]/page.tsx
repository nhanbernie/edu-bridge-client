"use client";

import React from "react";
import AdminTutorDetailPage from "@/features/admin/tutor-detail/AdminTutorDetailPage";

interface UserDetailPageProps {
  params: Promise<{
    userId: string;
  }>;
}

const UserDetailPage: React.FC<UserDetailPageProps> = async ({ params }) => {
  const { userId } = await params;
  return <AdminTutorDetailPage tutorId={userId} />;
};

export default UserDetailPage;
