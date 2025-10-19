import { useState, useCallback } from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { useAppDispatch } from "@/redux/hooks";
import {
  useRegisterMutation,
  useSendOtpRegisterMutation,
  useVerifyOtpRegisterMutation,
} from "@/services/auth/auth.service";
import { setLoading } from "@/redux/slices/auth.slice";
import { toast } from "sonner";
import { ROUTES } from "@/common/constants/route.constant";

type RegisterStep = "register" | "verifyEmail";

const useRegisterFlow = () => {
  const [step, setStep] = useState<RegisterStep>("register");
  const [email, setEmail] = useState<string>("");
  const { push } = useLocaleRouter();

  const dispatch = useAppDispatch();
  const [registerMutation] = useRegisterMutation();
  const [sendOtpRegisterMutation] = useSendOtpRegisterMutation();
  const [verifyOtpRegisterMutation] = useVerifyOtpRegisterMutation();
  const [isResending, setIsResending] = useState(false);

  // Step 1: Register user (API auto sends OTP)
  const handleRegisterSubmit = useCallback(
    async (data: { email: string; password: string; fullName: string }) => {
      try {
        dispatch(setLoading(true));
        setEmail(data.email);

        const registerPayload = {
          email: data.email,
          password: data.password,
          fullName: data.fullName,
        };

        const result = await registerMutation(registerPayload).unwrap();

        if (result.success && result.data) {
          toast.success(
            result.message || "Đăng ký thành công! Mã OTP đã được gửi đến email của bạn"
          );
          setStep("verifyEmail");
        } else {
          throw new Error(result.message || "Đăng ký thất bại");
        }
      } catch (error: any) {
        let errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, registerMutation]
  );

  // Step 2: Verify email OTP
  const handleVerifyOtpSubmit = useCallback(
    async (data: { email: string; otp: string }) => {
      try {
        dispatch(setLoading(true));
        const result = await verifyOtpRegisterMutation({
          email: data.email,
          otpCode: data.otp,
        }).unwrap();

        if (result.success && result.data) {
          toast.success(
            result.message || "Xác thực email thành công. Bây giờ bạn có thể đăng nhập."
          );
          push(ROUTES.LOGIN);
        } else {
          throw new Error(result.message || "Xác thực email thất bại");
        }
      } catch (error: any) {
        let errorMessage = "Xác thực email thất bại. Vui lòng thử lại.";
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, verifyOtpRegisterMutation, push]
  );

  // Resend OTP
  const handleResendOtp = useCallback(async () => {
    if (!email) return;

    try {
      setIsResending(true);
      dispatch(setLoading(true));
      const result = await sendOtpRegisterMutation({ email }).unwrap();

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
  }, [dispatch, sendOtpRegisterMutation, email]);

  return {
    step,
    email,
    isResending,
    handleRegisterSubmit,
    handleVerifyOtpSubmit,
    handleResendOtp,
  };
};

export default useRegisterFlow;
