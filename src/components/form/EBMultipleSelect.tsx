import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { CommandInput } from "@/components/ui/command";
import { useController, useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { 
  FORM_FIELD_BASE, 
  FORM_FIELD_ERROR, 
  FORM_FIELD_NORMAL, 
  FORM_ERROR_MESSAGE, 
  FORM_LABEL, 
  FORM_FIELD_CONTAINER 
} from "@/common/constants/className.constant";

interface MultipleSelectOption {
  value: string;
  label: string;
}

interface MultipleSelectProps {
  name: string;
  label?: string;
  options: MultipleSelectOption[];
  placeholder?: string;
  className?: string; // wrapper class (default: w-full mb-5)
  triggerClassName?: string; // input style override
  allowCustom?: boolean;
  customInputPlaceholder?: string;
  onCreateOption?: (label: string) => MultipleSelectOption;
  disabled?: boolean;
}

const EBMultipleSelect: React.FC<MultipleSelectProps> = ({
  name,
  label,
  options,
  placeholder = "Chọn...",
  className,
  triggerClassName,
  allowCustom = false,
  customInputPlaceholder = "Bạn có thể nhập môn học khác ở đây",
  onCreateOption,
  disabled = false,
}) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const values: string[] = Array.isArray(value) ? value : [];
  const [localOptions, setLocalOptions] = React.useState<MultipleSelectOption[]>(options);
  const [customText, setCustomText] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const addCustom = (label?: string) => {
    const textToAdd = (label || customText).trim();
    if (!textToAdd) return;
    const existing = localOptions.find((o) => o.label.toLowerCase() === textToAdd.toLowerCase());
    if (existing) {
      const next = Array.from(new Set([...(values || []), existing.value]));
      onChange(next);
      setCustomText("");
      setSearchQuery("");
      return;
    }
    const option = onCreateOption
      ? onCreateOption(textToAdd)
      : { value: `custom:${slugify(textToAdd)}`, label: textToAdd };
    setLocalOptions((prev) => [...prev, option]);
    const next = Array.from(new Set([...(values || []), option.value]));
    onChange(next);
    setCustomText("");
    setSearchQuery("");
  };

  // Filter options based on search
  const filteredOptions = localOptions.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check if search query doesn't match any existing options
  const hasNoMatches = searchQuery && filteredOptions.length === 0;

  return (
    <div className={cn(FORM_FIELD_CONTAINER, className)}>
      {label && <label className={FORM_LABEL}>{label}</label>}
      <MultiSelect values={values} onValuesChange={onChange}>
        <motion.div
          animate={error ? { x: [0, -4, 4, -2, 2, 0] } : { x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full"
        >
          <MultiSelectTrigger
            className={cn(
              FORM_FIELD_BASE,
              error ? FORM_FIELD_ERROR : FORM_FIELD_NORMAL,
              triggerClassName,
            )}
            disabled={disabled}
          >
            <MultiSelectValue placeholder={placeholder} />
          </MultiSelectTrigger>
        </motion.div>
        <MultiSelectContent search={false}>
          <div className="p-2">
            <CommandInput 
              placeholder="Tìm kiếm..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="mb-2"
            />
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                <MultiSelectGroup>
                  {filteredOptions.map((opt) => (
                    <MultiSelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              ) : searchQuery ? (
                <div className="p-2">
                  {allowCustom ? (
                    <button
                      type="button"
                      onClick={() => addCustom(searchQuery)}
                      className="w-full flex items-center gap-2 p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Thêm &quot;{searchQuery}&quot;</span>
                    </button>
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
        </MultiSelectContent>
      </MultiSelect>

      {/* Custom input removed - now integrated into dropdown search */}

      <AnimatePresence mode="wait">
        {error && (
            <motion.p
              className={FORM_ERROR_MESSAGE}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {error.message as any}
            </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EBMultipleSelect;
