import { getBaseUrl } from "@/lib/site";

const TEXT_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
};

export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return new Response("INDEXNOW_KEY is not configured.", {
      status: 404,
      headers: {
        ...TEXT_HEADERS,
        "Cache-Control": "no-store",
      },
    });
  }

  const baseUrl = getBaseUrl();
  return new Response(key, {
    headers: {
      ...TEXT_HEADERS,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "X-IndexNow-Key-Location": `${baseUrl}/api/indexnow/key`,
    },
  });
}
