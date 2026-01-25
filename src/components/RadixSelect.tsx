import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

export interface RadixSelectOption {
  value: string;
  label: string;
}

interface RadixSelectProps {
  options: RadixSelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  id?: string;
}

export const RadixSelect: React.FC<RadixSelectProps> = ({
  options,
  value,
  onValueChange,
  label,
  placeholder = "Select an option",
  error,
  className = "",
  id,
}) => {
  const generatedId = React.useId();
  const effectiveId = id ?? generatedId;
  const labelId = `${effectiveId}-label`;
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label id={labelId} className="block mb-1 text-sm font-medium text-[var(--text)]">{label}</label>
      )}
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          className={`inline-flex items-center justify-between w-full rounded-lg border px-3 sm:px-4 py-2 bg-[var(--surface)] text-sm sm:text-base text-[var(--text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all ${
            error ? "border-red-500" : "border-[var(--border)]"
          }`}
          aria-invalid={!!error}
          aria-labelledby={label ? labelId : undefined}
        >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="ml-2">
          <ChevronDownIcon className="w-5 h-5 text-[var(--muted)]" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-50 min-w-[var(--radix-select-trigger-width)] rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg animate-fadeIn">
          <Select.Viewport className="p-1">
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg cursor-pointer text-sm sm:text-base text-[var(--text)] hover:bg-[var(--hoverSurface)] focus:bg-[var(--focusSurface)] select-none outline-none transition-all"
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon className="w-4 h-4 text-[var(--accent)] ml-2" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
    {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
  </div>
  );
};
