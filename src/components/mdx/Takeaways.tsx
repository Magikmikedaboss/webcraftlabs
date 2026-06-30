export type TakeawayItem = { id: string; text: string };

function isValidTakeaway(item: unknown): item is TakeawayItem {
  if (item === null || typeof item !== 'object') return false;
  const maybeId = (item as { id?: unknown }).id;
  const maybeText = (item as { text?: unknown }).text;
  if (typeof maybeId !== 'string' || typeof maybeText !== 'string') return false;
  const id = maybeId;
  const text = maybeText;
  if (id.trim().length === 0 || text.trim().length === 0) return false;
  return true;
}

export function Takeaways({
  title = "Key takeaways",
  items = [],
}: {
  title?: string;
  items?: TakeawayItem[];
}) {
  const validItems = Array.isArray(items) ? items.filter(isValidTakeaway) : [];
  if (validItems.length === 0) return null;
  const normalized = validItems.map((it) => ({ id: it.id.trim(), text: it.text.trim() }));
  return (
    <div className="takeaways">
      <h3>{title}</h3>
      <ul>
        {normalized.map((item, i) => (
          <li key={`${item.id}-${i}`}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

// MDX-friendly default export: accept loose input from MDX files, normalize
// to an array, and delegate to the strongly-typed `Takeaways` component.
export default function MDXTakeaways({
  title = "Key takeaways",
  items = [],
}: {
  title?: string;
  items?: unknown;
}) {
  const safeItems = Array.isArray(items) ? items : [];
  // Pass through to the typed component; it will perform final validation.
  return <Takeaways title={title} items={safeItems as TakeawayItem[]} />;
}
