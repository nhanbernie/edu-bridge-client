import { useRefreshTokenMutation } from "@/services/auth";
import { StorageService } from "@/services/storage/secureStorage.service";

/**
 * Custom hook for manual token refresh
 * Can be used for various scenarios: role changes, forced refresh, etc.
 */
export const useRefreshToken = () => {
  const [refreshTokenMutation] = useRefreshTokenMutation();

  const refreshToken = async (): Promise<boolean> => {
    try {
      const currentRefreshToken = await StorageService.getRefreshToken();

      if (currentRefreshToken) {
        const refreshResult = await refreshTokenMutation({
          refreshToken: currentRefreshToken,
        }).unwrap();

        if (refreshResult.success && refreshResult.data) {
          await StorageService.setAccessToken(refreshResult.data.accessToken);
          await StorageService.setRefreshToken(refreshResult.data.refreshToken);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Manual token refresh failed:", error);
      return false;
    }
  };

  return { refreshToken };
};
