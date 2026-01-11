import SiteShell from "@/components/SiteShell";

export default function ContactPage() {
  return (
    <SiteShell
      title="Contact"
      intro="Tell us what you’re building. If it’s a fit, we’ll reply with next steps and a short plan."
    >
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="text-sm font-semibold">Request a quote</div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Paste your “Choose Your Build” configuration here, or describe your project.
              </p>

              <form className="mt-6 space-y-4">
                <label htmlFor="contact-name" className="visually-hidden">Name</label>
                <input
                  id="contact-name"
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-3 text-sm outline-none"
                  placeholder="Name"
                />
                <label htmlFor="contact-email" className="visually-hidden">Email</label>
                <input
                  id="contact-email"
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-3 text-sm outline-none"
                  placeholder="Email"
                />
                <label htmlFor="contact-project" className="visually-hidden">Project details / configuration</label>
                <textarea
                  id="contact-project"
                  className="min-h-[160px] w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-3 text-sm outline-none"
                  placeholder="Project details / configuration"
                />
                <button
                  type="button"
                  className="rounded-md bg-[var(--primary)] px-5 py-3 font-semibold text-white hover:opacity-90"
                >
                  Send request
                </button>
              </form>
              <style jsx global>{`
                .visually-hidden {
                  position: absolute !important;
                  height: 1px; width: 1px;
                  overflow: hidden;
                  clip: rect(1px, 1px, 1px, 1px);
                  white-space: nowrap;
                }
              `}</style>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="text-sm font-semibold">Typical turnaround</div>
              <div className="mt-2 text-sm text-[var(--muted)]">
                Reply within 24–48 hours with questions + next steps.
              </div>

              <div className="mt-6 text-sm">
                <div className="font-semibold">Email</div>
                <div className="text-[var(--muted)]">hello@webcraftlabs.studio</div>
              </div>

              <div className="mt-4 text-sm">
                <div className="font-semibold">Location</div>
                <div className="text-[var(--muted)]">Las Vegas / Remote</div>
              </div>

              <div className="mt-6 rounded-md border border-[var(--border)] bg-[var(--bg)] p-4 text-xs text-[var(--muted)]">
                Pro tip: If you already ran the configurator, paste the output here and we’ll start from a clean scope.
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}