"use client";
import Link from "next/link";
import { SITE } from "@/lib/site";
import styles from "./siteShell.module.css";
import React, { useState } from "react";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-sm font-semibold text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
    >
      {label}
    </Link>
  );
}

export default function SiteShell({
  children,
  title,
  intro,
  right,
}: {
  children: React.ReactNode;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className={styles.header}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className={styles.logoMark} aria-hidden="true" />
            <span>{SITE.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {SITE.nav.map((n) => (
              <NavLink key={n.href} href={n.href} label={n.label} />
            ))}
          </nav>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center gap-2">
            <MobileMenu />
          </div>

          <div className="flex items-center gap-2">
            {right}
            <Link
              href="/contact"
              className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Book intro call
            </Link>
          </div>
        </div>
      </header>

      {(title || intro) && (
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-6 py-12">
            {title && <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">{title}</h1>}
            {intro && <p className="mt-3 max-w-2xl text-base sm:text-lg md:text-xl text-[var(--muted)]">{intro}</p>}
          </div>
        </section>
      )}

      {children}

      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50/40 to-cyan-50/30 border border-[var(--border)] shadow-lg p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <span className="inline-block w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-2xl shadow-md">
                <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="url(#footer-logo-gradient)" />
                  <defs>
                    <linearGradient id="footer-logo-gradient" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <div>
                <div className="font-bold text-lg text-blue-900">{SITE.name}</div>
                <div className="text-xs text-[var(--muted)]">{SITE.tagline}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-6 items-start md:items-center">
              {SITE.nav.map((n) => (
                <Link key={n.href} href={n.href} className="text-sm font-semibold text-blue-900 hover:text-cyan-700 transition">
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 items-start md:items-end">
              <a className="text-sm font-semibold text-blue-900 hover:text-cyan-700 transition" href="mailto:hello@webcraftlabs.studio">
                hello@webcraftlabs.studio
              </a>
              <span className="text-xs text-[var(--muted)]">Las Vegas / Remote</span>
              <div className="flex gap-3 mt-2">
                <a href="https://linkedin.com/company/webcraftlabs" target="_blank" rel="noopener" aria-label="LinkedIn" className="text-blue-700 hover:text-cyan-600">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M6.94 7.5H4.56V15H6.94V7.5ZM5.75 6.5C6.44 6.5 7 5.94 7 5.25C7 4.56 6.44 4 5.75 4C5.06 4 4.5 4.56 4.5 5.25C4.5 5.94 5.06 6.5 5.75 6.5ZM8.5 9.5V15H10.88V12.25C10.88 11.34 11.56 10.75 12.38 10.75C13.19 10.75 13.88 11.34 13.88 12.25V15H16.25V12.06C16.25 10.22 15.06 9.5 13.88 9.5C13.06 9.5 12.44 9.94 12.19 10.44H12.13V9.5H9.75C9.75 9.5 8.5 9.56 8.5 9.5Z"/></svg>
                </a>
                <a href="https://twitter.com/webcraftlabs" target="_blank" rel="noopener" aria-label="Twitter" className="text-blue-700 hover:text-cyan-600">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M17.316 6.246c.008.176.008.352.008.528 0 5.376-4.09 11.576-11.576 11.576-2.304 0-4.448-.672-6.256-1.824.32.04.624.064.96.064 1.92 0 3.68-.656 5.088-1.76-1.792-.032-3.304-1.216-3.824-2.848.248.048.504.08.768.08.368 0 .728-.048 1.072-.144-1.872-.376-3.28-2.032-3.28-4.024v-.048c.552.304 1.184.488 1.856.512-1.104-.736-1.824-1.984-1.824-3.408 0-.752.208-1.456.576-2.064 2.096 2.576 5.232 4.264 8.768 4.44-.072-.304-.112-.624-.112-.952 0-2.304 1.872-4.176 4.176-4.176 1.2 0 2.288.504 3.048 1.32.952-.184 1.848-.536 2.656-1.016-.312.976-.976 1.792-1.84 2.312.848-.096 1.656-.328 2.408-.664-.56.84-1.264 1.584-2.08 2.176z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-[var(--muted)]">
            <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved. Made in Las Vegas / Remote. <span className="text-blue-700">Websites that mean business.</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simple mobile menu component
function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        aria-label="Open navigation menu"
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
        <div className="absolute top-16 left-0 w-full bg-white border-t border-[var(--border)] shadow-lg z-50">
          <nav className="flex flex-col gap-2 p-6">
            {SITE.nav.map((n) => (
              <Link key={n.href} href={n.href} className="text-lg font-semibold text-blue-900 py-2">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
