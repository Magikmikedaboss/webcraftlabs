export type ProcessStep = { title: string; description: string };

const DEFAULT_STEPS: ProcessStep[] = [
  { title: "1) Strategy", description: "Goals, offers, pages, and conversion plan." },
  { title: "2) Design", description: "Premium UI, brand feel, and layout system." },
  { title: "3) Build", description: "Responsive, fast, SEO-ready development." },
  { title: "4) Launch + Improve", description: "Tracking, iteration, and growth sprints." },
];

export default function ProcessSteps({
  title = "A simple process that stays sharp.",
  subtitle = "Premium doesn't mean complicated. It means fewer surprises, clear milestones, and a site that performs.",
  steps = DEFAULT_STEPS,
}: {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="text-xs uppercase tracking-wider opacity-70">How it works</div>
      <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-2 max-w-3xl text-sm opacity-80">{subtitle}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {steps.map((step) => (
          <div key={step.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="text-sm font-semibold text-[var(--text)]">{step.title}</div>
            <div className="mt-1 text-sm opacity-80">{step.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
