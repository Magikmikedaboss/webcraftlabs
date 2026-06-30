export type TakeawayItem = { id: string; text: string };

function isValidTakeaway(item: unknown): item is TakeawayItem {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof (item as { id?: unknown }).id === "string" &&
    typeof (item as { text?: unknown }).text === "string"
  );
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
  return (
    <div className="takeaways">
      <h3>{title}</h3>
      <ul>
        {validItems.map((item) => (
          <li key={item.id}>{item.text}</li>
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
