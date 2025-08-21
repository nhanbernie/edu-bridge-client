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
      <div className="w-full mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">{label}</label>
        )}

        <div className="relative w-full">
          <input
            ref={ref}
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            className={cn(
              "w-full border rounded-3xl px-5 py-5 text-gray-900 bg-white text-base leading-5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors",
              error ? "border-red-500" : "border-gray-300 hover:border-gray-400",
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mt-2 ml-1">{error.message}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
