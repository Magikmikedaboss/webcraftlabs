"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { LEARNING_PATH_META } from "@/lib/resourcePathMeta";
import type { ActiveLearningPath } from "@/lib/resources";

/* eslint-disable @typescript-eslint/no-explicit-any */

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
}) as React.ComponentType<any>;

export type ConstellationResource = {
  id: string;
  title: string;
  href: string;
  path: ActiveLearningPath;
  audience: readonly string[];
};

type GraphNode = {
  id: string;
  title: string;
  href: string;
  path: ActiveLearningPath;
  audience: readonly string[];
  val: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  anchorX: number;
  anchorY: number;
  __labelOpacity?: number;
};

type GraphLink = {
  source: string;
  target: string;
  bridge?: boolean;
};

/**
 * Literal hex colors, one per active learning path — canvas fillStyle
 * requires literal values (CSS custom properties aren't usable here).
 * .rc-map-frame is always dark regardless of site theme (the same
 * deliberate fixed-dark treatment Projects & Experiments and the closing
 * CTA use), so these only need to read clearly against --rc-dark-bg
 * (#101828) — no separate light/dark variants required.
 */
const PATH_COLOR: Record<ActiveLearningPath, string> = {
  "modern-web-development": "#27b7ce",
  "ai-workflow-automation": "#5b85ff",
  "websites-that-grow-businesses": "#ff7a5c",
  "experiments-emerging-ideas": "#c084fc",
  "building-software-products": "#34d399",
};

export default function KnowledgeConstellation({
  resources,
}: {
  resources: readonly ConstellationResource[];
}) {
  const router = useRouter();
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const reduceMotionRef = useRef(false);
  const hoveredIdRef = useRef<string | null>(null);
  const userInteractedRef = useRef(false);

  // react-force-graph-2d's own auto-sizing can measure the container
  // before its CSS height (h-[360px]/sm:h-[420px]) has actually applied,
  // leaving the internal canvas taller than the visible box — the graph
  // still computes fine, it's just clipped by .rc-map-frame's
  // overflow-hidden. Tracking the real size explicitly and passing it in
  // as width/height props keeps the canvas honest.
  useEffect(() => {
    // Runs once on the initial (pre-mounted) commit, when containerRef
    // isn't attached to anything yet — must re-run once `mounted` flips
    // true and the real container div (holding the ref) actually exists.
    if (!containerRef.current) return;
    const el = containerRef.current;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  // Marks the graph as user-driven so the auto-fit loop below stops
  // touching the camera the moment someone tries to pan, zoom, or drag —
  // same "runs on the pre-mounted commit" reasoning as the ResizeObserver
  // effect above.
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const markInteracted = () => {
      userInteractedRef.current = true;
    };
    el.addEventListener("pointerdown", markInteracted);
    el.addEventListener("wheel", markInteracted, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", markInteracted);
      el.removeEventListener("wheel", markInteracted);
    };
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(() => {
    // Seed each node near its path's anchor point on a ring so resources
    // in the same path start out clustered together before the
    // simulation settles. Same-path chain links plus the graph's default
    // node-to-node repulsion do the rest — no custom d3-force clustering
    // needed (d3-force isn't a direct dependency we can safely import).
    const paths = Array.from(new Set(resources.map((r) => r.path)));
    const anchors: Partial<Record<ActiveLearningPath, { x: number; y: number }>> = {};
    paths.forEach((path, i) => {
      const angle = (i / paths.length) * Math.PI * 2 - Math.PI / 2;
      anchors[path] = { x: Math.cos(angle) * 140, y: Math.sin(angle) * 140 };
    });

    const nodes: GraphNode[] = resources.map((r) => {
      const anchor = anchors[r.path] ?? { x: 0, y: 0 };
      return {
        id: r.id,
        title: r.title,
        href: r.href,
        path: r.path,
        audience: r.audience,
        val: 3 + r.audience.length,
        x: anchor.x + (Math.random() - 0.5) * 60,
        y: anchor.y + (Math.random() - 0.5) * 60,
        anchorX: anchor.x,
        anchorY: anchor.y,
      };
    });

    const links: GraphLink[] = [];
    paths.forEach((path) => {
      const group = nodes.filter((n) => n.path === path);
      if (group.length < 2) return;
      for (let i = 0; i < group.length; i++) {
        links.push({ source: group[i].id, target: group[(i + 1) % group.length].id });
      }
    });

    // Cross-path "bridge" links: real, already-tagged audience overlap
    // (developers/founders/business-owners/ai-adopters), not a made-up
    // relationship — two resources from different paths connect when
    // they share 2+ audience tags.
    for (let i = 0; i < resources.length; i++) {
      for (let j = i + 1; j < resources.length; j++) {
        if (resources[i].path === resources[j].path) continue;
        const shared = resources[i].audience.filter((a) => resources[j].audience.includes(a));
        if (shared.length >= 2) {
          links.push({ source: resources[i].id, target: resources[j].id, bridge: true });
        }
      }
    }

    return { nodes, links };
  }, [resources]);

  // Tune the charge/link forces once the graph engine is ready. Polls via
  // rAF rather than the ForceGraph2D engine-stop event, then re-fits the
  // camera a few times as the reheated layout settles.
  useEffect(() => {
    if (!mounted) return;

    let raf = 0;
    const applyForces = () => {
      const fg = fgRef.current;
      if (!fg?.d3Force) {
        raf = requestAnimationFrame(applyForces);
        return;
      }

      const charge = fg.d3Force("charge");
      if (charge && typeof charge.strength === "function") {
        charge.strength(-140);
      }

      // Real audience tagging means most resources share 2+ tags with
      // several others — without this, the default link force pulls every
      // bridge just as tightly as a same-path chain link, and the whole
      // graph collapses into one dense clump. Bridges get a long, weak
      // spring (soft, easily overcome by charge repulsion); same-path
      // links stay short and strong, so each path still reads as its own
      // cluster.
      const link = fg.d3Force("link");
      if (link && typeof link.distance === "function") {
        link.distance((l: any) => (l.bridge ? 260 : 45));
        link.strength((l: any) => (l.bridge ? 0.02 : 0.35));
      }

      // Paths with only one resource (or whose lone resource shares fewer
      // than 2 audience tags with anything) get zero links — nothing but
      // charge repulsion acts on them, so they drift arbitrarily far from
      // the rest of the graph with nothing to pull them back. A gentle,
      // uniform pull toward each node's own seeded cluster anchor fixes
      // that: negligible for already-linked nodes (their link forces are
      // 10x+ stronger), but it's the only restoring force an isolated
      // node has, keeping it a visible, but not orphaned, distance away.
      fg.d3Force("anchor", (alpha: number) => {
        for (const n of data.nodes) {
          if (n.x == null || n.y == null) continue;
          n.vx = (n.vx ?? 0) + (n.anchorX - n.x) * 0.03 * alpha;
          n.vy = (n.vy ?? 0) + (n.anchorY - n.y) * 0.03 * alpha;
        }
      });

      fg.d3ReheatSimulation?.();
    };

    raf = requestAnimationFrame(applyForces);
    return () => cancelAnimationFrame(raf);
  }, [mounted, data]);

  // react-force-graph-2d's ref doesn't expose graphData()/getGraphBbox()
  // (only a fixed subset of methods — see its methodNames list), and its
  // own zoomToFit repeatedly failed to frame roughly half the graph
  // (whichever nodes settle below y=0) no matter how long it was given —
  // most likely because it only measures nodes the canvas has actually
  // drawn, which is circular once a cluster starts outside the current
  // view. d3-force mutates x/y directly on the same node objects passed
  // into graphData, so reading `data.nodes` here (not the canvas, not a
  // ref method) sidesteps that entirely — this is the same array identity
  // the simulation is updating live.
  useEffect(() => {
    if (!mounted) return;

    const deadline = Date.now() + 8000;
    let raf = 0;

    const fitToData = () => {
      // Stop the moment the user pans/zooms/drags — without this, a fit
      // firing on the very next frame after their input made the graph
      // feel unresponsive, snapping the camera back to the auto-fit
      // position every ~16ms for the whole 8s settling window.
      if (userInteractedRef.current) return;

      const fg = fgRef.current;
      if (fg && size?.width && size?.height) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (const n of data.nodes) {
          if (n.x == null || n.y == null) continue;
          if (n.x < minX) minX = n.x;
          if (n.x > maxX) maxX = n.x;
          if (n.y < minY) minY = n.y;
          if (n.y > maxY) maxY = n.y;
        }
        if (isFinite(minX)) {
          const bboxW = Math.max(maxX - minX, 40);
          const bboxH = Math.max(maxY - minY, 40);
          const padding = 50;
          const k = Math.min(
            (size.width - padding * 2) / bboxW,
            (size.height - padding * 2) / bboxH
          );
          fg.centerAt?.((minX + maxX) / 2, (minY + maxY) / 2, 0);
          fg.zoom?.(Math.max(0.3, Math.min(k, 4)), 0);
        }
      }
      if (Date.now() < deadline) raf = requestAnimationFrame(fitToData);
    };

    raf = requestAnimationFrame(fitToData);
    return () => cancelAnimationFrame(raf);
  }, [mounted, data, size]);

  // Fade node labels in over time.
  useEffect(() => {
    if (!mounted) return;

    // Respect prefers-reduced-motion: skip the fade-in animation entirely
    // and show labels at full opacity immediately, rather than running the
    // (purely decorative) per-frame opacity loop below.
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    reduceMotionRef.current = reduceMotion;

    if (reduceMotion) {
      return;
    }

    let raf = 0;

    const step = () => {
      const fg = fgRef.current;
      if (!fg) {
        raf = requestAnimationFrame(step);
        return;
      }

      const graph = fg.graphData?.();
      const nodes = graph?.nodes as GraphNode[] | undefined;

      if (!nodes) {
        raf = requestAnimationFrame(step);
        return;
      }

      let dirty = false;

      for (const node of nodes) {
        node.__labelOpacity ??= 0;

        if (node.__labelOpacity < 1) {
          node.__labelOpacity = Math.min(1, node.__labelOpacity + 0.03);
          dirty = true;
        }
      }

      if (dirty) {
        fg.refresh?.();
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, [mounted, data]);

  if (!mounted) {
    return <div className="rc-panel h-[420px] w-full" />;
  }

  if (!resources.length) {
    return <div className="rc-panel rc-body p-6">No topic nodes available yet.</div>;
  }

  return (
    <div className="rc-map-frame w-full overflow-hidden rounded-2xl p-2">
      {/* Canvas widget has no meaningful accessibility tree of its own — the
          identical set of links is fully available via the plain-text nav
          rendered alongside it (TopicListItems, grouped by path), so this is
          hidden rather than exposed as an unlabeled/partially-operable
          widget. */}
      <div ref={containerRef} className="h-[360px] w-full sm:h-[420px]" aria-hidden="true">
        {/* Only mounted once the container's real size is known — passing
            width/height as undefined on ForceGraph2D's first render makes
            it fall back to window.innerHeight permanently, since it
            doesn't reactively re-read these props after mount. */}
        {size && (
        <ForceGraph2D
          ref={fgRef as any}
          width={size.width}
          height={size.height}
          graphData={data}
          nodeId="id"
          nodeLabel={(node: any) =>
            `<div style="font:600 12px system-ui, sans-serif; max-width: 220px;">${node.title}<br/><span style="opacity:.7; font-weight:500;">${LEARNING_PATH_META[node.path as ActiveLearningPath].label}</span></div>`
          }
          nodeVal={(node: any) => node.val ?? 3}
          linkColor={(link: any) => (link.bridge ? "rgba(251,191,36,0.55)" : "rgba(154,166,184,0.22)")}
          linkWidth={(link: any) => (link.bridge ? 1.3 : 0.8)}
          linkLineDash={(link: any) => (link.bridge ? [4, 4] : null)}
          linkDirectionalParticles={(link: any) => (link.bridge ? 2 : 0)}
          linkDirectionalParticleSpeed={0.006}
          linkDirectionalParticleWidth={1.4}
          linkDirectionalParticleColor={() => "#fbbf24"}
          enableNodeDrag
          cooldownTicks={160}
          onNodeHover={(node: any) => {
            hoveredIdRef.current = node?.id ?? null;
            fgRef.current?.refresh?.();
          }}
          onNodeClick={(node: any) => {
            if (node?.href) router.push(node.href);
          }}
          nodeCanvasObject={(
            node: any,
            ctx: CanvasRenderingContext2D,
            globalScale: number
          ) => {
            if (node.x == null || node.y == null) return;

            const isHovered = node.id === hoveredIdRef.current;
            const radius = (isHovered ? 1.3 : 1) * (4 + (node.val ?? 3) * 1.2);
            const color = PATH_COLOR[node.path as ActiveLearningPath] || "#9aa6c2";
            const fadeOpacity = reduceMotionRef.current ? 1 : (node.__labelOpacity ?? 0);

            ctx.globalAlpha = 0.95;
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            ctx.fill();

            ctx.globalAlpha = 0.12;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius + 8, 0, 2 * Math.PI);
            ctx.fill();

            // Full label on hover; otherwise a small always-on label once
            // faded in, skipped entirely when zoomed out enough that dense
            // clusters would just overlap into noise.
            if (isHovered) {
              const fontSize = 12 / globalScale + 2;
              ctx.globalAlpha = 1;
              ctx.font = `600 ${fontSize}px Sans-Serif`;
              ctx.fillStyle = "#f5f3ee"; // rc-dark-ink
              ctx.textAlign = "left";
              ctx.textBaseline = "middle";
              ctx.fillText(node.title ?? "", node.x + radius + 6, node.y);
            } else if (globalScale > 0.6) {
              const label =
                node.title && node.title.length > 22 ? node.title.slice(0, 21) + "…" : node.title ?? "";
              ctx.globalAlpha = fadeOpacity * 0.55;
              ctx.font = `500 ${9 / globalScale + 1}px Sans-Serif`;
              ctx.fillStyle = "#c7ccd8";
              ctx.textAlign = "left";
              ctx.textBaseline = "middle";
              ctx.fillText(label, node.x + radius + 4, node.y);
            }

            ctx.globalAlpha = 1;
          }}
          nodePointerAreaPaint={(
            node: any,
            color: string,
            ctx: CanvasRenderingContext2D
          ) => {
            if (node.x == null || node.y == null) return;

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 14, 0, 2 * Math.PI);
            ctx.fill();
          }}
        />
        )}
      </div>

      <div className="rc-body-on-dark mt-3 px-1">
        Optional: drag and click nodes to explore. Gold dashed lines connect resources across
        different paths that share an audience. Every resource is also listed as a plain link
        {" "}alongside this map, grouped by path.
      </div>
    </div>
  );
}
