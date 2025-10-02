"use client";

import React from "react";
import { User, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import { UserMenuProps } from "@/types/user.types";
import { useAuth } from "@/contexts/AuthContext";

const EBUserMenu = ({ user }: UserMenuProps) => {
  const { logout } = useAuth();

  return (
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
  );
};

export default EBUserMenu;
