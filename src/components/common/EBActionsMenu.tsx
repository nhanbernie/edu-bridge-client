"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, LucideIcon } from "lucide-react";

export interface ActionItem {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}

interface EBActionsMenuProps {
  actions: ActionItem[];
  triggerClassName?: string;
  contentClassName?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

const EBActionsMenu: React.FC<EBActionsMenuProps> = ({
  actions,
  triggerClassName = "",
  contentClassName = "",
  align = "end",
  side = "bottom",
}) => {
  if (actions.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 ${triggerClassName}`}
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Mở menu hành động</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={align} 
        side={side}
        className={`w-40 ${contentClassName}`}
      >
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          
          return (
            <DropdownMenuItem
              key={index}
              variant={action.danger ? "destructive" : "default"}
              onClick={action.onClick}
              disabled={action.disabled}
              className="cursor-pointer"
            >
              {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EBActionsMenu;
