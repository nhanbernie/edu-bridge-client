import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/auth.slice";
import { StorageService } from "@/services/storage/secureStorage.service";
import { UserDto } from "@/services/api/type";

interface TokenData {
  accessToken: string;
  refreshToken: string;
  expires_in?: number;
}

interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

/**
 * Custom hook for handling authentication storage operations
 * Saves tokens and user data to storage and Redux
 */
export const useAuthStorage = () => {
  const dispatch = useAppDispatch();

  const saveAuthData = useCallback(
    async (loginData: LoginResponseData) => {
      try {
        // Save token data to storage
        await StorageService.setTokenData({
          access_token: loginData.accessToken,
          refresh_token: loginData.refreshToken,
          expires_in: 900, // 15 minutes default
        });

        // Create StoredUserData from UserDto
        const storedUserData = {
          userId: loginData.user.userId,
          username: loginData.user.email,
          email: loginData.user.email,
          role: loginData.user.role,
          fullName: loginData.user.fullName || undefined,
          status: loginData.user.status,
          tutor: loginData.user.tutor,
          student: loginData.user.student,
        };

        // Save user data to storage
        await StorageService.setUserData(storedUserData);

        // Update Redux state
        dispatch(setUser(storedUserData));

        return storedUserData;
      } catch (error) {
        console.error("Failed to save auth data:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const saveTokenOnly = useCallback(async (tokenData: TokenData) => {
    try {
      await StorageService.setTokenData({
        access_token: tokenData.accessToken,
        refresh_token: tokenData.refreshToken,
        expires_in: tokenData.expires_in || 900,
      });
    } catch (error) {
      console.error("Failed to save token data:", error);
      throw error;
    }
  }, []);

  const saveUserDataOnly = useCallback(
    async (userData: UserDto) => {
      try {
        const storedUserData = {
          userId: userData.userId,
          username: userData.email,
          email: userData.email,
          role: userData.role,
          fullName: userData.fullName || undefined,
          status: userData.status,
          tutor: userData.tutor,
          student: userData.student,
        };

        // Save user data to storage
        await StorageService.setUserData(storedUserData);

        // Update Redux state
        dispatch(setUser(storedUserData));

        return storedUserData;
      } catch (error) {
        console.error("Failed to save user data:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const clearAuthData = useCallback(async () => {
    try {
      await StorageService.clearAuthData();
      dispatch(setUser(null as any)); // Clear user with null
    } catch (error) {
      console.error("Failed to clear auth data:", error);
      throw error;
    }
  }, [dispatch]);

  return {
    saveAuthData,
    saveTokenOnly,
    saveUserDataOnly,
    clearAuthData,
  };
};
