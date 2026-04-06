"use client";
import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, isInitialized, toggleTheme } = useTheme();
  const isThemeReady = isInitialized;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-disabled={!isThemeReady}
      disabled={!isThemeReady}
      onClick={() => {
        if (!isThemeReady) return;
        toggleTheme();
      }}
      className="rounded px-2 py-1 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--hoverSurface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--secondary)] disabled:cursor-not-allowed disabled:opacity-60"
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>
        {!isThemeReady ? "Theme" : theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </span>
    </button>
  );
}
