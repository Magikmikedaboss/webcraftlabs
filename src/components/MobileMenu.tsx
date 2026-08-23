"use client";
import Link from "next/link";
import { HEADER_NAV, ARCHIVE_FOOTER_LINK } from "@/lib/site";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const menuId = "mobile-nav-menu";
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Close menu on nav click
  function handleNav() {
    setOpen(false);
  }
  
  // Handle Escape key to close menu
  useEffect(() => {
    if (!open) return;
    
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);
  
  // Handle click outside to close menu
  useEffect(() => {
    if (!open) return;
    
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);
  
  // Focus trap when menu is open
  useEffect(() => {
    if (!open || !menuRef.current) return;
    
    // Include <summary> since the Services/Resources groups are now native
    // <details> accordions, and exclude anything not currently reachable by
    // Tab — links nested inside a still-closed <details> match the selector
    // but have no layout box (offsetParent === null) until expanded.
    const focusableElements = Array.from(
      menuRef.current.querySelectorAll<HTMLElement>('summary, a[href], button:not([disabled])')
    ).filter((el) => el.offsetParent !== null);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    function handleTabKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }
    
    // Focus first element when menu opens
    firstElement?.focus();
    
    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [open]);
  
  return (
    <>
      <button
        ref={buttonRef}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls={menuId}
        className="rounded-md p-2 border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">Menu</span>
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          className="fixed top-[calc(var(--header-height)+1px)] left-0 right-0 w-full bg-[var(--surface)] border-t border-[var(--border)] shadow-lg z-50"
        >
          <nav className="flex flex-col gap-1 p-6">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-3 min-h-[48px] text-lg font-semibold text-[var(--text)] hover:text-[var(--primary)] transition-colors">
                {HEADER_NAV.services.label}
                <svg className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="flex flex-col gap-1 pl-4">
                {HEADER_NAV.services.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-2.5 min-h-[44px] flex items-center text-base text-[var(--text)] hover:text-[var(--primary)] transition-colors"
                    onClick={handleNav}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>

            <Link
              href={HEADER_NAV.work.href}
              className="text-lg font-semibold py-3 min-h-[48px] flex items-center text-[var(--text)] hover:text-[var(--primary)] transition-colors"
              onClick={handleNav}
            >
              {HEADER_NAV.work.label}
            </Link>

            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-3 min-h-[48px] text-lg font-semibold text-[var(--text)] hover:text-[var(--primary)] transition-colors">
                {HEADER_NAV.resources.label}
                <svg className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="flex flex-col gap-1 pl-4">
                {HEADER_NAV.resources.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-2.5 min-h-[44px] flex items-center text-base text-[var(--text)] hover:text-[var(--primary)] transition-colors"
                    onClick={handleNav}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>

            <Link
              href={HEADER_NAV.buildCalculator.href}
              className="text-lg font-semibold py-3 min-h-[48px] flex items-center text-[var(--text)] hover:text-[var(--primary)] transition-colors"
              onClick={handleNav}
            >
              {HEADER_NAV.buildCalculator.label}
            </Link>
            <Link
              href={HEADER_NAV.about.href}
              className="text-lg font-semibold py-3 min-h-[48px] flex items-center text-[var(--text)] hover:text-[var(--primary)] transition-colors"
              onClick={handleNav}
            >
              {HEADER_NAV.about.label}
            </Link>
            <Link
              href={HEADER_NAV.cta.href}
              className="text-lg font-semibold py-3 min-h-[48px] flex items-center text-[var(--primary)]"
              onClick={handleNav}
            >
              {HEADER_NAV.cta.label}
            </Link>

            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <ThemeToggle />
            </div>
            <Link
              href={ARCHIVE_FOOTER_LINK.href}
              className="mt-2 py-2 text-xs italic text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              onClick={handleNav}
            >
              {ARCHIVE_FOOTER_LINK.label}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
