import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useResetPasswordMutation } from "@/services/auth/auth.service";
import { setLoading } from "@/redux/slices/auth.slice";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { toast } from "sonner";
import { ROUTES } from "@/common/constants/route.constant";

const useResetPasswordSubmit = () => {
  const dispatch = useAppDispatch();
  const { push } = useLocaleRouter();
  const [resetPasswordMutation] = useResetPasswordMutation();

  return useCallback(
    async (data: { password: string; confirmPassword: string }, email?: string) => {
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
          // Redirect to login after successful reset
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
    [dispatch, push, resetPasswordMutation]
  );
};

export default useResetPasswordSubmit;
