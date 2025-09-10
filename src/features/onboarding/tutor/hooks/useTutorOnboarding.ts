import { useRouter } from "next/navigation";
import { useSelectRoleMutation } from "@/services/user";
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

  const submitOnboarding = async (data: TutorFormData) => {
    try {
      const userData = await StorageService.getUserData();

      if (!userData?.id) {
        toast.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        router.push("/login");
        return;
      }

      const payload: TutorOnboardingRequest = {
        role: "TUTOR",
        tutor: {
          ...data,
          verifiedStatus: "PENDING", // Hidden field
        },
      };

      const result = await selectRole({
        userId: userData.id,
        data: payload,
      }).unwrap();

      if (result.success) {
        toast.success("Thiết lập hồ sơ gia sư thành công!");
        // Redirect to dashboard or appropriate page
        router.push("/home");
      } else {
        toast.error(result.message || "Có lỗi xảy ra khi thiết lập hồ sơ");
      }
    } catch (err: any) {
      console.error("Tutor onboarding error:", err);
      toast.error(err?.data?.message || "Có lỗi xảy ra khi thiết lập hồ sơ");
    }
  };

  return {
    submitOnboarding,
    isLoading,
    error,
  };
};
