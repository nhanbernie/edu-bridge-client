"use client";

import { useParams } from "next/navigation";
import AdminTutorDetailPage from "@/features/admin/tutor-detail/AdminTutorDetailPage";

const TutorDetailPage = () => {
  const params = useParams();
  const tutorId = params.tutorId as string;

  if (!tutorId) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Invalid tutor ID</p>
      </div>
    );
  }

  return <AdminTutorDetailPage tutorId={tutorId} />;
};

export default TutorDetailPage;
