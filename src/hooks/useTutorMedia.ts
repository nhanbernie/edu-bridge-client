"use client";

import {
  useUploadMediaMutation,
  useGetMediaQuery,
  useUpdateMediaMutation,
} from "@/services/user/user.service";
import { MediaType } from "@/services/user/types/media.type";
import { toast } from "sonner";
import { useMemo } from "react";

export const useTutorMedia = (tutorId: string, filterType?: MediaType) => {
  const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();
  const [updateMedia, { isLoading: isUpdating }] = useUpdateMediaMutation();

  const {
    data: mediaData,
    isLoading,
    error,
    refetch,
  } = useGetMediaQuery(
    { tutorId },
    {
      skip: !tutorId,
    }
  );

  // Filter media by type if filterType is provided
  const filteredMediaList = useMemo(() => {
    if (!mediaData?.data) return [];
    if (!filterType) return mediaData.data;
    return mediaData.data.filter((item) => item.type === filterType);
  }, [mediaData, filterType]);

  const handleUploadMedia = async (file: File, title: string, mediaType: MediaType) => {
    try {
      // Validate file type based on media type
      if (mediaType === "Award") {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
          toast.error("Vui lòng chọn file ảnh (JPEG, PNG, GIF, WEBP)");
          return null;
        }
        // Max 5MB for images
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          toast.error("Kích thước ảnh không được vượt quá 5MB");
          return null;
        }
      } else if (mediaType === "VideoIntro") {
        const allowedTypes = ["video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo"];
        if (!allowedTypes.includes(file.type)) {
          toast.error("Vui lòng chọn file video (MP4, MPEG, MOV, AVI)");
          return null;
        }
        // Max 50MB for videos
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
          toast.error("Kích thước video không được vượt quá 50MB");
          return null;
        }
      }

      const response = await uploadMedia({
        tutorId,
        file,
        title,
        type: mediaType,
      }).unwrap();

      if (response.success) {
        toast.success(
          mediaType === "Award"
            ? "Tải lên giải thưởng thành công!"
            : "Tải lên video giới thiệu thành công!"
        );
        refetch(); // Refetch media list
        return response.data;
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi tải file lên");
        return null;
      }
    } catch (error: any) {
      console.error("Upload media error:", error);
      toast.error(error?.data?.message || "Có lỗi xảy ra khi tải file lên");
      return null;
    }
  };

  const handleUpdateMedia = async (
    mediaId: string,
    title: string,
    mediaType: MediaType,
    file?: File
  ) => {
    try {
      // Validate file if provided
      if (file) {
        if (mediaType === "Award") {
          const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
          if (!allowedTypes.includes(file.type)) {
            toast.error("Vui lòng chọn file ảnh (JPEG, PNG, GIF, WEBP)");
            return null;
          }
          const maxSize = 5 * 1024 * 1024;
          if (file.size > maxSize) {
            toast.error("Kích thước ảnh không được vượt quá 5MB");
            return null;
          }
        } else if (mediaType === "VideoIntro") {
          const allowedTypes = ["video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo"];
          if (!allowedTypes.includes(file.type)) {
            toast.error("Vui lòng chọn file video (MP4, MPEG, MOV, AVI)");
            return null;
          }
          const maxSize = 50 * 1024 * 1024;
          if (file.size > maxSize) {
            toast.error("Kích thước video không được vượt quá 50MB");
            return null;
          }
        }
      }

      const response = await updateMedia({
        tutorId,
        mediaId,
        file,
        title,
        type: mediaType,
      }).unwrap();

      if (response.success) {
        toast.success(
          mediaType === "Award" ? "Cập nhật giải thưởng thành công!" : "Cập nhật video thành công!"
        );
        refetch(); // Refetch media list
        return response.data;
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi cập nhật");
        return null;
      }
    } catch (error: any) {
      console.error("Update media error:", error);
      toast.error(error?.data?.message || "Có lỗi xảy ra khi cập nhật");
      return null;
    }
  };

  return {
    mediaList: filteredMediaList,
    allMedia: mediaData?.data || [],
    isLoading,
    isUploading,
    isUpdating,
    error,
    handleUploadMedia,
    handleUpdateMedia,
    refetch,
  };
};
