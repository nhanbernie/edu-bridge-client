import { useCallback, useEffect, useState } from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { ROUTES } from "@/common/constants/route.constant";
import { toast } from "sonner";
import {
  useUpdateCourseMutation,
  useGetCourseQuery,
  type UpdateCourseRequest,
  type CourseDto,
} from "@/services/course";
import { CourseFormData } from "@/components/form/course";
import { useTutorId } from "@/hooks/useTutorId";

export const useEditCourse = (courseId: string) => {
  const { push } = useLocaleRouter();
  const { tutorId, isLoading: tutorLoading } = useTutorId();

  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const {
    data: courseResponse,
    isLoading: isLoadingCourse,
    error: courseError,
  } = useGetCourseQuery({ tutorId: tutorId || "" }, { skip: !tutorId });

  const [initialData, setInitialData] = useState<CourseFormData | null>(null);

  // Transform CourseDto to CourseFormData
  useEffect(() => {
    if (courseResponse?.success && courseResponse.data) {
      const courseData = Array.isArray(courseResponse.data)
        ? courseResponse.data.find((course: CourseDto) => course.courseId === courseId)
        : courseResponse.data.courseId === courseId
          ? courseResponse.data
          : null;

      if (courseData) {
        setInitialData({
          title: courseData.title,
          description: courseData.description,
          subjects: courseData.subjects,
          isPublished: courseData.isPublished,
          hoursPerSession: courseData.hoursPerSession,
          hourlyRate: courseData.hourlyRate,
        });
      }
    }
  }, [courseResponse, courseId]);

  const handleUpdateCourse = useCallback(
    async (formData: CourseFormData) => {
      try {
        // Transform form data to API request format
        const updateRequest: UpdateCourseRequest = {
          title: formData.title,
          description: formData.description,
          subjects: formData.subjects,
          isPublished: formData.isPublished,
          hoursPerSession: formData.hoursPerSession,
          hourlyRate: formData.hourlyRate,
        };

        const response = await updateCourse({
          courseId,
          ...updateRequest,
        }).unwrap();

        if (response.success) {
          toast.success("Cập nhật khóa học thành công!");
          push(ROUTES.TUTOR_COURSES);
        } else {
          toast.error(response.message || "Có lỗi xảy ra khi cập nhật khóa học");
        }
      } catch (error: any) {
        // Handle different error types
        if (error?.data?.message) {
          toast.error(error.data.message);
        } else if (error?.message) {
          toast.error(error.message);
        } else {
          toast.error("Có lỗi xảy ra khi cập nhật khóa học. Vui lòng thử lại.");
        }
      }
    },
    [courseId, updateCourse, push]
  );

  const handleCancel = useCallback(() => {
    push(ROUTES.TUTOR_COURSES);
  }, [push]);

  // Handle loading error
  if (courseError) {
    toast.error("Không thể tải thông tin khóa học. Vui lòng thử lại.");
  }

  return {
    // Data
    initialData,
    courseId,
    tutorId,

    // Loading states
    isLoading: isUpdating,
    isLoadingCourse,
    tutorLoading,

    // Actions
    handleUpdateCourse,
    handleCancel,
  };
};
