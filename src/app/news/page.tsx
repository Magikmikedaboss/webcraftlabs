import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getAllNews } from "@/lib/news";

export const metadata = {
  title: "News | WebCraft Labz",
  description: "Latest updates and announcements from WebCraft Labz.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "News | WebCraft Labz",
    description: "Latest updates and announcements from WebCraft Labz.",
    url: "/news",
    type: "website",
  },
};

export default async function NewsPage() {
  const items = await getAllNews();

  return (
    <SiteShell title="News" intro="Updates from WebCraft Labz">
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-6">
        {items.map((n) => (
          <div
            key={n.slug}
            className="border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <Link
              href={`/news/${n.slug}`}
              className="font-semibold hover:opacity-80"
            >
              {n.title}
            </Link>
            <div className="mt-1 text-xs text-[var(--muted)]">{n.date}</div>
            <p className="mt-2 text-sm text-[var(--muted)]">{n.summary}</p>
          </div>
        ))}
      </div>
    </SiteShell>
  );
}