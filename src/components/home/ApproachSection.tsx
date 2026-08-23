const PRINCIPLES = [
  {
    title: "We build for the outcome, not the feature list",
    body: "Every project starts with what the site or system needs to actually do — generate calls, run a workflow, replace a spreadsheet — before we touch design or code.",
  },
  {
    title: "One team, start to finish",
    body: "The person who scopes your project is the same person who builds it. No handoffs between sales, design, and a different delivery team.",
  },
  {
    title: "Built to keep working after launch",
    body: "Clean code, clear documentation, and systems your team (or ours) can actually maintain — not a black box that only we can touch.",
  },
] as const;

export default function ApproachSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text)]">How we work</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <div key={p.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h3 className="text-lg font-semibold text-[var(--text)]">{p.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
