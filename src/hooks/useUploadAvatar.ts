import { useCallback } from "react";
import { useUploadAvatarMutation } from "@/services/user/user.service";
import { toast } from "sonner";

interface UseUploadAvatarOptions {
  onSuccess?: (avatarUrl: string) => void;
  onError?: (error: string) => void;
}

const FILE_VALIDATION = {
  VALID_TYPES: ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"] as string[],
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ERROR_MESSAGES: {
    NO_FILE: "Vui lòng chọn file",
    INVALID_TYPE: "Chỉ chấp nhận file ảnh (PNG, JPG, JPEG, GIF, WebP)",
    FILE_TOO_LARGE: "Kích thước file không được vượt quá 5MB",
    UPLOAD_FAILED: "Có lỗi xảy ra khi upload avatar",
  },
} as const;

export const useUploadAvatar = (options?: UseUploadAvatarOptions) => {
  const [uploadAvatarMutation, { isLoading: isUploading }] = useUploadAvatarMutation();

  const validateFile = useCallback((file: File | null): string | null => {
    if (!file) {
      return FILE_VALIDATION.ERROR_MESSAGES.NO_FILE;
    }

    if (!FILE_VALIDATION.VALID_TYPES.includes(file.type)) {
      return FILE_VALIDATION.ERROR_MESSAGES.INVALID_TYPE;
    }

    if (file.size > FILE_VALIDATION.MAX_SIZE) {
      return FILE_VALIDATION.ERROR_MESSAGES.FILE_TOO_LARGE;
    }

    return null;
  }, []);

  const uploadAvatar = useCallback(
    async (userId: string, file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        toast.error(validationError);
        options?.onError?.(validationError);
        return;
      }

      try {
        const response = await uploadAvatarMutation({ userId, file }).unwrap();

        if (response.success && response.data) {
          toast.success(response.message || "Upload avatar thành công!");
          options?.onSuccess?.(response.data.avatarUrl);
          return response.data.avatarUrl;
        }

        const error = response.message || FILE_VALIDATION.ERROR_MESSAGES.UPLOAD_FAILED;
        toast.error(error);
        options?.onError?.(error);
      } catch (error: any) {
        console.error("Error uploading avatar:", error);
        const errorMessage =
          error?.data?.message || error?.message || FILE_VALIDATION.ERROR_MESSAGES.UPLOAD_FAILED;
        toast.error(errorMessage);
        options?.onError?.(errorMessage);
      }
    },
    [uploadAvatarMutation, validateFile, options]
  );

  return {
    uploadAvatar,
    isUploading,
  };
};
