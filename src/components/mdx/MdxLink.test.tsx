import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MdxLink from "./MdxLink";

describe("MdxLink (the `a` override for MDX content)", () => {
  it("adds rel=\"noopener noreferrer\" to external links", () => {
    render(<MdxLink href="https://vercel.com/docs">Vercel docs</MdxLink>);
    const rel = screen.getByRole("link", { name: "Vercel docs" }).getAttribute("rel");
    expect(rel?.split(" ").sort()).toEqual(["noopener", "noreferrer"]);
  });

  it("never marks an ordinary external link sponsored or nofollow", () => {
    render(<MdxLink href="https://supabase.com">Supabase</MdxLink>);
    const rel = screen.getByRole("link", { name: "Supabase" }).getAttribute("rel") ?? "";
    expect(rel).not.toContain("sponsored");
    expect(rel).not.toContain("nofollow");
  });

  it("does not force external links into a new tab", () => {
    render(<MdxLink href="https://example.com">Example</MdxLink>);
    expect(screen.getByRole("link", { name: "Example" }).getAttribute("target")).toBeNull();
  });

  it("leaves internal links untouched", () => {
    render(<MdxLink href="/blog/some-post">Some post</MdxLink>);
    const link = screen.getByRole("link", { name: "Some post" });
    expect(link.getAttribute("rel")).toBeNull();
    expect(link.getAttribute("href")).toBe("/blog/some-post");
  });

  it.each(["#section", "mailto:info@webcraftlabz.com", "tel:+15550000000"])(
    "leaves %s untouched",
    (href) => {
      render(<MdxLink href={href}>Link</MdxLink>);
      expect(screen.getByRole("link", { name: "Link" }).getAttribute("rel")).toBeNull();
    }
  );

  it("preserves an author-supplied rel and merges rather than overwrites", () => {
    render(
      <MdxLink href="https://example.com" rel="nofollow">
        Nofollowed
      </MdxLink>
    );
    const rel = screen.getByRole("link", { name: "Nofollowed" }).getAttribute("rel") ?? "";
    expect(rel.split(" ").sort()).toEqual(["nofollow", "noopener", "noreferrer"]);
  });

  it("passes through other anchor props such as className and title", () => {
    render(
      <MdxLink href="https://example.com" className="prose-link" title="Example site">
        Example
      </MdxLink>
    );
    const link = screen.getByRole("link", { name: "Example" });
    expect(link.getAttribute("class")).toBe("prose-link");
    expect(link.getAttribute("title")).toBe("Example site");
  });
});
