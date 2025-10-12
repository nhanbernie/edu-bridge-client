"use client";

import React, { useEffect, useState, useRef } from "react";
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
 * Optimized to avoid showing loading spinner on every navigation
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  requiredStatus,
  fallback = null,
  redirectTo,
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const hasChecked = useRef(false);
  const { checkRoleAccess, guardRoute } = useRoleGuard();

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

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
        setIsAuthorized(false);
      }
    };

    checkAccess();
  }, []);

  return <>{children}</>;
};

export default RoleGuard;
