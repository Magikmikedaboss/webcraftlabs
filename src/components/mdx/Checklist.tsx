export default function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="my-6 space-y-2">
      {items.map((t, i) => (
        <li key={`${t}-${i}`} className="flex gap-3 rounded-xl border p-3" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs font-bold" style={{ borderColor: 'var(--primary)', background: 'var(--accent)', color: 'var(--primary)' }}>
            ✓
          </span>
          <span className="text-sm" style={{ color: 'var(--text)' }}>{t}</span>
        </li>
      ))}
    </ul>
  );
}
