"use client";

import React, { forwardRef, useState, useEffect } from "react";
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
import { Command, CommandInput } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { 
  FORM_FIELD_BASE, 
  FORM_FIELD_ERROR, 
  FORM_FIELD_NORMAL, 
  FORM_ERROR_MESSAGE, 
  FORM_LABEL, 
  FORM_FIELD_CONTAINER 
} from "@/common/constants/className.constant";

interface SelectOption {
  value: string;
  label: string;
}

interface EBSelectFieldProps {
  name: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
  allowCustom?: boolean;
  onCreateOption?: (label: string) => SelectOption;
}

export const EBSelectField = forwardRef<HTMLDivElement, EBSelectFieldProps>(
  ({ 
    name, 
    label, 
    options, 
    placeholder = "Vui lòng chọn...", 
    className, 
    triggerClassName, 
    contentClassName, 
    disabled,
    allowCustom = false,
    onCreateOption
  }, ref) => {
    const { control } = useFormContext();
    const {
      field: { onChange, value, onBlur },
      fieldState: { error },
    } = useController({
      control,
      name,
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [customOptions, setCustomOptions] = useState<SelectOption[]>([]);

    const slugify = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const addCustom = (label: string) => {
      const textToAdd = label.trim();
      if (!textToAdd) {
        return;
      }
      
      // Kiểm tra trong options gốc và custom options
      const allOptions = [...options, ...customOptions];
      const existing = allOptions.find((o) => o.label.toLowerCase() === textToAdd.toLowerCase());
      if (existing) {
        onChange(existing.value);
        setSearchQuery("");
        return;
      }
      
      const option = onCreateOption
        ? onCreateOption(textToAdd)
        : { value: `custom:${slugify(textToAdd)}`, label: textToAdd };
      
      setCustomOptions((prev) => {
        const newOptions = [...prev, option];
        return newOptions;
      });
      onChange(option.value);
      setSearchQuery("");
    };

    // Combine original options with custom options
    const allOptions = [...options, ...customOptions];
    
    // Filter options based on search
    const filteredOptions = allOptions.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );


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
              <div className="p-2">
                <Command>
                  <CommandInput 
                    placeholder="Tìm kiếm..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    className="mb-2"
                  />
                </Command>
                <div className="max-h-60 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))
                  ) : searchQuery ? (
                    <div className="p-2">
                      {allowCustom ? (
                        <div
                          onClick={() => {
                          }}
                          className="w-full flex items-center gap-2 p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Thêm &quot;{searchQuery}&quot;</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 text-center py-2">
                          Không tìm thấy kết quả
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 text-center py-4">
                      Không có dữ liệu
                    </div>
                  )}
                </div>
              </div>
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
