"use client";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { SITE } from "@/lib/site";
import styles from "./siteShell.module.css";
import React, { useState, useRef, useId } from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import PoweredBy from "./PoweredBy";
import ThemeToggle from "./ThemeToggle";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 transition-all duration-200 hover:text-blue-700 hover:bg-blue-50/50"
    >
      {label}
    </Link>
  );
}

function DropdownNav({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dropdownId = useId();

  // Close dropdown on outside click and Escape key
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={dropdownId}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-[var(--hoverSurface)] hover:text-blue-700 text-gray-700 bg-[var(--surface)] border border-gray-200"
      >
        {label}
        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div id={dropdownId} role="menu" className="absolute left-0 mt-2 w-36 rounded-lg bg-[var(--surface)] shadow-lg border border-gray-200 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-xs text-gray-700 hover:bg-[var(--hoverSurface)] hover:text-blue-700 rounded-lg"
              onClick={() => setOpen(false)}
              role="menuitem"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SiteShell({
  children,
  title,
  intro,
  right,
  background = 'surface', // 'surface' (light) or 'bg' (theme default)
}: {
  children: React.ReactNode;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  right?: React.ReactNode;
  background?: 'surface' | 'bg';
}) {
  const bgClass = background === 'surface' ? 'bg-[var(--surface)]' : 'bg-[var(--bg)]';
  return (
    <div className={`min-h-screen ${bgClass} text-[var(--text)]`}>
      <header className={styles.header}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

          <Link href="/" className="flex items-center gap-2 font-bold text-sm sm:text-base tracking-tight text-gray-900 transition-opacity hover:opacity-90">
            <Image
              src="/apple-touch-icon.png"
              alt={`${SITE.name} Icon`}
              width={32}
              height={32}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
            <span>{SITE.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <NavLink href="/build" label="Build" />
            <DropdownNav
              label="Explore"
              items={[
                { href: "/services", label: "Services" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/about", label: "About" },
                { href: "/blog", label: "Blog" },
                { href: "/news", label: "News" },
              ]}
            />
            <Link
              href="/contact"
              className="ml-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
            >
              Contact
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile Hamburger Menu (a11y/UX improved) */}
          <div className="md:hidden flex items-center gap-2">
            <MobileMenu />
          </div>

          {/* Remove CTA from header on mobile */}
          <div className="hidden md:flex items-center gap-2">
            {right}
          </div>
        </div>
      </header>

      {(title || intro) && (
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-6 py-8">
            {title && <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">{title}</h1>}
            {intro && <div className="mt-2 max-w-2xl text-sm sm:text-base md:text-lg text-[var(--muted)]">{intro}</div>}
          </div>
        </section>
      )}

      {children}

      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50/40 to-cyan-50/30 border border-[var(--border)] shadow-lg p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6 md:gap-8">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <span className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl shadow-md" aria-label={SITE.name} title={SITE.name}>
                {/* Branding visual: fallback to initials */}
                {SITE.name?.[0] || "W"}
              </span>
              <div>
                <div className="font-bold text-base sm:text-lg text-blue-900">{SITE.name}</div>
                <div className="text-xs sm:text-sm text-[var(--muted)]">{SITE.tagline}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-6 items-start md:items-center">
              {SITE.nav.map((n) => (
                <Link key={n.href} href={n.href} className="text-xs sm:text-sm font-semibold text-blue-900 hover:text-cyan-700 transition">
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 items-start md:items-end">
              <a className="text-xs sm:text-sm font-semibold text-blue-900 hover:text-cyan-700 transition" href="mailto:hello@webcraftlabz.com">
                hello@webcraftlabz.com
              </a>
              <span className="text-[10px] sm:text-xs text-[var(--muted)]">Las Vegas / Remote</span>
              <div className="flex gap-3 mt-2">
                <a href="https://linkedin.com/company/webcraftlabz" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-blue-700 hover:text-cyan-600">
                  <FaLinkedin size={20} />
                </a>
                <a href="https://twitter.com/webcraftlabz" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-blue-700 hover:text-cyan-600">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M17.316 6.246c.008.176.008.352.008.528 0 5.376-4.09 11.576-11.576 11.576-2.304 0-4.448-.672-6.256-1.824.32.04.624.064.96.064 1.92 0 3.68-.656 5.088-1.76-1.792-.032-3.304-1.216-3.824-2.848.248.048.504.08.768.08.368 0 .728-.048 1.072-.144-1.872-.376-3.28-2.032-3.28-4.024v-.048c.552.304 1.184.488 1.856.512-1.104-.736-1.824-1.984-1.824-3.408 0-.752.208-1.456.576-2.064 2.096 2.576 5.232 4.264 8.768 4.44-.072-.304-.112-.624-.112-.952 0-2.304 1.872-4.176 4.176-4.176 1.2 0 2.288.504 3.048 1.32.952-.184 1.848-.536 2.656-1.016-.312.976-.976 1.792-1.84 2.312.848-.096 1.656-.328 2.408-.664-.56.84-1.264 1.584-2.08 2.176z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-col items-center gap-4">
            <div className="text-center text-[10px] sm:text-xs text-[var(--muted)]">
              <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved. Made in Las Vegas / Remote. <span className="text-blue-700">Websites that mean business.</span></span>
            </div>
            {/* Example of PoweredBy badge - you can remove this from your own site and give to clients */}
            <PoweredBy variant="light" size="sm" />
          </div>
        </div>
      </footer>
    </div>
  );
}
