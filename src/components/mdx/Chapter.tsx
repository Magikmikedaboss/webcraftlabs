import type { ReactNode } from "react";

export default function Chapter({
  number,
  eyebrow,
  title,
  label = "Chapter",
  children,
}: {
  number?: number;
  eyebrow?: string;
  title: string;
  /** Override the "Chapter" prefix. E.g. label="FILE" renders "FILE 01 · Year Zero" */
  label?: string;
  children: ReactNode;
}) {
  const prefix = number !== undefined
    ? `${label} ${String(number).padStart(2, "0")}`
    : null;

  return (
    <section className="my-10">
      <div className="mb-6 border-b pb-4" style={{ borderColor: "var(--border)" }}>
        {(prefix || eyebrow) && (
          <div
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--muted)" }}
          >
            {prefix && (
              <span style={{ color: "var(--primary)" }}>
                {prefix}
                {eyebrow && " · "}
              </span>
            )}
            {eyebrow && <span>{eyebrow}</span>}
          </div>
        )}
        <h2
          className="text-2xl sm:text-3xl font-bold leading-tight"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </section>
  );
}
