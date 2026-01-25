// theme-toggle.ts
// Simple theme toggle for Tailwind darkMode: 'class' and [data-theme] support

export function setTheme(theme: 'light' | 'dark') {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
}

export function toggleTheme() {
  if (typeof document === 'undefined') {
    return;
  }
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
}

export function getCurrentTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') {
    return 'light';
  }
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
