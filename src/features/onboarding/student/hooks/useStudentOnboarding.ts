import { useRouter } from "next/navigation";
import { useSelectRoleMutation } from "@/services/user";
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

  const submitOnboarding = async (data: StudentFormData) => {
    try {
      const userData = await StorageService.getUserData();

      if (!userData?.userId) {
        toast.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        router.push("/login");
        return;
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
        // Redirect to dashboard or appropriate page
        router.push("/home");
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi thiết lập hồ sơ");
      }
    } catch (err: any) {
      console.error("Student onboarding error:", err);
      toast.error(err?.data?.message || "Có lỗi xảy ra khi thiết lập hồ sơ");
    }
  };

  return {
    submitOnboarding,
    isLoading,
    error,
  };
};
