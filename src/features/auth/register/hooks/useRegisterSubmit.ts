import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useRegisterMutation } from "@/services/auth/auth.service";
import { setLoading } from "@/redux/slices/auth.slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useRegisterSubmit = () => {
  const dispatch = useAppDispatch();
  const [registerMutation] = useRegisterMutation();
  const router = useRouter();

  return useCallback(
    async (data: { email: string; password: string; fullName: string }) => {
      try {
        dispatch(setLoading(true));
        const result = await registerMutation(data).unwrap();
        if (result.success && result.data) {
          toast.success(result.message || "Registration successful");
          // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
          router.push("/login");
        } else {
          throw new Error(result.message || "Registration failed");
        }
      } catch (error: any) {
        let errorMessage = "Registration failed. Please try again.";
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, registerMutation, router]
  );
};

export default useRegisterSubmit;
