import { useState, useCallback } from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { useAppDispatch } from "@/redux/hooks";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
} from "@/services/auth/auth.service";
import { setLoading } from "@/redux/slices/auth.slice";
import { toast } from "sonner";
import { ROUTES } from "@/common/constants/route.constant";

type ForgotPasswordStep = "email" | "otp" | "reset";

const useForgotPasswordFlow = () => {
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState<string>("");
  const { push } = useLocaleRouter();

  const dispatch = useAppDispatch();
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const [verifyOtpMutation] = useVerifyOtpMutation();
  const [resetPasswordMutation] = useResetPasswordMutation();
  const [resendOtpMutation] = useResendOtpMutation();
  const [isResending, setIsResending] = useState(false);

  // Step 1: Send OTP to email
  const handleEmailSubmit = useCallback(
    async (data: { email: string }) => {
      try {
        dispatch(setLoading(true));
        setEmail(data.email);

        const result = await forgotPasswordMutation(data).unwrap();

        if (result.success) {
          toast.success(result.message || "OTP đã được gửi đến email của bạn");
          setStep("otp");
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

  // Step 2: Verify OTP
  const handleOtpSubmit = useCallback(
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
          setStep("reset");
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

  // Step 3: Reset Password
  const handleResetSubmit = useCallback(
    async (data: { password: string; confirmPassword: string }) => {
      try {
        dispatch(setLoading(true));

        // Get token from sessionStorage
        const token = sessionStorage.getItem("resetToken");
        if (!token) {
          throw new Error("Token không hợp lệ. Vui lòng thử lại từ đầu.");
        }

        if (!email) {
          throw new Error("Email không hợp lệ.");
        }

        const result = await resetPasswordMutation({
          email,
          token,
          newPassword: data.password,
        }).unwrap();

        if (result.success) {
          toast.success(result.message || "Mật khẩu đã được đặt lại thành công");
          // Clear the token
          sessionStorage.removeItem("resetToken");
          push(ROUTES.LOGIN);
        } else {
          throw new Error(result.message || "Đặt lại mật khẩu thất bại");
        }
      } catch (error: any) {
        let errorMessage = "Đặt lại mật khẩu thất bại. Vui lòng thử lại.";
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, push, resetPasswordMutation, email]
  );

  // Resend OTP
  const handleResendOtp = useCallback(async () => {
    if (!email) return;

    try {
      setIsResending(true);
      dispatch(setLoading(true));
      const result = await resendOtpMutation({ email }).unwrap();

      if (result.success) {
        toast.success(result.message || "OTP đã được gửi lại");
      } else {
        throw new Error(result.message || "Không thể gửi lại OTP");
      }
    } catch (error: any) {
      let errorMessage = "Không thể gửi lại OTP. Vui lòng thử lại.";
      if (error?.data?.message) errorMessage = error.data.message;
      else if (error?.message) errorMessage = error.message;
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
      dispatch(setLoading(false));
    }
  }, [dispatch, resendOtpMutation, email]);

  return {
    step,
    email,
    isResending,
    handleEmailSubmit,
    handleOtpSubmit,
    handleResetSubmit,
    handleResendOtp,
  };
};

export default useForgotPasswordFlow;
