"use client";
import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="rounded px-2 py-1 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--hoverSurface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--secondary)]"
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </span>
    </button>
  );
}
