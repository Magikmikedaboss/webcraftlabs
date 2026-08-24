import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NextRequest } from "next/server";

const ORIGINAL_ENV = { ...process.env };

async function loadRoute() {
  vi.resetModules();
  return import("./route");
}

function makeRequest(body: unknown, token = "test-token") {
  return new NextRequest("http://localhost/api/indexnow", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-indexnow-token": token,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/indexnow — canonical origin validation", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.webcraftlabz.com";
    process.env.INDEXNOW_SUBMIT_TOKEN = "test-token";
    process.env.INDEXNOW_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("OK", { status: 200 }))
    );
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("accepts a URL on the canonical www origin", async () => {
    const { POST } = await loadRoute();
    const req = makeRequest({ urls: ["https://www.webcraftlabz.com/blog/example"] });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.submitted).toBe(1);
  });

  it("rejects URLs that are not on the canonical www origin", async () => {
    const { POST } = await loadRoute();
    const req = makeRequest({
      urls: ["https://webcraftlabz.com/blog/example", "https://evil.example.com/x"],
    });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.error).toMatch(/no valid urls/i);
  });

  it("filters out mismatched-origin URLs while still submitting the valid one", async () => {
    const { POST } = await loadRoute();
    const req = makeRequest({
      urls: ["https://www.webcraftlabz.com/blog/valid", "https://webcraftlabz.com/blog/invalid-apex"],
    });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.submitted).toBe(1);
  });
});
