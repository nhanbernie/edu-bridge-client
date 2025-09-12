import { useRouter } from "next/navigation";
import { useSelectRoleMutation } from "@/services/user";
import { useRefreshTokenMutation } from "@/services/auth";
import { TutorOnboardingRequest } from "@/services/api/type";
import { StorageService } from "@/services/storage/secureStorage.service";
import { toast } from "sonner";

export interface TutorFormData {
  educationLevel: string;
  yearsOfExperience: number;
  bio: string;
  subjects: string;
  languages: string;
  hourlyRate: number;
}

export const useTutorOnboarding = () => {
  const router = useRouter();
  const [selectRole, { isLoading, error }] = useSelectRoleMutation();
  const [refreshToken] = useRefreshTokenMutation();

  const submitOnboarding = async (
    data: TutorFormData
  ): Promise<{ success: boolean; message?: string; needsRefresh?: boolean }> => {
    try {
      const userData = await StorageService.getUserData();
      const isTokenExpired = await StorageService.isTokenExpired();

      if (!userData?.id) {
        toast.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        router.push("/login");
        return { success: false, message: "User not found" };
      }

      if (isTokenExpired) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        router.push("/login");
        return { success: false, message: "Token expired" };
      }

      const payload: TutorOnboardingRequest = {
        role: "TUTOR",
        tutor: data,
      };
      const result = await selectRole({
        userId: userData.id,
        data: payload,
      }).unwrap();

      if (result.success) {
        toast.success("Thiết lập hồ sơ gia sư thành công!");

        try {
          const currentRefreshToken = await StorageService.getRefreshToken();

          if (currentRefreshToken) {
            const refreshResult = await refreshToken({
              refreshToken: currentRefreshToken,
            }).unwrap();

            if (refreshResult.success && refreshResult.data) {
              await StorageService.setAccessToken(refreshResult.data.accessToken);
              await StorageService.setRefreshToken(refreshResult.data.refreshToken);
            }

            return {
              success: true,
              message: result.message,
              needsRefresh: true,
            };
          } else {
            return {
              success: true,
              message: result.message,
              needsRefresh: false,
            };
          }
        } catch (refreshError) {
          return {
            success: true,
            message: result.message,
            needsRefresh: false,
          };
        }
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi thiết lập hồ sơ");
        return { success: false, message: result.message };
      }
    } catch (err: any) {
      console.error("Tutor onboarding error:", err);
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
