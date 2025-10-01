"use client";

import React, { useState, forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { 
  FORM_FIELD_BASE, 
  FORM_FIELD_ERROR, 
  FORM_FIELD_NORMAL, 
  FORM_ERROR_MESSAGE, 
  FORM_LABEL, 
  FORM_FIELD_CONTAINER 
} from "@/common/constants/className.constant";

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
      <div className={FORM_FIELD_CONTAINER}>
        {label && <label className={FORM_LABEL}>{label}</label>}

        <motion.div
          className="relative w-full"
          animate={error ? { x: [0, -4, 4, -2, 2, 0] } : { x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <input
            ref={ref}
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            className={cn(
              FORM_FIELD_BASE,
              error ? FORM_FIELD_ERROR : FORM_FIELD_NORMAL,
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
        </motion.div>

        {/* Error message with smooth motion animation */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                height: { duration: 0.2 },
              }}
              className="overflow-hidden"
            >
              <motion.p
                className={FORM_ERROR_MESSAGE}
                initial={{ x: -5 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {error.message}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
