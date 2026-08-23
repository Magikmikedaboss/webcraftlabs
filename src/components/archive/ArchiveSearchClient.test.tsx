import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import ArchiveSearchClient, { type SearchableDoc } from "./ArchiveSearchClient";

const docs: SearchableDoc[] = [
  {
    slug: "episode-1-first-spark",
    title: "Episode 1 — The First Spark",
    archiveCollection: "synthetic-minds",
    seriesOrder: 1,
  },
  {
    slug: "the-silent-vault",
    title: "The Silent Vault",
    archiveId: "Investigation 203",
    archiveCollection: "archive-universe",
    mystery: "What disappeared?",
  },
];

describe("ArchiveSearchClient", () => {
  it("matches a Synthetic Minds episode by its episode number, even though the title has no digit", () => {
    render(<ArchiveSearchClient docs={docs} />);

    fireEvent.change(screen.getByLabelText(/search the archive/i), { target: { value: "episode 1" } });

    expect(screen.getByText("Episode 1 — The First Spark")).toBeInTheDocument();
    expect(screen.queryByText("The Silent Vault")).not.toBeInTheDocument();
  });

  it("still matches institutional documents by mystery text", () => {
    render(<ArchiveSearchClient docs={docs} />);

    fireEvent.change(screen.getByLabelText(/search the archive/i), { target: { value: "disappeared" } });

    expect(screen.getByText("The Silent Vault")).toBeInTheDocument();
    expect(screen.queryByText("Episode 1 — The First Spark")).not.toBeInTheDocument();
  });
});
