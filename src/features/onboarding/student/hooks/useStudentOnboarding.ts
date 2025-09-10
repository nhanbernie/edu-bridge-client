import { useRouter } from "next/navigation";
import { useSelectRoleMutation } from "@/services/user";
import { StudentOnboardingRequest } from "@/services/api/type";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";

interface StudentFormData {
  grade: string;
  learningGoal: string;
}

export const useStudentOnboarding = () => {
  const router = useRouter();
  const [selectRole, { isLoading, error }] = useSelectRoleMutation();
  const { user } = useAppSelector((state) => state.auth);

  const submitOnboarding = async (data: StudentFormData) => {
    try {
      if (!user?.userId) {
        toast.error("Không tìm thấy thông tin người dùng");
        return;
      }

      const payload: StudentOnboardingRequest = {
        role: "STUDENT",
        student: data,
      };

      const result = await selectRole({
        userId: user.userId,
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
