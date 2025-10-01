import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/services/auth/auth.service";
import { setLoading } from "@/redux/slices/auth.slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useVerifyOtpSubmit = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [verifyOtpMutation] = useVerifyOtpMutation();
  const [resendOtpMutation] = useResendOtpMutation();

  return useCallback(
    async (data: { email: string; otp: string }) => {
      try {
        dispatch(setLoading(true));
        const result = await verifyOtpMutation({
          email: data.email,
          otpCode: data.otp,
        }).unwrap();

        if (result.success && result.data) {
          toast.success(result.message || "Xác thực OTP thành công");
          // Store the token temporarily for reset password
          sessionStorage.setItem("resetToken", result.data);
        } else {
          throw new Error(result.message || "Xác thực OTP thất bại");
        }
      } catch (error: any) {
        let errorMessage = "Xác thực OTP thất bại. Vui lòng thử lại.";
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, verifyOtpMutation]
  );
};

export default useVerifyOtpSubmit;
