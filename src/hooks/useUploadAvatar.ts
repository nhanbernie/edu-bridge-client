import { useUploadAvatarMutation } from "@/services/user/user.service";
import { toast } from "sonner";

export const useUploadAvatar = () => {
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  const handleUploadAvatar = async (userId: string, file: File) => {
    try {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Vui lòng chọn file ảnh (JPEG, PNG, GIF, WEBP)");
        return null;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("Kích thước ảnh không được vượt quá 5MB");
        return null;
      }

      const response = await uploadAvatar({ userId, file }).unwrap();

      if (response.success) {
        toast.success("Cập nhật ảnh đại diện thành công!");
        return response.data?.avatarUrl;
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi tải ảnh lên");
        return null;
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Có lỗi xảy ra khi tải ảnh lên");
      return null;
    }
  };

  return {
    handleUploadAvatar,
    isUploading: isLoading,
  };
};
