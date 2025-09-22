import MainLayout from "@/components/layouts/MainLayout";
import BookingPage from "@/features/student/booking/BookingPage";

interface BookingProps {
  params: Promise<{
    slug: string; // tutorId
  }>;
  searchParams: Promise<{
    courseId?: string;
  }>;
}

const Booking = async ({ params, searchParams }: BookingProps) => {
  const { slug: tutorId } = await params;
  const { courseId } = await searchParams;

  return (
    <MainLayout footer={true}>
      <BookingPage tutorId={tutorId} courseId={courseId} />
    </MainLayout>
  );
};

export default Booking;
