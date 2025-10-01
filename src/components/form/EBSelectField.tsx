"use client";

import React, { forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FORM_FIELD_BASE, 
  FORM_FIELD_ERROR, 
  FORM_FIELD_NORMAL, 
  FORM_ERROR_MESSAGE, 
  FORM_LABEL, 
  FORM_FIELD_CONTAINER 
} from "@/common/constants/className.constant";

interface EBSelectFieldProps {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
}

export const EBSelectField = forwardRef<HTMLDivElement, EBSelectFieldProps>(
  ({ name, label, options, placeholder = "Vui lòng chọn...", className, triggerClassName, contentClassName, disabled }, ref) => {
    const { control } = useFormContext();
    const {
      field: { onChange, value, onBlur },
      fieldState: { error },
    } = useController({
      control,
      name,
    });

    return (
      <div className={FORM_FIELD_CONTAINER} ref={ref}>
        {label && <label className={FORM_LABEL}>{label}</label>}

        <motion.div
          className="relative w-full"
          animate={error ? { x: [0, -4, 4, -2, 2, 0] } : { x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Select
            value={value || ""}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger
              className={cn(
                FORM_FIELD_BASE,
                error ? FORM_FIELD_ERROR : FORM_FIELD_NORMAL,
                triggerClassName || className
              )}
              onBlur={onBlur}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={contentClassName}>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

EBSelectField.displayName = "EBSelectField";

export default EBSelectField;
