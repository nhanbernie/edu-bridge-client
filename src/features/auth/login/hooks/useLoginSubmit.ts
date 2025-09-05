import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/services/auth/auth.service";
import { setLoading, setUser } from "@/redux/slices/auth.slice";
import { useRouter } from "next/navigation";
import { StorageService } from "@/services/storage/secureStorage.service";
import { toast } from "sonner";

const useLoginSubmit = () => {
  const dispatch = useAppDispatch();
  const [loginMutation] = useLoginMutation();
  const router = useRouter();

  return useCallback(
    async (data: { email: string; password: string }) => {
      try {
        dispatch(setLoading(true));
        const result = await loginMutation(data).unwrap();
        if (result.success && result.data) {
          await StorageService.setTokenData({
            access_token: result.data.accessToken,
            refresh_token: result.data.refreshToken,
            expires_in: 900, // 15 minutes
          });

          // Create StoredUserData from UserDto
          const storedUserData = {
            id: result.data.user.userId,
            username: result.data.user.email,
            email: result.data.user.email,
            roles: [result.data.user.role],
            fullName: result.data.user.fullName || undefined,
          };

          toast.success(result.message || "Login successful");
          dispatch(setUser(storedUserData));
          router.push("/"); // Redirect to home page
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
    [dispatch, loginMutation, router]
  );
};

export default useLoginSubmit;
