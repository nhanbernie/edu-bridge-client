import { useRouter } from "next/navigation";
import { useSelectRoleMutation } from "@/services/user";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { StudentOnboardingRequest } from "@/services/api/type";
import { StorageService } from "@/services/storage/secureStorage.service";
import { toast } from "sonner";

interface StudentFormData {
  grade: string;
  learningGoal: string;
}

export const useStudentOnboarding = () => {
  const router = useRouter();
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
        router.push("/login");
        return { success: false, message: "User not found" };
      }

      if (isTokenExpired) {
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        router.push("/login");
        return { success: false, message: "Token expired" };
      }

      const payload: StudentOnboardingRequest = {
        role: "STUDENT",
        student: data,
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
      console.error("Student onboarding error:", err);
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
