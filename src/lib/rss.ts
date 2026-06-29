export const XML_HEADERS = {
  "Content-Type": "application/rss+xml; charset=utf-8",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
};

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export type RssItem = {
  title: string;
  description: string;
  url: string;
  date: string;
  category?: string;
};

export type RssFeedOptions = {
  title: string;
  description: string;
  link: string;
  selfUrl: string;
  items: RssItem[];
};

export function buildRssFeed(opts: RssFeedOptions): string {
  const lastBuildDate =
    opts.items.length > 0
      ? new Date(opts.items[0].date).toUTCString()
      : new Date().toUTCString();

  const itemXml = opts.items
    .map(
      (item) =>
        `<item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>${
        item.category ? `\n      <category>${escapeXml(item.category)}</category>` : ""
      }
    </item>`,
    )
    .join("\n    ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(opts.title)}</title>
    <description>${escapeXml(opts.description)}</description>
    <link>${opts.link}</link>
    <atom:link href="${opts.selfUrl}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    ${itemXml}
  </channel>
</rss>`;
}
