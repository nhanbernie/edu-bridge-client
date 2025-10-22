"use client";

import React, { createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, clearUser, setLoading } from "@/redux/slices/auth.slice";
import { StorageService } from "@/services/storage/secureStorage.service";
import { useRoleGuard, UserRole, UserStatus } from "@/hooks/useRoleGuard";

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
  const { push } = useLocaleRouter();
  const pathname = usePathname();
  const [hasInitialized, setHasInitialized] = React.useState(false);
  const { getDefaultRouteForRole } = useRoleGuard();

  const publicRoutes = ["/login", "/register", "/forgot-password", "/"];
  // Check if current pathname (with locale) matches any public route
  const isPublicRoute = publicRoutes.some((route) => {
    // Remove locale from pathname for comparison (e.g., /en/login -> /login)
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");
    return pathWithoutLocale === route;
  });

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
      dispatch(clearUser());
    } finally {
      dispatch(setLoading(false));
      setHasInitialized(true);
    }
  }, [dispatch]);

  const handleRouting = React.useCallback(() => {
    if (!hasInitialized || isLoading) return;

    if (isAuthenticated && user) {
      // Only redirect if on public route (including "/")
      if (isPublicRoute) {
        const defaultRoute = getDefaultRouteForRole(
          user.role as UserRole,
          user.status as UserStatus
        );
        push(defaultRoute);
      }
    } else {
      if (!isPublicRoute) {
        push("/login");
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    isPublicRoute,
    pathname,
    push,
    hasInitialized,
    user,
    getDefaultRouteForRole,
  ]);

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
    // Redirect to appropriate route based on user role and status
    const defaultRoute = getDefaultRouteForRole(
      userData.role as UserRole,
      userData.status as UserStatus
    );
    push(defaultRoute);
  };

  const logout = async () => {
    try {
      await StorageService.clearAuthData();
      dispatch(clearUser());
      push("/login");
    } catch (error) {
      // Ignore error
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
