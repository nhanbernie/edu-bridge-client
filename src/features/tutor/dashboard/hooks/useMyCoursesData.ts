import { useMemo } from "react";
import { useManageCourses } from "@/features/tutor/courses/hooks/useManageCourses";
import { useTutorId } from "@/hooks/useTutorId";
import { useTranslations } from "next-intl";

export const useMyCoursesData = () => {
  const { tutorId, isLoading: tutorLoading } = useTutorId();
  const { courses, isLoading: coursesLoading, courseError } = useManageCourses(tutorId || "");
  const t = useTranslations("tutor.dashboard.myCourses");

  const isLoading = tutorLoading || coursesLoading;

  // Convert courses to display format
  const courseItems = useMemo(() => {
    if (!courses.length) return [];

    return courses.slice(0, 4).map((course) => {
      // Generate random student count for demo (in real app, this would come from API)
      const studentCount = Math.floor(Math.random() * 20) + 5;

      // Generate random rating for demo (in real app, this would come from feedback API)
      const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

      return {
        id: course.id,
        title: course.title,
        studentCount,
        rating: parseFloat(rating),
        status: t("status.active"),
      };
    });
  }, [courses, t]);

  return {
    courseItems,
    isLoading,
    courseError,
    hasCourses: courses.length > 0,
  };
};
