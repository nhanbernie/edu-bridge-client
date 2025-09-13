"use client";

import React, { useEffect, useState } from "react";
import { useRoleGuard, UserRole, UserStatus } from "@/hooks/useRoleGuard";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requiredStatus?: UserStatus[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Component to guard routes based on user roles and status
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  requiredStatus,
  fallback = <div className="flex items-center justify-center min-h-screen">Loading...</div>,
  redirectTo,
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const { checkRoleAccess, guardRoute } = useRoleGuard();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const hasAccess = await checkRoleAccess({
          allowedRoles,
          requiredStatus,
          redirectTo,
        });

        setIsAuthorized(hasAccess);

        if (!hasAccess) {
          await guardRoute({
            allowedRoles,
            requiredStatus,
            redirectTo,
          });
        }
      } catch (error) {
        console.error("Error checking role access:", error);
        setIsAuthorized(false);
      }
    };

    checkAccess();
  }, [allowedRoles, requiredStatus, redirectTo, checkRoleAccess, guardRoute]);

  if (isAuthorized === null) {
    return <>{fallback}</>;
  }

  if (!isAuthorized) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleGuard;
