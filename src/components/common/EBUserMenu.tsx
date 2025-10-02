"use client";

import React from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
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

  const userActions: ActionItem[] = [
    {
      label: "Profile",
      icon: User,
      onClick: () => {
        // Navigate to profile page
        console.log("Navigate to profile");
      },
    },
    {
      label: "Settings", 
      icon: Settings,
      onClick: () => {
        // Navigate to settings page
        console.log("Navigate to settings");
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-700 transition-colors">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name || "User"}
                width={32}
                height={32}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={16} className="text-gray-600" />
            )}
          </div>
          <ChevronDown size={16} className="text-gray-300" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-48">
        {user && (
          <>
            <div className="px-4 py-2">
              <p className="text-sm font-medium text-gray-900">{user.name || "User"}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        
        {userActions.map((action, index) => {
          const IconComponent = action.icon;
          const isSignOut = action.danger;
          
          return (
            <React.Fragment key={index}>
              {isSignOut && <DropdownMenuSeparator />}
              <DropdownMenuItem
                onClick={action.onClick}
                disabled={action.disabled}
                className={`cursor-pointer ${
                  action.danger 
                    ? "text-red-600 focus:text-red-600 focus:bg-red-50" 
                    : "text-gray-700 focus:text-gray-900"
                }`}
              >
                {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                {action.label}
              </DropdownMenuItem>
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EBUserMenu;
