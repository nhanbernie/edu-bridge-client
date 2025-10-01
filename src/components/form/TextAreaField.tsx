"use client";

import React, { forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { 
  FORM_FIELD_TEXTAREA, 
  FORM_FIELD_ERROR, 
  FORM_FIELD_NORMAL, 
  FORM_ERROR_MESSAGE, 
  FORM_LABEL, 
  FORM_FIELD_CONTAINER 
} from "@/common/constants/className.constant";

interface TextAreaFieldProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> {
  name: string;
  label?: string;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ name, label, className, ...props }, ref) => {
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
          <textarea
            ref={ref}
            className={cn(
              FORM_FIELD_TEXTAREA,
              error ? FORM_FIELD_ERROR : FORM_FIELD_NORMAL,
              className
            )}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            {...props}
          />
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

TextAreaField.displayName = "TextAreaField";

export default TextAreaField;
