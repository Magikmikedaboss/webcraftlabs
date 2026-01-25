"use client";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { useState, useEffect, useRef } from "react";

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
    
    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
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
          <nav className="flex flex-col gap-2 p-6">
            {SITE.nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-lg font-semibold text-blue-900 py-2"
                onClick={handleNav}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 rounded-md bg-[var(--primary)] px-4 py-3 text-base font-semibold text-white text-center hover:opacity-90"
              onClick={handleNav}
            >
              Book intro call
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
