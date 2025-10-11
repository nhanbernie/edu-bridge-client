import { useState } from "react";
import { useUserId } from "@/hooks/useUserId";
import { useGetUser } from "@/hooks/useGetUser";
import { useUploadAvatar } from "@/hooks/useUploadAvatar";
import { useTutorMedia } from "@/hooks/useTutorMedia";
import { MediaType } from "@/services/user/types/media.type";

export const useTutorProfile = () => {
  const { userId } = useUserId();
  const { userData, isLoading, refetch } = useGetUser({ userId: userId || "" });
  const { handleUploadAvatar, isUploading: isUploadingAvatar } = useUploadAvatar();
  const {
    allMedia,
    handleUploadMedia,
    isUploading: isUploadingMedia,
  } = useTutorMedia(userId || "");

  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>("VideoIntro");
  const [isImageViewOpen, setIsImageViewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  // Get video and certificates from media list
  const videoIntro = allMedia.find((m) => m.type === "VideoIntro");
  const certificates = allMedia.filter((m) => m.type === "Award");

  // Handlers
  const handleAvatarUpload = async (file: File) => {
    if (!userId) return null;
    const avatarUrl = await handleUploadAvatar(userId, file);
    if (avatarUrl) {
      refetch();
    }
    return avatarUrl;
  };

  const openMediaModal = (type: MediaType) => {
    setSelectedMediaType(type);
    setIsMediaModalOpen(true);
  };

  const closeMediaModal = () => {
    setIsMediaModalOpen(false);
  };

  const handleMediaUpload = async (file: File, title: string, type: MediaType) => {
    await handleUploadMedia(file, title, type);
  };

  const handleViewImage = (url: string, title: string) => {
    setSelectedImage({ url, title });
    setIsImageViewOpen(true);
  };

  const closeImageView = () => {
    setIsImageViewOpen(false);
    setSelectedImage(null);
  };

  return {
    // Data
    userData: userData || undefined,
    videoIntro,
    certificates,
    userId,

    // Loading states
    isLoading,
    isUploadingAvatar,
    isUploadingMedia,
    isSaving,

    // Edit states
    isEditing,
    setIsEditing,
    setIsSaving,

    // Modal states
    isMediaModalOpen,
    selectedMediaType,
    isImageViewOpen,
    selectedImage,

    // Handlers
    handleAvatarUpload,
    openMediaModal,
    closeMediaModal,
    handleMediaUpload,
    handleViewImage,
    closeImageView,
    refetch,
  };
};
