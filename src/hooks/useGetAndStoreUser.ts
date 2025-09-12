import { useEffect } from "react";
import { useGetUserQuery } from "@/services/user/user.service";
import { useAuthStorage } from "./useAuthStorage";
import { UserDto } from "@/services/api/type";

interface UseGetAndStoreUserProps {
  userId: string;
  enabled?: boolean; // Control when to fetch
}

interface UseGetAndStoreUserReturn {
  user: UserDto | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetch: () => void;
}

export const useGetAndStoreUser = ({
  userId,
  enabled = true,
}: UseGetAndStoreUserProps): UseGetAndStoreUserReturn => {
  const { saveUserDataOnly } = useAuthStorage();

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserQuery(
    { userId },
    {
      skip: !enabled || !userId, // Skip if disabled or no userId
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (response?.success && response.data) {
      saveUserDataOnly(response.data);
    }
  }, [response, saveUserDataOnly]);

  return {
    user: response?.data || undefined,
    isLoading,
    isError,
    error,
    refetch,
  };
};
