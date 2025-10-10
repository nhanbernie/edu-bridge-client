import { useGetUserQuery } from "@/services/user/user.service";

interface UseGetUserProps {
  userId: string;
  enabled?: boolean;
}

export const useGetUser = ({ userId, enabled = true }: UseGetUserProps) => {
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useGetUserQuery(
    { userId },
    {
      skip: !userId || !enabled,
    }
  );

  return {
    userData: userData?.data,
    isLoading,
    error,
    refetch,
  };
};
