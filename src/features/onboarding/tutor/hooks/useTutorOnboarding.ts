import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { useSelectRoleMutation } from "@/services/user";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { TutorOnboardingRequest } from "@/services/api/type";
import { StorageService } from "@/services/storage/secureStorage.service";
import { toast } from "sonner";
import { ROUTES } from "@/common/constants/route.constant";
import { useState } from "react";
import { useGetAndStoreUser } from "@/hooks/useGetAndStoreUser";

export interface TutorFormData {
  educationLevel: string;
  yearsOfExperience: number | undefined;
  bio: string;
  subjects: string[];
  languages: string[];
  location: string;
}

export const useTutorOnboarding = () => {
  const { push } = useLocaleRouter();
  const [selectRole, { isLoading, error }] = useSelectRoleMutation();
  const { refreshToken } = useRefreshToken();
  const [userId, setUserId] = useState<string>("");

  // Hook tự động fetch và store user data
  const { refetch: refetchUser } = useGetAndStoreUser({
    userId: userId,
    enabled: false, // Disable auto-fetch, chỉ dùng refetch manual
  });

  const submitOnboarding = async (
    data: TutorFormData
  ): Promise<{ success: boolean; message?: string; needsRefresh?: boolean }> => {
    try {
      const userData = await StorageService.getUserData();
      const isTokenExpired = await StorageService.isTokenExpired();

      if (!userData?.userId) {
        toast.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        push(ROUTES.LOGIN);
        return { success: false, message: "User not found" };
      }

      if (isTokenExpired) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        push(ROUTES.LOGIN);
        return { success: false, message: "Token expired" };
      }

      const payload: TutorOnboardingRequest = {
        role: "TUTOR",
        tutor: {
          educationLevel: data.educationLevel,
          yearsOfExperience: data.yearsOfExperience || 0, // Default to 0 if undefined
          bio: data.bio,
          subjects: data.subjects,
          languages: data.languages,
          location: data.location,
        },
      };
      const result = await selectRole({
        userId: userData.userId,
        data: payload,
      }).unwrap();

      if (result.success) {
        toast.success("Thiết lập hồ sơ gia sư thành công!");

        // Step 1: Refresh token to get updated role
        const refreshSuccess = await refreshToken();

        if (refreshSuccess) {
          try {
            // Step 2: Set userId để enable hook, sau đó refetch
            // Hook useGetAndStoreUser sẽ tự động fetch và lưu vào localStorage
            setUserId(userData.userId);
            await refetchUser();

            return {
              success: true,
              message: result.message,
              needsRefresh: true,
            };
          } catch (fetchError) {
            // Vẫn return success vì role đã update, chỉ việc fetch data bị lỗi
          }
        }

        return {
          success: true,
          message: result.message,
          needsRefresh: refreshSuccess,
        };
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi thiết lập hồ sơ");
        return { success: false, message: result.message };
      }
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Có lỗi xảy ra khi thiết lập hồ sơ";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  return {
    submitOnboarding,
    isLoading,
    error,
  };
};
