"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {

  // Use default state, hydration handled by layout script
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage?.getItem("theme");
      if (stored === "dark" || stored === "light") {
        return stored;
      } else if (document.documentElement.classList.contains("dark")) {
        return "dark";
      } else if (document.documentElement.classList.contains("light")) {
        return "light";
      }
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(theme === "dark" ? "light" : "dark");
    if (typeof window !== "undefined") {
      window.localStorage?.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme: theme || "light", toggleTheme }}>
      <div suppressHydrationWarning>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
