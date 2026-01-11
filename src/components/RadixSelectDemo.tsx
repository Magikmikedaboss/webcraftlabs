import { useState } from "react";
import { RadixSelect } from "./RadixSelect";

const options = [
  { value: "basic", label: "Basic Marketing Website" },
  { value: "pro", label: "Pro Marketing Website" },
  { value: "ecommerce", label: "E-Commerce Website" },
  { value: "custom", label: "Custom Project" },
];

export default function RadixSelectDemo() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  
  const handleValueChange = (newValue: string) => {
    setTouched(true);
    setValue(newValue);
  };
  
  const showError = touched && !value;
  
  return (
    <div className="max-w-xs mx-auto mt-10">
      <RadixSelect
        options={options}
        value={value}
        onValueChange={handleValueChange}
        label="Choose a project type"
        placeholder="Select type..."
        error={showError ? "Please select a type" : undefined}
      />
      <div className="mt-4 text-blue-900 text-sm">
        Selected: <span className="font-bold">{value || "(none)"}</span>
      </div>
    </div>
  );
}
