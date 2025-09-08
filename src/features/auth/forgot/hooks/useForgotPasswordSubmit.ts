import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setLoading } from "@/redux/slices/auth.slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useForgotPasswordSubmit = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return useCallback(
    async (data: { email: string }) => {
      try {
        dispatch(setLoading(true));

        // TODO: Implement forgot password API call here
        // Example implementation when API is available:
        /*
        const result = await forgotPasswordMutation(data).unwrap();
        if (result.success) {
          toast.success(result.message || 'Password reset link sent to your email');
          router.push('/check-email');
        } else {
          throw new Error(result.message || 'Failed to send reset link');
        }
        */

        // Temporary mock implementation
        console.log("Forgot password submitted:", data);
        toast.success("Password reset link would be sent to your email");
        router.push("/check-email");
      } catch (error: any) {
        let errorMessage = "Failed to send reset link. Please try again.";
        if (error?.data?.message) errorMessage = error.data.message;
        else if (error?.message) errorMessage = error.message;
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, router]
  );
};

export default useForgotPasswordSubmit;
