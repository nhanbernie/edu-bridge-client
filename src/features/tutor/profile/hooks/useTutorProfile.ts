import { useState } from "react";
import { useUserId } from "@/hooks/useUserId";
import { useGetUser } from "@/hooks/useGetUser";
import { useUploadAvatar } from "@/hooks/useUploadAvatar";
import { useTutorMedia } from "@/hooks/useTutorMedia";
import { useUpdateUserProfileMutation } from "@/services/user";
import { MediaType } from "@/services/user/types/media.type";
import { toast } from "sonner";

interface UseTutorProfileProps {
  tutorId?: string; // Optional: if provided, use this instead of current user's ID
}

export const useTutorProfile = (props?: UseTutorProfileProps) => {
  const { userId: currentUserId } = useUserId();

  const effectiveUserId = props?.tutorId || currentUserId || "";

  const { userData, isLoading, refetch } = useGetUser({ userId: effectiveUserId });
  const { handleUploadAvatar, isUploading: isUploadingAvatar } = useUploadAvatar();
  const {
    allMedia,
    handleUploadMedia,
    handleUpdateMedia,
    isUploading: isUploadingMedia,
    isUpdating: isUpdatingMedia,
  } = useTutorMedia(effectiveUserId);
  const [updateUserProfile, { isLoading: isUpdatingProfile }] = useUpdateUserProfileMutation();

  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>("VideoIntro");
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null); // For editing existing media
  const [isImageViewOpen, setIsImageViewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  // Get video and certificates from media list
  const videoIntro = allMedia.find((m) => m.type === "VideoIntro");
  const certificates = allMedia.filter((m) => m.type === "Award");

  // Handlers
  const handleAvatarUpload = async (file: File) => {
    if (!effectiveUserId) return null;
    const avatarUrl = await handleUploadAvatar(effectiveUserId, file);
    if (avatarUrl) {
      refetch();
    }
    return avatarUrl;
  };

  const openMediaModal = (type: MediaType, mediaId?: string) => {
    setSelectedMediaType(type);
    setSelectedMediaId(mediaId || null);
    setIsMediaModalOpen(true);
  };

  const closeMediaModal = () => {
    setIsMediaModalOpen(false);
    setSelectedMediaId(null);
  };

  const handleMediaUpload = async (
    file: File,
    title: string,
    type: MediaType,
    mediaId?: string
  ) => {
    if (mediaId) {
      // Update existing media
      await handleUpdateMedia(mediaId, title, type, file);
    } else {
      // Upload new media
      await handleUploadMedia(file, title, type);
    }
  };

  const handleViewImage = (url: string, title: string) => {
    setSelectedImage({ url, title });
    setIsImageViewOpen(true);
  };

  const closeImageView = () => {
    setIsImageViewOpen(false);
    setSelectedImage(null);
  };

  // Handle profile update with subjects logic
  const handleUpdateProfile = async (formData: {
    fullName: string;
    phone: string;
    location: string;
    educationLevel: string;
    yearsOfExperience: number;
    bio: string;
    subjects: string[];
    languages: string[];
  }) => {
    if (!effectiveUserId) {
      toast.error("Không tìm thấy thông tin người dùng");
      return;
    }

    try {
      setIsSaving(true);

      // Get existing subjects from userData
      const existingSubjects = userData?.tutor?.subjects || [];

      // Merge existing subjects with new ones (only add, don't remove)
      const mergedSubjects = [...new Set([...existingSubjects, ...formData.subjects])];

      const updateData = {
        userId: effectiveUserId,
        fullName: formData.fullName,
        tutor: {
          educationLevel: formData.educationLevel,
          yearsOfExperience: formData.yearsOfExperience,
          bio: formData.bio,
          subjects: mergedSubjects,
          languages: formData.languages,
          location: formData.location,
          phone: formData.phone,
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

  return {
    // Data
    userData: userData || undefined,
    videoIntro,
    certificates,
    allMedia,
    userId: effectiveUserId,

    // Loading states
    isLoading,
    isUploadingAvatar,
    isUploadingMedia,
    isUpdatingMedia,
    isSaving: isSaving || isUpdatingProfile,

    // Edit states
    isEditing,
    setIsEditing,
    setIsSaving,

    // Modal states
    isMediaModalOpen,
    selectedMediaType,
    selectedMediaId,
    isImageViewOpen,
    selectedImage,

    // Handlers
    handleAvatarUpload,
    handleUpdateProfile,
    openMediaModal,
    closeMediaModal,
    handleMediaUpload,
    handleViewImage,
    closeImageView,
    refetch,
  };
};
