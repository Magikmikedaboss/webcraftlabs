

import { useState } from "react";

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: Array<[string, string]>;
  label?: string;
  error?: string;
  placeholder?: string;
}

export default function Select({
  value,
  onChange,
  options,
  label,
  error,
  placeholder
}: SelectProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full rounded-xl border-2 bg-white px-4 py-4 text-base font-medium shadow-sm 
            transition-all duration-200 
            focus:outline-none appearance-none cursor-pointer
            ${error 
              ? 'border-red-400 ring-4 ring-red-100' 
              : isFocused 
                ? 'border-blue-500 ring-4 ring-blue-100' 
                : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
            }
          `}
          style={{ 
            minHeight: 48,
            paddingRight: '2.5rem'
          }}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(([v, label]: [string, string]) => (
            <option key={v} value={v}>
              {label}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isFocused ? 'rotate-180 text-blue-500' : 'text-gray-400'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
