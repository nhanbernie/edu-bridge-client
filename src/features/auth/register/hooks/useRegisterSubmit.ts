import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useRegisterMutation } from "@/services/auth/auth.service";
import { setLoading } from "@/redux/slices/auth.slice";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { toast } from "sonner";
import { ROUTES } from "@/common/constants/route.constant";

const useRegisterSubmit = () => {
  const dispatch = useAppDispatch();
  const [registerMutation] = useRegisterMutation();
  const { push } = useLocaleRouter();

  return useCallback(
    async (data: { email: string; password: string; fullName: string }) => {
      try {
        dispatch(setLoading(true));
        const { email, password, fullName } = data;
        const registerPayload = {
          email,
          password,
          fullName,
        };
        const result = await registerMutation(registerPayload).unwrap();
        if (result.success && result.data) {
          toast.success(result.message || "Registration successful");
          push(ROUTES.LOGIN);
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
    [dispatch, registerMutation, push]
  );
};

export default useRegisterSubmit;
