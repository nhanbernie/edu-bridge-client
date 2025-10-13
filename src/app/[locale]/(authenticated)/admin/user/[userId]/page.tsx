"use client";

import React, { useEffect, useState } from "react";
import AdminTutorDetailPage from "@/features/admin/tutor-detail/AdminTutorDetailPage";

interface UserDetailPageProps {
  params: Promise<{
    userId: string;
  }>;
}

const UserDetailPage: React.FC<UserDetailPageProps> = ({ params }) => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const getUserId = async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.userId);
    };
    getUserId();
  }, [params]);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return <AdminTutorDetailPage tutorId={userId} />;
};

export default UserDetailPage;
