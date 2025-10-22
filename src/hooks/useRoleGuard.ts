import { useCallback } from "react";
import { useLocaleRouter } from "./useLocaleRouter";
import { StorageService } from "@/services/storage/secureStorage.service";
import { UserDto } from "@/services/api/type";
import { ROUTES } from "@/common/constants/route.constant";

export type UserRole = "ADMIN" | "STUDENT" | "TUTOR" | "PENDING";
export type UserStatus = "PENDING" | "APPROVED" | "REJECTED";

interface RoleGuardOptions {
  allowedRoles?: UserRole[];
  requiredStatus?: UserStatus[];
  redirectTo?: string;
  fallbackRoute?: string;
}

/**
 * Custom hook for role-based access control
 */
export const useRoleGuard = () => {
  const { push } = useLocaleRouter();

  const getUserData = useCallback(async (): Promise<UserDto | null> => {
    try {
      return await StorageService.getUserData();
    } catch (error) {
      return null;
    }
  }, []);

  const checkRoleAccess = useCallback(
    async (options: RoleGuardOptions): Promise<boolean> => {
      const { allowedRoles, requiredStatus } = options;
      const userData = await getUserData();

      if (!userData) return false;

      // Check role
      if (allowedRoles && !allowedRoles.includes(userData.role as UserRole)) {
        return false;
      }

      // Check status
      if (requiredStatus && !requiredStatus.includes(userData.status as UserStatus)) {
        return false;
      }

      return true;
    },
    [getUserData]
  );

  const getDefaultRouteForRole = useCallback((role: UserRole, status: UserStatus): string => {
    // If user is pending approval, go to home (profile page)
    if (status === "PENDING") {
      return ROUTES.HOME;
    }

    // If user is approved, route based on role
    switch (role) {
      case "ADMIN":
        return ROUTES.ADMIN;
      case "STUDENT":
        return ROUTES.STUDENT;
      case "TUTOR":
        return ROUTES.TUTOR;
      default:
        return ROUTES.HOME;
    }
  }, []);

  const redirectToRoleRoute = useCallback(async () => {
    const userData = await getUserData();
    if (userData) {
      const defaultRoute = getDefaultRouteForRole(
        userData.role as UserRole,
        userData.status as UserStatus
      );
      push(defaultRoute);
    }
  }, [getUserData, getDefaultRouteForRole, push]);

  const guardRoute = useCallback(
    async (options: RoleGuardOptions): Promise<void> => {
      const hasAccess = await checkRoleAccess(options);

      if (!hasAccess) {
        const userData = await getUserData();

        if (userData) {
          // Redirect to appropriate route based on user's role
          const defaultRoute = getDefaultRouteForRole(
            userData.role as UserRole,
            userData.status as UserStatus
          );
          push(defaultRoute);
        } else {
          // No user data, redirect to login
          push(ROUTES.LOGIN);
        }
      }
    },
    [checkRoleAccess, getUserData, getDefaultRouteForRole, push]
  );

  return {
    getUserData,
    checkRoleAccess,
    getDefaultRouteForRole,
    redirectToRoleRoute,
    guardRoute,
  };
};
