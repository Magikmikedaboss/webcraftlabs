import type { ReactNode } from "react";

export default function Chapter({
  number,
  eyebrow,
  title,
  children,
}: {
  number?: number;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="my-10">
      <div className="mb-6 border-b pb-4" style={{ borderColor: "var(--border)" }}>
        {(number !== undefined || eyebrow) && (
          <div
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--muted)" }}
          >
            {number !== undefined && (
              <span style={{ color: "var(--primary)" }}>
                Chapter {number}
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
