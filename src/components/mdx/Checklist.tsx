export default function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="my-6 space-y-2">
      {items.map((t, i) => (
        <li key={`${t}-${i}`} className="flex gap-3 rounded-xl border border-[var(--border)] bg-white/80 p-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-green-300 bg-green-50 text-xs font-bold">
            ✓
          </span>
          <span className="text-sm text-gray-800">{t}</span>
        </li>
      ))}
    </ul>
  );
}
