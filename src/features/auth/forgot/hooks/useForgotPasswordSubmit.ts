import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useForgotPasswordMutation } from "@/services/auth/auth.service";
import { setLoading } from "@/redux/slices/auth.slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useForgotPasswordSubmit = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [forgotPasswordMutation] = useForgotPasswordMutation();

  return useCallback(
    async (data: { email: string }) => {
      try {
        dispatch(setLoading(true));
        const result = await forgotPasswordMutation(data).unwrap();

        if (result.success) {
          toast.success(result.message || "OTP đã được gửi đến email của bạn");
        } else {
          throw new Error(result.message || "Không thể gửi OTP");
        }
      } catch (error: any) {
        let errorMessage = "Không thể gửi OTP. Vui lòng thử lại.";
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, forgotPasswordMutation]
  );
};

export default useForgotPasswordSubmit;
