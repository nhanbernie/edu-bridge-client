"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Check, X, Trash2, FileText, Clock, UserCheck, Users } from "lucide-react";
import { UserDto } from "@/services/api/type";
import { ADMIN_ANIMATION_VARIANTS } from "@/common/constants/animation.constant";

interface AdminTableProps {
  data: UserDto[];
  isLoading: boolean;
  onViewUser: (user: UserDto) => void;
  onViewVerificationDocs: (user: UserDto) => void;
  onApproveTutor: (userId: string) => void;
  onRejectTutor: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

interface TabConfig {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  count: number;
}

const AdminTable: React.FC<AdminTableProps> = ({
  data,
  isLoading,
  onViewUser,
  onViewVerificationDocs,
  onApproveTutor,
  onRejectTutor,
  onDeleteUser,
}) => {
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "all">("pending");

  // Filter data based on active tab
  const getFilteredData = () => {
    switch (activeTab) {
      case "pending":
        return data.filter((user) => user.role === "TUTOR" && user.status === "PENDING");
      case "approved":
        return data.filter((user) => user.role === "TUTOR" && user.status === "APPROVED");
      case "all":
        return data;
      default:
        return data;
    }
  };

  const filteredData = getFilteredData();

  // Tab configurations
  const tabs: TabConfig[] = [
    {
      key: "pending",
      label: "Pending Tutors",
      icon: Clock,
      color: "orange",
      count: data.filter((user) => user.role === "TUTOR" && user.status === "PENDING").length,
    },
    {
      key: "approved",
      label: "Approved Tutors",
      icon: UserCheck,
      color: "green",
      count: data.filter((user) => user.role === "TUTOR" && user.status === "APPROVED").length,
    },
    {
      key: "all",
      label: "All Users",
      icon: Users,
      color: "blue",
      count: data.length,
    },
  ];

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "TUTOR":
        return "default";
      case "STUDENT":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "PENDING":
        return "outline";
      case "APPROVED":
        return "default";
      case "REJECTED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <div className="border-0 rounded-4xl shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-0 rounded-4xl shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200/50 dark:border-gray-700/50">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`relative py-4 px-1 font-medium text-sm transition-all duration-300 flex items-center space-x-2 ${
                activeTab === tab.key
                  ? `text-${tab.color}-600 dark:text-${tab.color}-400`
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <Badge
                variant={activeTab === tab.key ? "default" : "secondary"}
                className={`${
                  activeTab === tab.key
                    ? `bg-${tab.color}-100 text-${tab.color}-700 dark:bg-${tab.color}-900/30 dark:text-${tab.color}-300`
                    : ""
                }`}
              >
                {tab.count}
              </Badge>

              {/* Active tab indicator */}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 rounded-full`}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Table Content */}
      <div className="p-6">
        <div className="rounded-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 dark:bg-gray-800/50">
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  User
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Role
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No users found for this category
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((user, index) => (
                  <TableRow
                    key={user.userId}
                    className="group hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {(user.fullName || user.email || "U").charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.fullName || user.email}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(user.status || "UNKNOWN")}>
                        {user.status || "UNKNOWN"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewUser(user)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        {user.role === "TUTOR" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onViewVerificationDocs(user)}
                              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                            >
                              <FileText className="w-4 h-4" />
                            </Button>

                            {user.status === "PENDING" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onApproveTutor(user.userId)}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/30"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onRejectTutor(user.userId)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteUser(user.userId)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
