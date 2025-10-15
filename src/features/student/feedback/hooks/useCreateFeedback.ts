import { useState } from "react";
import { useCreateFeedbackMutation } from "@/services/feedback/feedback.service";
import { toast } from "sonner";

interface CreateFeedbackData {
  courseId: string;
  tutorRating: number;
  courseRating: number;
  comment: string;
}

export const useCreateFeedback = () => {
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateFeedback = async (data: CreateFeedbackData) => {
    try {
      setIsSubmitting(true);

      const response = await createFeedback({
        courseId: data.courseId,
        tutorRating: data.tutorRating,
        courseRating: data.courseRating,
        comment: data.comment,
      }).unwrap();

      if (response.success) {
        toast.success("Đánh giá đã được gửi thành công!");
        return { success: true, data: response.data };
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi gửi đánh giá");
        return { success: false, error: response.message };
      }
    } catch (error: any) {
      console.error("Create feedback error:", error);
      toast.error("Có lỗi xảy ra khi gửi đánh giá");
      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createFeedback: handleCreateFeedback,
    isLoading: isLoading || isSubmitting,
  };
};
