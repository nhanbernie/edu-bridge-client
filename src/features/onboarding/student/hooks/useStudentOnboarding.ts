import { useLocaleRouter } from "@/hooks/useLocaleRouter";

import { useSelectRoleMutation } from "@/services/user";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { StudentOnboardingRequest } from "@/services/api/type";
import { StorageService } from "@/services/storage/secureStorage.service";
import { toast } from "sonner";
import { ROUTES } from "@/common/constants/route.constant";

interface StudentFormData {
  grade: string;
  learningGoal: string;
  location: string;
}

export const useStudentOnboarding = () => {
  const { push } = useLocaleRouter();
  const [selectRole, { isLoading, error }] = useSelectRoleMutation();
  const { refreshToken } = useRefreshToken();

  const submitOnboarding = async (
    data: StudentFormData
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

      const payload: StudentOnboardingRequest = {
        role: "STUDENT",
        student: {
          grade: data.grade,
          learningGoal: data.learningGoal,
          location: data.location,
        },
      };

      const result = await selectRole({
        userId: userData.userId,
        data: payload,
      }).unwrap();

      if (result.success) {
        toast.success("Thiết lập hồ sơ thành công!");

        // Refresh token to get updated role
        const refreshSuccess = await refreshToken();

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
