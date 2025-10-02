import EBMainLayout from "@/components/layouts/EBMainLayout";
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
    <EBMainLayout footer={true}>
      <BookingPage tutorId={tutorId} courseId={courseId} />
    </EBMainLayout>
  );
};

export default Booking;
