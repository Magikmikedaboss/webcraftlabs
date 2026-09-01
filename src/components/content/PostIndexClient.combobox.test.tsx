import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import PostIndexClient from "./PostIndexClient";

/**
 * The search field was wired as a combobox (role/aria-expanded/aria-controls)
 * but never finished: options carried no aria-selected, there was no
 * aria-activedescendant, and no keyboard path between suggestions. A keyboard
 * or screen-reader user could open the list and then do nothing with it.
 *
 * These drive the real widget rather than asserting on markup strings, so they
 * fail if the keyboard contract regresses rather than if the classes move.
 */

const posts = [
  {
    slug: "alpha-signals",
    title: "Alpha Signals",
    description: "About alpha.",
    date: "2026-01-01",
    tags: ["alpha", "research"],
    kind: "blog" as const,
  },
  {
    slug: "alpha-beta-loop",
    title: "Alpha Beta Loop",
    description: "About beta.",
    date: "2026-01-02",
    tags: ["alpha", "beta"],
    kind: "blog" as const,
  },
  {
    slug: "gamma-report",
    title: "Gamma Report",
    description: "About gamma.",
    date: "2026-01-03",
    tags: ["gamma"],
    kind: "blog" as const,
  },
];

/** Renders, types `query`, and returns the input once the popup is open. */
function openWith(query = "alpha") {
  render(<PostIndexClient posts={posts} kind="blog" />);
  const input = screen.getByRole("combobox");
  fireEvent.change(input, { target: { value: query } });
  return input;
}

const options = () => within(screen.getByRole("listbox")).getAllByRole("option");
const activeDescendant = (input: HTMLElement) => input.getAttribute("aria-activedescendant");

/**
 * jsdom implements no layout and no scrollIntoView at all, so the component
 * would throw the moment an option becomes active. Stub it file-wide and
 * record which element was asked to scroll and with what — the assertions are
 * about the call, never about pixels or geometry.
 */
const scrollCalls: { el: Element; opts: unknown }[] = [];
const originalScrollIntoView = Element.prototype.scrollIntoView;

beforeEach(() => {
  scrollCalls.length = 0;
  Element.prototype.scrollIntoView = function (this: Element, opts?: unknown) {
    scrollCalls.push({ el: this, opts });
  } as unknown as Element["scrollIntoView"];
});

afterEach(() => {
  Element.prototype.scrollIntoView = originalScrollIntoView;
});

describe("post search combobox — ARIA wiring", () => {
  it("exposes a closed combobox before anything is typed", () => {
    render(<PostIndexClient posts={posts} kind="blog" />);
    const input = screen.getByRole("combobox");
    expect(input.getAttribute("aria-expanded")).toBe("false");
    expect(input.getAttribute("aria-autocomplete")).toBe("list");
    // No popup exists, so nothing may point at one.
    expect(input.getAttribute("aria-controls")).toBeNull();
    expect(activeDescendant(input)).toBeNull();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("opens a listbox whose id is the one aria-controls names", () => {
    const input = openWith();
    const listbox = screen.getByRole("listbox");
    expect(input.getAttribute("aria-expanded")).toBe("true");
    expect(input.getAttribute("aria-controls")).toBe(listbox.getAttribute("id"));
  });

  it("gives every option an id and an explicit aria-selected", () => {
    openWith();
    for (const option of options()) {
      expect(option.getAttribute("id")).toBeTruthy();
      // Explicitly present and false — not merely absent.
      expect(option.getAttribute("aria-selected")).toBe("false");
    }
  });

  it("sets no aria-activedescendant until an option is actually active", () => {
    const input = openWith();
    expect(activeDescendant(input)).toBeNull();
  });
});

describe("post search combobox — keyboard", () => {
  it("ArrowDown activates the first option when none is active", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const opts = options();
    expect(opts[0].getAttribute("aria-selected")).toBe("true");
    expect(activeDescendant(input)).toBe(opts[0].getAttribute("id"));
  });

  it("ArrowDown then moves to the next option", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const opts = options();
    expect(opts[0].getAttribute("aria-selected")).toBe("false");
    expect(opts[1].getAttribute("aria-selected")).toBe("true");
    expect(activeDescendant(input)).toBe(opts[1].getAttribute("id"));
  });

  it("ArrowUp activates the last option when none is active", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowUp" });
    const opts = options();
    expect(opts[opts.length - 1].getAttribute("aria-selected")).toBe("true");
  });

  it("ArrowUp moves upward from the active option", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowUp" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    const opts = options();
    expect(opts[opts.length - 2].getAttribute("aria-selected")).toBe("true");
  });

  it("keeps exactly one option active at a time", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const selected = options().filter((o) => o.getAttribute("aria-selected") === "true");
    expect(selected).toHaveLength(1);
  });

  it("Home and End jump to the first and last option while open", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "End" });
    let opts = options();
    expect(opts[opts.length - 1].getAttribute("aria-selected")).toBe("true");

    fireEvent.keyDown(input, { key: "Home" });
    opts = options();
    expect(opts[0].getAttribute("aria-selected")).toBe("true");
  });

  it("Enter accepts the active suggestion and closes the popup", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const chosen = options()[0].textContent;
    fireEvent.keyDown(input, { key: "Enter" });

    expect((input as HTMLInputElement).value).toBe(chosen);
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(input.getAttribute("aria-expanded")).toBe("false");
    expect(activeDescendant(input)).toBeNull();
  });

  it("Enter with no active option does not hijack the keystroke", () => {
    const input = openWith();
    const notPrevented = fireEvent.keyDown(input, { key: "Enter" });
    expect(notPrevented).toBe(true);
    expect((input as HTMLInputElement).value).toBe("alpha");
    expect(screen.getByRole("listbox")).toBeTruthy();
  });

  it("Escape closes the list and clears the active option but keeps the query", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Escape" });

    expect(screen.queryByRole("listbox")).toBeNull();
    expect(activeDescendant(input)).toBeNull();
    expect((input as HTMLInputElement).value).toBe("alpha");
  });

  it("does not trap Tab", () => {
    const input = openWith();
    const notPrevented = fireEvent.keyDown(input, { key: "Tab" });
    expect(notPrevented).toBe(true);
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("prevents the default scroll for the arrow keys it consumes", () => {
    const input = openWith();
    expect(fireEvent.keyDown(input, { key: "ArrowDown" })).toBe(false);
    expect(fireEvent.keyDown(input, { key: "ArrowUp" })).toBe(false);
  });
});

describe("post search combobox — pointer and state safety", () => {
  it("pointer selection produces the same result as Enter", () => {
    const input = openWith();
    const chosen = options()[1].textContent!;
    fireEvent.mouseDown(options()[1]);

    expect((input as HTMLInputElement).value).toBe(chosen);
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("hovering an option makes it the active one", () => {
    const input = openWith();
    fireEvent.mouseEnter(options()[1]);
    expect(options()[1].getAttribute("aria-selected")).toBe("true");
    expect(activeDescendant(input)).toBe(options()[1].getAttribute("id"));
  });

  it("resets the active option when the result set changes", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(activeDescendant(input)).toBeTruthy();

    // Narrowing the query rebuilds the list — the old highlight must not survive.
    fireEvent.change(input, { target: { value: "alpha b" } });
    expect(activeDescendant(input)).toBeNull();
    expect(options().every((o) => o.getAttribute("aria-selected") === "false")).toBe(true);
  });

  it("drops aria-activedescendant when the query stops matching anything", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.change(input, { target: { value: "zzzznomatch" } });

    expect(screen.queryByRole("listbox")).toBeNull();
    expect(activeDescendant(input)).toBeNull();
    expect(input.getAttribute("aria-expanded")).toBe("false");
  });
});

/**
 * The suggestion list is height-capped, so arrowing past the fold has to bring
 * the active option back into view.
 */
describe("post search combobox — active option stays in view", () => {
  const calls = scrollCalls;

  it("scrolls the newly active option into view, minimally", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowDown" });

    expect(calls).toHaveLength(1);
    expect(calls[0].el).toBe(options()[0]);
    // "nearest" is what keeps the page itself from jumping.
    expect(calls[0].opts).toEqual({ block: "nearest" });
  });

  it("scrolls the new option when the active option moves", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });

    expect(calls).toHaveLength(2);
    expect(calls[1].el).toBe(options()[1]);
  });

  it("scrolls the last option into view when ArrowUp wraps to the end", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowUp" });

    const opts = options();
    expect(calls).toHaveLength(1);
    expect(calls[0].el).toBe(opts[opts.length - 1]);
  });

  it("does not scroll when the list opens with no active option", () => {
    openWith();
    expect(screen.getByRole("listbox")).toBeTruthy();
    expect(calls).toHaveLength(0);
  });

  it("does not try to scroll anything once Escape closes the list", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(calls).toHaveLength(1);

    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByRole("listbox")).toBeNull();
    // No second call, and nothing threw on the now-unmounted option.
    expect(calls).toHaveLength(1);
  });

  it("does not scroll when a suggestion is accepted", () => {
    const input = openWith();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    const before = calls.length;

    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(calls).toHaveLength(before);
  });

  it("leaves pointer selection behaviour unchanged", () => {
    const input = openWith();
    const chosen = options()[1].textContent!;
    fireEvent.mouseDown(options()[1]);

    expect((input as HTMLInputElement).value).toBe(chosen);
    expect(screen.queryByRole("listbox")).toBeNull();
    // Selecting with the pointer never scrolls the list.
    expect(calls).toHaveLength(0);
  });
});
