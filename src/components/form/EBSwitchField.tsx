"use client";

import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface SwitchFieldProps {
  name: string;
  label?: string;
  description?: string;
  className?: string;
}

const EBSwitchField: React.FC<SwitchFieldProps> = ({ name, label, description, className }) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <div className={cn("w-full mb-5", className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {label && (
            <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
          )}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={value}
          onClick={() => onChange(!value)}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            value ? "bg-primary" : "bg-muted"
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
              value ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      </div>

      {error && <p className="mt-1 text-sm text-destructive">{error.message}</p>}
    </div>
  );
};

export default EBSwitchField;
