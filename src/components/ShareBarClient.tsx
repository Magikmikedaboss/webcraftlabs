"use client";

import ShareBar from "./mdx/ShareBar";

export default function ShareBarClient({
  title,
  url,
  description: _description,
  cover: _cover,
}: {
  title: string;
  url: string;
  description?: string;
  cover?: string;
}) {
  return <ShareBar title={title} url={url} />;
}
