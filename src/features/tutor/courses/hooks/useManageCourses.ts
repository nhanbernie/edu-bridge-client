import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { ROUTES, buildTutorCoursesEditRoute } from "@/common/constants/route.constant";
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
const mapCourseToCardData = (
  course: CourseDto,
  packages: PackageDto[] = [],
  t: any
): CourseData => {
  // Calculate price range from packages
  const prices = packages.map((pkg) => pkg.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : course.hourlyRate;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : course.hourlyRate * 10; // Fallback calculation

  return {
    id: course.courseId,
    title: course.title,
    tutorId: course.tutorId,
    tutorName: t("tutorName"), // This would come from tutor data in real app
    price: { min: minPrice, max: maxPrice },
    duration: `${course.hoursPerSession} ${t("duration.perSession")}`,
    students: 0, // This would come from enrollment data
    popular: false, // This would be calculated based on some criteria
  };
};

export const useManageCourses = (tutorId: string, courseId?: string) => {
  const t = useTranslations("tutor.courses.manage");

  const { push } = useLocaleRouter();

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
          (course: CourseDto) => mapCourseToCardData(course, [], t)
        )
      : [];

  // Transform packages data
  const packages: PackageDto[] =
    packagesResponse?.success && packagesResponse.data ? packagesResponse.data : [];

  // Handle navigation
  const handleCreateCourse = useCallback(() => {
    push(ROUTES.TUTOR_COURSES_CREATE);
  }, [push]);

  const handleEditCourse = useCallback(
    (courseId: string) => {
      push(buildTutorCoursesEditRoute(courseId));
    },
    [push]
  );

  // Handle delete course
  const handleDeleteCourse = useCallback(
    async (courseId: string) => {
      try {
        await deleteCourse({ courseId }).unwrap();

        toast.success(t("delete.success"));
        refetchCourse();
      } catch (error) {
        toast.error(t("delete.error"));
      }
    },
    [deleteCourse, refetchCourse, t]
  );

  // Handle refresh
  const handleRefresh = useCallback(() => {
    refetchCourse();
  }, [refetchCourse]);

  // Handle errors
  if (courseError) {
    toast.error(t("error.loadFailed"));
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
