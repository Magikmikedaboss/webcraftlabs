import { describe, it, expect } from "vitest";
import { BlogFrontmatterSchema } from "./frontmatterSchema";

const base = {
  title: "Test",
  description: "Test description",
  date: "2026-01-01",
};

describe("BlogFrontmatterSchema — Resource Center taxonomy", () => {
  it("accepts frontmatter with none of the new fields (existing content stays valid)", () => {
    const result = BlogFrontmatterSchema.safeParse(base);
    expect(result.success).toBe(true);
  });

  it("accepts all six taxonomy fields together", () => {
    const result = BlogFrontmatterSchema.safeParse({
      ...base,
      resourceType: "guide",
      audience: ["founders", "business-owners"],
      learningPath: "ai-workflow-automation",
      difficulty: "beginner",
      relatedService: "/services/ai-automation",
      featured: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown resourceType value", () => {
    const result = BlogFrontmatterSchema.safeParse({ ...base, resourceType: "listicle" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown audience value", () => {
    const result = BlogFrontmatterSchema.safeParse({ ...base, audience: ["everyone"] });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown learningPath value", () => {
    const result = BlogFrontmatterSchema.safeParse({ ...base, learningPath: "marketing-tips" });
    expect(result.success).toBe(false);
  });

  it("accepts building-software-products as a valid (currently unused) learningPath", () => {
    const result = BlogFrontmatterSchema.safeParse({ ...base, learningPath: "building-software-products" });
    expect(result.success).toBe(true);
  });

  describe("relatedService", () => {
    it("accepts a relative internal path", () => {
      const result = BlogFrontmatterSchema.safeParse({ ...base, relatedService: "/services/ai-automation" });
      expect(result.success).toBe(true);
    });

    it("rejects an absolute external URL", () => {
      const result = BlogFrontmatterSchema.safeParse({ ...base, relatedService: "https://example.com/evil" });
      expect(result.success).toBe(false);
    });

    it("rejects a protocol-relative URL", () => {
      const result = BlogFrontmatterSchema.safeParse({ ...base, relatedService: "//example.com" });
      expect(result.success).toBe(false);
    });

    it("rejects a path without a leading slash", () => {
      const result = BlogFrontmatterSchema.safeParse({ ...base, relatedService: "services/ai-automation" });
      expect(result.success).toBe(false);
    });

    it("treats an empty string as absent (like other optional string fields)", () => {
      const result = BlogFrontmatterSchema.safeParse({ ...base, relatedService: "" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.relatedService).toBeUndefined();
      }
    });
  });
});
