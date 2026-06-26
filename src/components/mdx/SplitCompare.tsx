export default function SplitCompare({
  leftTitle,
  rightTitle,
  left,
  right,
}: {
  leftTitle: string;
  rightTitle: string;
  left: string[];
  right: string[];
}) {
  return (
    <div
      className="my-8 grid grid-cols-1 sm:grid-cols-2 rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="p-6"
        style={{ background: "color-mix(in srgb, var(--surface) 95%, transparent)" }}
      >
        <div
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: "var(--muted)" }}
        >
          {leftTitle}
        </div>
        <ul className="space-y-2">
          {left.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm"
              style={{ color: "var(--text)" }}
            >
              <span
                className="mt-0.5 shrink-0"
                style={{ color: "var(--muted)" }}
              >
                &ndash;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="p-6 border-t sm:border-t-0 sm:border-l border-[var(--border)]"
        style={{
          background: "color-mix(in srgb, var(--primary) 6%, var(--surface))",
        }}
      >
        <div
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: "var(--primary)" }}
        >
          {rightTitle}
        </div>
        <ul className="space-y-2">
          {right.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm"
              style={{ color: "var(--text)" }}
            >
              <span
                className="mt-0.5 shrink-0"
                style={{ color: "var(--primary)" }}
              >
                &rarr;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
