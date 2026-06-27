import { NextRequest, NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { getBaseUrl } from "@/lib/site";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function isAuthorized(req: NextRequest): boolean {
  const expectedToken = process.env.INDEXNOW_SUBMIT_TOKEN;
  if (!expectedToken) {
    return process.env.NODE_ENV !== "production";
  }

  const tokenHeader = req.headers.get("x-indexnow-token");
  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

  return tokenHeader === expectedToken || bearerToken === expectedToken;
}

function normalizeCandidateUrl(candidate: string, siteHost: string): string | null {
  try {
    const parsed = new URL(candidate);
    if ((parsed.protocol !== "https:" && parsed.protocol !== "http:") || parsed.host !== siteHost) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

async function getSitemapUrls(siteHost: string): Promise<string[]> {
  const entries = await sitemap();

  return entries
    .map((entry) => normalizeCandidateUrl(entry.url, siteHost))
    .filter((url): url is string => Boolean(url));
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY is not configured." },
      { status: 500 },
    );
  }

  const baseUrl = getBaseUrl();
  const siteHost = new URL(baseUrl).host;

  let body: unknown = {};
  const rawBody = await req.text();
  if (rawBody.trim()) {
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }
  }

  const hasUrlsProperty =
    body !== null &&
    typeof body === "object" &&
    Object.prototype.hasOwnProperty.call(body, "urls");
  const requestedUrls = hasUrlsProperty ? (body as { urls?: unknown }).urls : undefined;

  if (hasUrlsProperty && !Array.isArray(requestedUrls)) {
    return NextResponse.json(
      { error: "Invalid urls payload. Expected an array of URLs." },
      { status: 400 },
    );
  }

  const urls = hasUrlsProperty
    ? (requestedUrls as unknown[])
        .filter((item): item is string => typeof item === "string")
        .map((url: string) => normalizeCandidateUrl(url, siteHost))
        .filter((url: string | null): url is string => Boolean(url))
    : await getSitemapUrls(siteHost);
  const uniqueUrls = [...new Set(urls)].slice(0, 10000);
  if (uniqueUrls.length === 0) {
    return NextResponse.json(
      { error: "No valid URLs to submit." },
      { status: 400 },
    );
  }

  const payload = {
    host: siteHost,
    key,
    keyLocation: `${baseUrl}/api/indexnow/key`,
    urlList: uniqueUrls,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  let response: Response;
  try {
    response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    return NextResponse.json(
      {
        error: "Failed to reach IndexNow service.",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 502 },
    );
  }
  clearTimeout(timeoutId);

  const text = await response.text();  if (!response.ok) {
    return NextResponse.json(
      {
        error: "IndexNow submission failed.",
        status: response.status,
        details: text,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    submitted: uniqueUrls.length,
    status: response.status,
  });
}
