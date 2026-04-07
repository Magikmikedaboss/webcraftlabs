"use client";
import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, isInitialized, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-disabled={!isInitialized}
      disabled={!isInitialized}
      onClick={() => {
        if (!isInitialized) return;
        toggleTheme();
      }}
      className="rounded px-2 py-1 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--hoverSurface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--secondary)] disabled:cursor-not-allowed disabled:opacity-60"
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>
        {!isInitialized ? "Theme" : theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </span>
    </button>
  );
}
