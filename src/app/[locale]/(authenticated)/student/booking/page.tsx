"use client";
import BookingPage from "@/features/student/booking/BookingPage";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const StudentBookingContent = () => {
  const searchParams = useSearchParams();
  const tutorId = searchParams.get("tutorId") || "";

  return <BookingPage tutorId={tutorId} />;
};

const StudentBooking = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudentBookingContent />
    </Suspense>
  );
};

export default StudentBooking;
