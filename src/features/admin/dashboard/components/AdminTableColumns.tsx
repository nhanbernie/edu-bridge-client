"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Eye, FileText, Check, X, Trash2 } from "lucide-react";
import { UserDto } from "@/services/api/type";
import EBActionsMenu, { ActionItem } from "@/components/common/EBActionsMenu";

interface AdminTableActionsProps {
  onViewUser: (user: UserDto) => void;
  onViewVerificationDocs: (user: UserDto) => void;
  onApproveTutor: (userId: string) => void;
  onRejectTutor: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

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

export const createAdminTableColumns = (
  actions: AdminTableActionsProps
): ColumnDef<UserDto>[] => [
  {
    accessorKey: "fullName",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return (
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
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-gray-700 dark:text-gray-300 hover:bg-transparent"
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge variant={getRoleBadgeVariant(role)}>
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-gray-700 dark:text-gray-300 hover:bg-transparent"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={getStatusBadgeVariant(status || "UNKNOWN")}>
          {status || "UNKNOWN"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      
      const actionItems: ActionItem[] = [
        {
          label: "View Details",
          icon: Eye,
          onClick: () => actions.onViewUser(user),
        },
      ];

      // Add tutor-specific actions
      if (user.role === "TUTOR") {
        actionItems.push({
          label: "View Documents",
          icon: FileText,
          onClick: () => actions.onViewVerificationDocs(user),
        });

        if (user.status === "PENDING") {
          actionItems.push(
            {
              label: "Approve",
              icon: Check,
              onClick: () => actions.onApproveTutor(user.userId),
            },
            {
              label: "Reject",
              icon: X,
              onClick: () => actions.onRejectTutor(user.userId),
              danger: true,
            }
          );
        }
      }

      // Add delete action
      actionItems.push({
        label: "Delete User",
        icon: Trash2,
        onClick: () => actions.onDeleteUser(user.userId),
        danger: true,
      });

      return <EBActionsMenu actions={actionItems} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
