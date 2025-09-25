import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useGetCourseQuery,
  useGetCoursePackagesQuery,
  useDeleteCourseMutation,
  type CourseDto,
  type PackageDto,
} from "@/services/course";
import type { CourseData } from "@/components/common/EBTutorCourseCard";

// Helper function to map CourseDto to CourseData
const mapCourseToCardData = (course: CourseDto, packages: PackageDto[] = []): CourseData => {
  // Calculate price range from packages
  const prices = packages.map((pkg) => pkg.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : course.hourlyRate;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : course.hourlyRate * 10; // Fallback calculation

  return {
    id: course.courseId,
    title: course.title,
    tutorId: course.tutorId,
    tutorName: "Gia sư", // This would come from tutor data in real app
    price: { min: minPrice, max: maxPrice },
    duration: `${course.hoursPerSession} giờ/buổi`,
    students: 0, // This would come from enrollment data
    popular: false, // This would be calculated based on some criteria
  };
};

export const useManageCourses = (tutorId: string, courseId?: string) => {
  const router = useRouter();

  // API queries - skip if no tutorId
  const {
    data: courseResponse,
    isLoading: isCourseLoading,
    error: courseError,
    refetch: refetchCourse,
  } = useGetCourseQuery({ tutorId }, { skip: !tutorId });

  // Get course packages - skip if no courseId
  const {
    data: packagesResponse,
    isLoading: isPackagesLoading,
    error: packagesError,
    refetch: refetchPackages,
  } = useGetCoursePackagesQuery({ courseId: courseId || "" }, { skip: !courseId });

  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  // Transform course data
  const courses: CourseData[] =
    courseResponse?.success && courseResponse.data
      ? (Array.isArray(courseResponse.data) ? courseResponse.data : [courseResponse.data]).map(
          (course: CourseDto) => mapCourseToCardData(course)
        )
      : [];

  // Transform packages data
  const packages: PackageDto[] =
    packagesResponse?.success && packagesResponse.data ? packagesResponse.data : [];

  // Handle navigation
  const handleCreateCourse = useCallback(() => {
    router.push("/tutor/courses/create");
  }, [router]);

  const handleEditCourse = useCallback(
    (courseId: string) => {
      router.push(`/tutor/courses/edit/${courseId}`);
    },
    [router]
  );

  // Handle delete course
  const handleDeleteCourse = useCallback(
    async (courseId: string) => {
      try {
        await deleteCourse({ courseId }).unwrap();

        toast.success("Xóa khóa học thành công");
        refetchCourse();
      } catch (error) {
        console.error("Error deleting course:", error);
        toast.error("Không thể xóa khóa học. Vui lòng thử lại.");
      }
    },
    [deleteCourse, refetchCourse]
  );

  // Handle refresh
  const handleRefresh = useCallback(() => {
    refetchCourse();
  }, [refetchCourse]);

  // Handle errors
  if (courseError) {
    console.error("Error loading courses:", courseError);
    toast.error("Không thể tải danh sách khóa học. Vui lòng thử lại.");
  }

  return {
    // Data
    courses,
    packages,

    // Loading states
    isLoading: isCourseLoading,
    isPackagesLoading,
    isDeleting,

    // Actions
    handleCreateCourse,
    handleEditCourse,
    handleDeleteCourse,
    handleRefresh,

    // Utils
    refetch: refetchCourse,
    refetchPackages,

    // Errors
    courseError,
    packagesError,
  };
};
