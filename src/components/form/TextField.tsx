"use client"

import React, { useState, forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  name: string;
  label?: string;
  type?: "text" | "password" | "email" | "number";
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, label, type = "text", className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const { control } = useFormContext();
    const {
      field: { onChange, value, onBlur },
      fieldState: { error },
    } = useController({
      control,
      name,
    });

    return (
      <div className="w-full mb-5">
        {label && <label className="block text-sm font-medium text-gray-800 mb-2">{label}</label>}

        <div className="relative w-full">
          <input
            ref={ref}
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            className={cn(
              "w-full border rounded-xl px-4 py-4 text-gray-900 bg-gray-50 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200",
              error ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300",
              type === "password" && "pr-12",
              className
            )}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            autoComplete={
              type === "password" ? "current-password" : type === "email" ? "email" : "off"
            }
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
