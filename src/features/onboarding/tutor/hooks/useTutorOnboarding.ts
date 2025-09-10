import { useRouter } from "next/navigation";
import { useSelectRoleMutation } from "@/services/user";
import { TutorOnboardingRequest } from "@/services/api/type";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";

interface TutorFormData {
  educationLevel: string;
  yearsOfExperience: number;
  bio: string;
  subjects: string;
  languages: string;
  hourlyRate: number;
}

export const useTutorOnboarding = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [selectRole, { isLoading, error }] = useSelectRoleMutation();

  const submitOnboarding = async (data: TutorFormData) => {
    if (!user?.userId) {
      toast.error("Không tìm thấy thông tin người dùng");
      return;
    }

    try {
      const payload: TutorOnboardingRequest = {
        role: "TUTOR",
        tutor: {
          ...data,
          verifiedStatus: "PENDING", // Hidden field as requested
        },
      };

      const result = await selectRole({
        userId: user.userId,
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
