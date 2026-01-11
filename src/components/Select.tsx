
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";



interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
  placeholder?: string;
}

export default function FancySelect({ value, onChange, options, placeholder }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selected = options.find(([v]) => v === value);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-4 text-base font-medium shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none hover:border-gray-400 hover:shadow-md appearance-none cursor-pointer flex items-center justify-between min-h-[48px]"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          backgroundImage: 'none',
          paddingRight: '2.5rem',
        }}
      >
        <span className="truncate flex-1 text-left">{selected ? selected[1] : (placeholder || "Select...")}</span>
        <ChevronDown className={`ml-2 w-6 h-6 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 w-full rounded-xl border-2 border-gray-300 bg-white shadow-lg max-h-60 overflow-auto" role="listbox">
          {options.map(([v, label]) => (
            <li
              key={v}
              className={`px-4 py-3 cursor-pointer hover:bg-blue-50 text-base ${v === value ? "bg-blue-100 text-blue-900 font-semibold" : "text-gray-900"}`}
              onClick={() => {
                onChange(v);
                setOpen(false);
              }}
              role="option"
              aria-selected={v === value}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(v);
                  setOpen(false);
                }
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
