import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { StorageService } from "@/services/storage/secureStorage.service";
import { UserDto } from "@/services/api/type";

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
  const router = useRouter();

  const getUserData = useCallback(async (): Promise<UserDto | null> => {
    try {
      return await StorageService.getUserData();
    } catch (error) {
      console.error("Error getting user data:", error);
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
      return "/home";
    }

    // If user is approved, route based on role
    switch (role) {
      case "ADMIN":
        return "/admin";
      case "STUDENT":
        return "/student";
      case "TUTOR":
        return "/tutor";
      default:
        return "/home";
    }
  }, []);

  const redirectToRoleRoute = useCallback(async () => {
    const userData = await getUserData();
    if (userData) {
      const defaultRoute = getDefaultRouteForRole(
        userData.role as UserRole,
        userData.status as UserStatus
      );
      router.replace(defaultRoute);
    }
  }, [getUserData, getDefaultRouteForRole, router]);

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
          router.replace(defaultRoute);
        } else {
          // No user data, redirect to login
          router.replace("/login");
        }
      }
    },
    [checkRoleAccess, getUserData, getDefaultRouteForRole, router]
  );

  return {
    getUserData,
    checkRoleAccess,
    getDefaultRouteForRole,
    redirectToRoleRoute,
    guardRoute,
  };
};
