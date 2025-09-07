"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/register", "/forgot-password", "/"];
  const isPublicRoute = publicRoutes.includes(pathname);

  const handleRouting = React.useCallback(() => {
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
  }, [isAuthenticated, isPublicRoute, pathname, router]);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      handleRouting();
    }
  }, [isAuthenticated, isLoading, pathname, handleRouting]);

  const checkAuthStatus = async () => {
    try {
      const accessToken = await StorageService.getAccessToken();
      const userData = await StorageService.getUserData();

      if (accessToken && userData) {
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
    router.replace("/home");
  };

  const logout = async () => {
    try {
      await StorageService.clearAuthData();
      setIsAuthenticated(false);
      setUser(null);
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
