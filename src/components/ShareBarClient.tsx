"use client";

import ShareBar from "./mdx/ShareBar";

export default function ShareBarClient({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  return <ShareBar title={title} url={url} />;
}
