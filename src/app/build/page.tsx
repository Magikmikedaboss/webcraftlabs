
import SiteShell from "@/components/SiteShell";
import styles from "../home.module.css";

export default function BuildPage() {
  return (
    <SiteShell
      title="Choose Your Build"
      intro="Configure pages, add-ons, and timeline to get an instant estimate range, then send it with your request."
    >
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="text-sm font-semibold">Configurator (stub)</div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Next: slider for pages, toggles for design level, add-on checkboxes, and timeline selector.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-4 text-sm">
                  Pages: <span className="font-semibold">4</span>
                </div>
                <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-4 text-sm">
                  Design: <span className="font-semibold">Template</span>
                </div>
                <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-4 text-sm">
                  Add-ons: <span className="font-semibold">SEO + Booking</span>
                </div>
                <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] p-4 text-sm">
                  Timeline: <span className="font-semibold">Standard</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className={`${styles.heroCard} p-6`}>
              <div className="text-sm font-semibold">Estimated range</div>
              <div className="mt-2 text-3xl font-semibold">$2,400 – $3,200</div>
              <div className="mt-2 text-sm text-[var(--muted)]">Timeline: 2–3 weeks</div>

              <a
                href="/contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[var(--primary)] px-5 py-3 font-semibold text-white hover:opacity-90"
              >
                Request quote with configuration
              </a>

              <div className="mt-3 text-xs text-[var(--muted)]">
                No payment required to request. We confirm scope before final pricing.
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
