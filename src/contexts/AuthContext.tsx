"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, clearUser, setLoading } from "@/redux/slices/auth.slice";
import { StorageService } from "@/services/storage/secureStorage.service";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [hasInitialized, setHasInitialized] = React.useState(false);

  const publicRoutes = ["/login", "/register", "/forgot-password", "/"];
  const isPublicRoute = publicRoutes.includes(pathname);

  const checkAuthStatus = React.useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const accessToken = await StorageService.getAccessToken();
      const userData = await StorageService.getUserData();

      if (accessToken && userData) {
        dispatch(setUser(userData));
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      dispatch(clearUser());
    } finally {
      dispatch(setLoading(false));
      setHasInitialized(true);
    }
  }, [dispatch]);

  const handleRouting = React.useCallback(() => {
    if (!hasInitialized || isLoading) return;

    if (isAuthenticated) {
      if (isPublicRoute && pathname !== "/") {
        router.replace("/home");
      } else if (pathname === "/") {
        router.replace("/home");
      }
    } else {
      if (!isPublicRoute) {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, isLoading, isPublicRoute, pathname, router, hasInitialized]);

  useEffect(() => {
    if (!hasInitialized) {
      checkAuthStatus();
    }
  }, [checkAuthStatus, hasInitialized]);

  useEffect(() => {
    if (hasInitialized && !isLoading) {
      handleRouting();
    }
  }, [isAuthenticated, isLoading, handleRouting, hasInitialized]);

  const login = async (userData: any) => {
    dispatch(setUser(userData));
    router.replace("/home");
  };

  const logout = async () => {
    try {
      await StorageService.clearAuthData();
      dispatch(clearUser());
      router.replace("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
