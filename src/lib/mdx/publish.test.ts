import { describe, it, expect } from "vitest";
import { isPostPublished } from "./blog";
import { isNewsPublished } from "./news";
import { laPublishCutoff } from "./publishCutoff";

describe("isPostPublished / isNewsPublished", () => {
  const today = laPublishCutoff();
  const yesterday = laPublishCutoff(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const farFuture = "2999-01-01";

  it.each([
    ["isPostPublished", isPostPublished],
    ["isNewsPublished", isNewsPublished],
  ] as const)("%s treats published: true as published regardless of date", (_name, fn) => {
    expect(fn({ date: farFuture, published: true })).toBe(true);
  });

  it.each([
    ["isPostPublished", isPostPublished],
    ["isNewsPublished", isNewsPublished],
  ] as const)("%s treats published: false as unpublished regardless of date", (_name, fn) => {
    expect(fn({ date: yesterday, published: false })).toBe(false);
  });

  it.each([
    ["isPostPublished", isPostPublished],
    ["isNewsPublished", isNewsPublished],
  ] as const)("%s accepts legacy string tokens (case-insensitive)", (_name, fn) => {
    expect(fn({ date: farFuture, published: "Published" })).toBe(true);
    expect(fn({ date: farFuture, published: "yes" })).toBe(true);
  });

  it.each([
    ["isPostPublished", isPostPublished],
    ["isNewsPublished", isNewsPublished],
  ] as const)("%s falls back to the publish-cutoff date when `published` is absent", (_name, fn) => {
    expect(fn({ date: yesterday })).toBe(true);
    expect(fn({ date: today })).toBe(true);
    expect(fn({ date: farFuture })).toBe(false);
  });
});
