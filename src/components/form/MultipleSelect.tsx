import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { useController, useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

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

const MultipleSelect: React.FC<MultipleSelectProps> = ({
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

  const addCustom = () => {
    const label = customText.trim();
    if (!label) return;
    const existing = localOptions.find((o) => o.label.toLowerCase() === label.toLowerCase());
    if (existing) {
      const next = Array.from(new Set([...(values || []), existing.value]));
      onChange(next);
      setCustomText("");
      return;
    }
    const option = onCreateOption
      ? onCreateOption(label)
      : { value: `custom:${slugify(label)}`, label };
    setLocalOptions((prev) => [...prev, option]);
    const next = Array.from(new Set([...(values || []), option.value]));
    onChange(next);
    setCustomText("");
  };

  return (
    <div className={cn("w-full mb-5", className)}>
      {label && <label className="block text-sm font-medium text-gray-800 mb-2">{label}</label>}
      <MultiSelect values={values} onValuesChange={onChange}>
        <motion.div
          animate={error ? { x: [0, -4, 4, -2, 2, 0] } : { x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full"
        >
          <MultiSelectTrigger
            className={cn(
              "w-full border rounded-xl px-4 py-4 text-gray-900 bg-gray-50 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all duration-300 ease-in-out",
              error ? "border-red-500 bg-red-50 focus:ring-red-200" : "border-gray-200 hover:border-gray-300 focus:ring-primary/20",
              triggerClassName,
            )}
            disabled={disabled}
          >
            <MultiSelectValue placeholder={placeholder} />
          </MultiSelectTrigger>
        </motion.div>
        <MultiSelectContent search={{ placeholder: "Tìm kiếm...", emptyMessage: "Không có dữ liệu" }}>
          <MultiSelectGroup>
            {localOptions.map((opt) => (
              <MultiSelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </MultiSelectItem>
            ))}
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>

      {allowCustom && (
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            aria-label="Thêm mục"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 transition-colors"
            onClick={addCustom}
          >
            <Plus className="h-4 w-4" />
          </button>
          <input
            className={cn(
              "w-auto shrink-0 border-0 border-b border-gray-300 bg-transparent px-1 py-1 text-sm text-gray-900 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-primary/60 whitespace-nowrap",
              error ? "border-red-500 bg-red-50 focus:ring-red-200" : "border-gray-200 hover:border-gray-300 focus:ring-primary/20",
            )}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustom();
              }
            }}
            size={Math.min(60, (customText || customInputPlaceholder).length)}
            placeholder={customInputPlaceholder}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            className="text-red-500 text-sm mt-1"
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

export default MultipleSelect;
