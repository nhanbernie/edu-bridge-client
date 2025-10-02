"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";

interface EBOTPInputProps {
  name: string;
  label?: string;
  length?: number;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const EBOTPInput = forwardRef<HTMLDivElement, EBOTPInputProps>(
  ({ name, label, length = 6, className, disabled = false, autoFocus = false }, ref) => {
    const [values, setValues] = useState<string[]>(new Array(length).fill(""));
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    
    const { control } = useFormContext();
    const {
      field: { onChange, value, onBlur },
      fieldState: { error },
    } = useController({
      control,
      name,
    });

    // Initialize values from form value
    useEffect(() => {
      if (value && typeof value === 'string') {
        const newValues = value.split('').slice(0, length);
        while (newValues.length < length) {
          newValues.push('');
        }
        setValues(newValues);
      }
    }, [value, length]);

    // Auto focus first input
    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    const handleChange = (index: number, newValue: string) => {
      // Only allow single digit
      if (newValue.length > 1) {
        newValue = newValue.slice(-1);
      }

      // Only allow numbers
      if (newValue && !/^\d$/.test(newValue)) {
        return;
      }

      const newValues = [...values];
      newValues[index] = newValue;
      setValues(newValues);

      // Update form value
      const otpValue = newValues.join('');
      onChange(otpValue);

      // Auto focus next input
      if (newValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (!values[index] && index > 0) {
          // If current input is empty, focus previous and clear it
          inputRefs.current[index - 1]?.focus();
          handleChange(index - 1, '');
        } else {
          // Clear current input
          handleChange(index, '');
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (e.key === 'Delete') {
        handleChange(index, '');
      }
    };

    const handleFocus = (index: number) => {
      setActiveIndex(index);
    };

    const handleBlur = (index: number) => {
      setActiveIndex(-1);
      onBlur();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, length);
      
      if (pastedData) {
        const newValues = pastedData.split('');
        while (newValues.length < length) {
          newValues.push('');
        }
        setValues(newValues);
        onChange(pastedData);
        
        // Focus the next empty input or last input
        const nextIndex = Math.min(pastedData.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
      }
    };

    return (
      <div className={cn("space-y-2", className)} ref={ref}>
        <div className="flex justify-center items-center gap-3">
          {values.map((value, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              disabled={disabled}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={() => handleFocus(index)}
              onBlur={() => handleBlur(index)}
              onPaste={handlePaste}
              className={cn(
                "w-12 h-12 text-center text-lg font-semibold",
                error && "border-red-500 focus-visible:ring-red-500"
              )}
            />
          ))}
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-500 text-center"
            >
              {error.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

EBOTPInput.displayName = "EBOTPInput";
