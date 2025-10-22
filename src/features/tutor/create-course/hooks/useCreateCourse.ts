import { useCallback } from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { ROUTES } from "@/common/constants/route.constant";
import { toast } from "sonner";
import { useCreateCourseMutation, type CreateCourseRequest } from "@/services/course";
import { useTutorId } from "@/hooks/useTutorId";
import { CourseFormData } from "@/components/form/course";

export const useCreateCourse = () => {
  const { push } = useLocaleRouter();
  const { tutorId, isLoading: tutorLoading } = useTutorId();
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();

  const handleCreateCourse = useCallback(
    async (formData: CourseFormData) => {
      if (!tutorId) {
        toast.error("Không thể xác định thông tin gia sư");
        return;
      }

      try {
        // Transform form data to API request format
        const courseRequest: CreateCourseRequest = {
          title: formData.title,
          description: formData.description,
          subjects: formData.subjects,
          isPublished: formData.isPublished,
          hoursPerSession: formData.hoursPerSession,
          hourlyRate: formData.hourlyRate,
        };

        const response = await createCourse(courseRequest).unwrap();

        if (response.success) {
          toast.success("Tạo khóa học thành công!");
          push(ROUTES.TUTOR_COURSES);
        } else {
          toast.error(response.message || "Có lỗi xảy ra khi tạo khóa học");
        }
      } catch (error: any) {
        // Handle different error types
        if (error?.data?.message) {
          toast.error(error.data.message);
        } else if (error?.message) {
          toast.error(error.message);
        } else {
          toast.error("Có lỗi xảy ra khi tạo khóa học. Vui lòng thử lại.");
        }
      }
    },
    [tutorId, createCourse, push]
  );

  const handleCancel = useCallback(() => {
    push(ROUTES.TUTOR_COURSES);
  }, [push]);

  return {
    // Data
    tutorId,

    // Loading states
    isLoading: isCreating,
    tutorLoading,

    // Actions
    handleCreateCourse,
    handleCancel,
  };
};
