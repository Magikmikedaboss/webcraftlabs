import Link from "next/link";
import { SITE } from "@/lib/site";
import styles from "./siteShell.module.css";

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
  title?: string;
  intro?: string;
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

          <nav className="hidden items-center gap-1 md:flex">
            {SITE.nav.map((n) => (
              <NavLink key={n.href} href={n.href} label={n.label} />
            ))}
          </nav>

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
            {title && <h1 className="text-4xl font-semibold">{title}</h1>}
            {intro && <p className="mt-3 max-w-2xl text-[var(--muted)]">{intro}</p>}
          </div>
        </section>
      )}

      {children}

      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
          <div>
            <div className="font-semibold">{SITE.name}</div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Productized web development + marketing systems. Clean builds, measurable results.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold">Pages</div>
            <div className="mt-2 grid gap-2 text-sm text-[var(--muted)]">
              {SITE.nav.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-[var(--text)]">
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-2 grid gap-2 text-sm text-[var(--muted)]">
              <a className="hover:text-[var(--text)]" href="mailto:hello@webcraftlabs.studio">
                hello@webcraftlabs.studio
              </a>
              <span>Las Vegas / Remote</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-10 text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
