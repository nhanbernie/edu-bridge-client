import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/services/auth/auth.service";
import { setLoading } from "@/redux/slices/auth.slice";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthStorage } from "@/hooks/useAuthStorage";
import { toast } from "sonner";

const useLoginSubmit = () => {
  const dispatch = useAppDispatch();
  const [loginMutation] = useLoginMutation();
  const { login } = useAuth();
  const { saveAuthData } = useAuthStorage();

  return useCallback(
    async (data: { email: string; password: string }) => {
      try {
        dispatch(setLoading(true));
        const result = await loginMutation(data).unwrap();

        if (result.success && result.data) {
          // Use useAuthStorage hook to save auth data
          const storedUserData = await saveAuthData(result.data);

          toast.success(result.message || "Login successful");

          // Use AuthContext login method for routing
          login(storedUserData);
        } else {
          throw new Error(result.message || "Login failed");
        }
      } catch (error: any) {
        let errorMessage = "Login failed. Please try again.";
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, loginMutation, login, saveAuthData]
  );
};

export default useLoginSubmit;
