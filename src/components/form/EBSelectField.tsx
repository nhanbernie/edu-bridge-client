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
import { Plus, Search } from "lucide-react";
import {
  FORM_FIELD_BASE,
  FORM_FIELD_ERROR,
  FORM_FIELD_NORMAL,
  FORM_ERROR_MESSAGE,
  FORM_LABEL,
  FORM_FIELD_CONTAINER,
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
  (
    {
      name,
      label,
      options,
      placeholder = "Vui lòng chọn...",
      className,
      triggerClassName,
      contentClassName,
      disabled,
      allowCustom = false,
      onCreateOption,
    },
    ref
  ) => {
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
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const slugify = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const addCustom = React.useCallback(
      (label: string) => {
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

        // Thêm vào ĐẦU danh sách để hiển thị top
        setCustomOptions((prev) => [option, ...prev]);
        onChange(option.value);
        setSearchQuery("");
        setIsOpen(false);
      },
      [options, customOptions, onChange, onCreateOption]
    );

    // Reset search query khi đóng dropdown
    useEffect(() => {
      if (!isOpen) {
        setSearchQuery("");
      }
    }, [isOpen]);

    // Combine original options with custom options - Custom options hiện TOP
    const allOptions = React.useMemo(() => {
      // Custom options lên đầu, original options sau
      return [...customOptions, ...options];
    }, [options, customOptions]);

    // Filter options based on search - Memoized
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return allOptions;
      const lowerQuery = searchQuery.toLowerCase();
      return allOptions.filter((option) => option.label.toLowerCase().includes(lowerQuery));
    }, [allOptions, searchQuery]);

    // Handle input change - Direct update, no blocking
    const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      setSearchQuery(e.target.value);
    }, []);

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
            open={isOpen}
            onOpenChange={setIsOpen}
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
                {/* Search input thuần - không dùng Command để tránh mất focus */}
                <div className="relative mb-2">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={allowCustom ? "Tìm kiếm hoặc nhập tên mới..." : "Tìm kiếm..."}
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (
                        e.key === "Enter" &&
                        allowCustom &&
                        searchQuery.trim() &&
                        filteredOptions.length === 0
                      ) {
                        e.preventDefault();
                        addCustom(searchQuery);
                      }
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                    autoFocus
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    <>
                      {/* Hiển thị custom options với label */}
                      {customOptions.length > 0 && (
                        <>
                          <div className="px-2 py-1.5 text-xs font-semibold text-primary">
                            Tùy chỉnh của bạn
                          </div>
                          {filteredOptions
                            .filter((opt) =>
                              customOptions.some((custom) => custom.value === opt.value)
                            )
                            .map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <span className="flex items-center gap-2">
                                  <Plus className="w-3 h-3 text-primary" />
                                  {option.label}
                                </span>
                              </SelectItem>
                            ))}

                          {/* Divider nếu có cả original options */}
                          {filteredOptions.some(
                            (opt) => !customOptions.some((custom) => custom.value === opt.value)
                          ) && <div className="my-1 border-t border-border" />}
                        </>
                      )}

                      {/* Original options */}
                      {filteredOptions
                        .filter(
                          (opt) => !customOptions.some((custom) => custom.value === opt.value)
                        )
                        .map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                    </>
                  ) : searchQuery ? (
                    <div className="p-2">
                      {allowCustom ? (
                        <button
                          type="button"
                          onClick={() => addCustom(searchQuery)}
                          className="w-full flex items-center gap-2 p-2 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-md transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Thêm &quot;{searchQuery}&quot;</span>
                        </button>
                      ) : (
                        <div className="text-sm text-muted-foreground text-center py-2">
                          Không tìm thấy kết quả
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground text-center py-4">
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
