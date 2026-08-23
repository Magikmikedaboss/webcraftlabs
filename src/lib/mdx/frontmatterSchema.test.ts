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

describe("BlogFrontmatterSchema — conditional Archive taxonomy (Phase 3.5)", () => {
  it("requires archiveCollection whenever collection is webcraft-archive", () => {
    const result = BlogFrontmatterSchema.safeParse({ ...base, collection: "webcraft-archive" });
    expect(result.success).toBe(false);
  });

  describe("archive-universe", () => {
    const archiveUniverseBase = {
      ...base,
      collection: "webcraft-archive",
      archiveCollection: "archive-universe",
    };

    it("accepts a valid archive-universe document with archiveId, mystery, and matching workType", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...archiveUniverseBase,
        archiveId: "Investigation 999",
        mystery: "What happened here?",
        workType: "investigation",
      });
      expect(result.success).toBe(true);
    });

    it("rejects archive-universe without archiveId", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...archiveUniverseBase,
        mystery: "What happened here?",
        workType: "investigation",
      });
      expect(result.success).toBe(false);
    });

    it("rejects archive-universe without mystery", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...archiveUniverseBase,
        archiveId: "Treatise III",
        workType: "treatise",
      });
      expect(result.success).toBe(false);
    });

    it("still enforces the archiveId prefix allowlist", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...archiveUniverseBase,
        archiveId: "Series — Episode 1",
        mystery: "A fabricated institutional ID should not be accepted here.",
      });
      expect(result.success).toBe(false);
    });

    it("does not require series/seriesOrder", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...archiveUniverseBase,
        archiveId: "Orientation",
        mystery: "Where do I begin?",
        workType: "orientation",
      });
      expect(result.success).toBe(true);
    });

    it("requires workType", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...archiveUniverseBase,
        archiveId: "Orientation",
        mystery: "Where do I begin?",
      });
      expect(result.success).toBe(false);
    });

    it.each([
      ["Orientation", "orientation"],
      ["Investigation 12", "investigation"],
      ["Treatise IV", "treatise"],
      ["Recovered Record 900", "recovered-record"],
    ])("accepts archiveId %s paired with its matching workType", (archiveId, workType) => {
      expect(
        BlogFrontmatterSchema.safeParse({
          ...archiveUniverseBase,
          archiveId,
          mystery: "A question.",
          workType,
        }).success
      ).toBe(true);
    });

    it("rejects a workType that doesn't match the archiveId contract", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...archiveUniverseBase,
        archiveId: "Investigation 12",
        mystery: "A question.",
        workType: "treatise",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("synthetic-minds", () => {
    const syntheticMindsBase = {
      ...base,
      collection: "webcraft-archive",
      archiveCollection: "synthetic-minds",
    };

    it("accepts a valid Synthetic Minds episode with no institutional fields", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...syntheticMindsBase,
        series: "Synthetic Minds",
        seriesOrder: 1,
        workType: "series-episode",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.archiveId).toBeUndefined();
        expect(result.data.mystery).toBeUndefined();
      }
    });

    it("does not require archiveId", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...syntheticMindsBase,
        series: "Synthetic Minds",
        seriesOrder: 2,
        workType: "series-episode",
      });
      expect(result.success).toBe(true);
    });

    it("does not require mystery", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...syntheticMindsBase,
        series: "Synthetic Minds",
        seriesOrder: 3,
        workType: "series-episode",
      });
      expect(result.success).toBe(true);
    });

    it("rejects a missing or mismatched series value", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...syntheticMindsBase,
        seriesOrder: 1,
        workType: "series-episode",
      });
      expect(result.success).toBe(false);
    });

    it("rejects a missing seriesOrder", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...syntheticMindsBase,
        series: "Synthetic Minds",
        workType: "series-episode",
      });
      expect(result.success).toBe(false);
    });

    it("rejects a non-positive or non-integer seriesOrder", () => {
      expect(
        BlogFrontmatterSchema.safeParse({
          ...syntheticMindsBase,
          series: "Synthetic Minds",
          seriesOrder: 0,
          workType: "series-episode",
        }).success
      ).toBe(false);
      expect(
        BlogFrontmatterSchema.safeParse({
          ...syntheticMindsBase,
          series: "Synthetic Minds",
          seriesOrder: 1.5,
          workType: "series-episode",
        }).success
      ).toBe(false);
    });

    it("rejects a workType other than series-episode", () => {
      const result = BlogFrontmatterSchema.safeParse({
        ...syntheticMindsBase,
        series: "Synthetic Minds",
        seriesOrder: 1,
        workType: "experiment",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("contentWarnings", () => {
    it("accepts an array of trimmed, non-empty strings", () => {
      const result = BlogFrontmatterSchema.safeParse({ ...base, contentWarnings: ["mild peril"] });
      expect(result.success).toBe(true);
    });

    it("rejects an empty-string entry rather than allowing a vague catch-all", () => {
      const result = BlogFrontmatterSchema.safeParse({ ...base, contentWarnings: [""] });
      expect(result.success).toBe(false);
    });
  });
});
