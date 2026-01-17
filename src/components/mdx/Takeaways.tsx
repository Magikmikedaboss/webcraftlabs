export default function Takeaways({
  title = "Key takeaways",
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <div className="takeaways">
      <h3>{title}</h3>
      <ul>
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
