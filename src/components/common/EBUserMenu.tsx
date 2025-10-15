"use client";

import React, { useState } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { useUserId } from "@/hooks/useUserId";
import { useGetUserQuery } from "@/services/user/user.service";
import { ActionItem } from "./EBActionsMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const EBUserMenu = () => {
  const { logout, user } = useAuth();
  const { push } = useLocaleRouter();
  const { userId } = useUserId();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch user profile with avatar from API if userId is available
  const { data: userProfile, isLoading: isProfileLoading } = useGetUserQuery(
    { userId: userId || "" },
    { skip: !userId }
  );

  // Use avatar from API if available, otherwise fallback to auth state
  const displayUser = userProfile?.data || user;
  const avatarUrl = displayUser?.avatarUrl || displayUser?.avatar;

  // Determine profile route based on user role
  const getProfileRoute = () => {
    const userRole = displayUser?.role || user?.role;
    if (!userRole) return "/";

    const role = userRole.toLowerCase();
    switch (role) {
      case "tutor":
        return "/tutor/profile";
      case "student":
        return "/student/profile";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  const handleProfileClick = () => {
    const profileRoute = getProfileRoute();
    push(profileRoute);
  };

  const userActions: ActionItem[] = [
    {
      label: "Profile",
      icon: User,
      onClick: handleProfileClick,
    },
    {
      label: "Settings",
      icon: Settings,
      onClick: () => {
        // TODO: Navigate to settings page
        console.log("Settings clicked");
      },
    },
    {
      label: "Sign Out",
      icon: LogOut,
      onClick: logout,
      danger: true,
    },
  ];

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out group border border-emerald-500">
          <div className="relative w-9 h-9 rounded-full flex items-center justify-center shadow-sm ring-2 bg-gray-100 ring-white dark:ring-gray-900 group-hover:shadow-md transition-shadow duration-200">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={displayUser?.fullName || displayUser?.name || "User"}
                width={36}
                height={36}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={18} className="text-gray-600 dark:text-gray-400" />
            )}
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl"
      >
        {displayUser && (
          <>
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={displayUser.fullName || displayUser.name || "User"}
                      width={40}
                      height={40}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {displayUser.fullName || displayUser.name || "User"}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {displayUser.email}
                  </p>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator className="my-2 bg-gray-100 dark:bg-gray-800" />
          </>
        )}

        <div className="space-y-1">
          {userActions.map((action, index) => {
            const IconComponent = action.icon;
            const isSignOut = action.danger;

            return (
              <React.Fragment key={index}>
                {isSignOut && (
                  <DropdownMenuSeparator className="my-2 bg-gray-100 dark:bg-gray-800" />
                )}
                <DropdownMenuItem
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={`cursor-pointer rounded-lg px-3 py-2.5 transition-all duration-200 ease-in-out flex items-center gap-3 ${
                    action.danger
                      ? "text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50 focus:bg-red-50 dark:focus:bg-red-950/50"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800"
                  }`}
                >
                  {IconComponent && (
                    <IconComponent
                      className={`h-5 w-5 ${
                        action.danger
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    />
                  )}
                  <span className="font-medium">{action.label}</span>
                </DropdownMenuItem>
              </React.Fragment>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EBUserMenu;
