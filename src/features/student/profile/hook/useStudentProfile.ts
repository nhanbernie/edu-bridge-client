import { useState } from "react";
import { useUserId } from "@/hooks/useUserId";
import { useGetUser } from "@/hooks/useGetUser";
import { useUploadAvatar } from "@/hooks/useUploadAvatar";
import { useUpdateUserProfileMutation } from "@/services/user";
import { toast } from "sonner";

interface UseStudentProfileProps {
  studentId?: string; // Optional: if provided, use this instead of current user's ID
}

export const useStudentProfile = (props?: UseStudentProfileProps) => {
  const { userId: currentUserId } = useUserId();

  const effectiveUserId = props?.studentId || currentUserId || "";

  const { userData, isLoading, refetch } = useGetUser({ userId: effectiveUserId });
  const { handleUploadAvatar, isUploading: isUploadingAvatar } = useUploadAvatar();
  const [updateUserProfile, { isLoading: isUpdatingProfile }] = useUpdateUserProfileMutation();

  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handlers
  const handleAvatarUpload = async (file: File) => {
    if (!effectiveUserId) return;
    const avatarUrl = await handleUploadAvatar(effectiveUserId, file);
    if (avatarUrl) {
      refetch();
    }
  };

  // Handle profile update
  const handleUpdateProfile = async (formData: {
    fullName: string;
    phone: string;
    location: string;
    grade: string;
    learningGoal: string;
  }) => {
    if (!effectiveUserId) {
      toast.error("Không tìm thấy thông tin người dùng");
      return;
    }

    try {
      setIsSaving(true);

      const updateData = {
        userId: effectiveUserId,
        fullName: formData.fullName,
        phone: formData.phone,
        location: formData.location,
        student: {
          grade: formData.grade,
          learningGoal: formData.learningGoal,
        },
      };

      const result = await updateUserProfile(updateData).unwrap();

      if (result.success) {
        toast.success("Cập nhật hồ sơ thành công");
        await refetch();
        setIsEditing(false);
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi cập nhật hồ sơ");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Có lỗi xảy ra khi cập nhật hồ sơ");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return {
    // Data
    userData: userData || undefined,
    userId: effectiveUserId,

    // Loading states
    isLoading,
    isUploadingAvatar,
    isSaving: isSaving || isUpdatingProfile,

    // Edit states
    isEditing,
    setIsEditing,
    setIsSaving,

    // Handlers
    handleAvatarUpload,
    handleUpdateProfile,
    handleEdit,
    handleCancel,
    refetch,
  };
};
