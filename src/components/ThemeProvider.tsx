"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  isInitialized: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    let stored: string | null = null;

    try {
      stored = window.localStorage?.getItem("theme") ?? null;
    } catch {
      stored = null;
    }

    const nextTheme =
      stored === "dark" || stored === "light"
        ? stored
        : root.getAttribute("data-theme") === "dark" || root.classList.contains("dark")
          ? "dark"
          : "light";

    setTheme(nextTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;

    try {
      window.localStorage?.setItem("theme", theme);
    } catch {
      // Ignore persistence failures (e.g. private mode or blocked storage)
    }
  }, [theme, isInitialized]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, isInitialized, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
