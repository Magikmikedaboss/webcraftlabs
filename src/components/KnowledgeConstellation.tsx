"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
}) as React.ComponentType<any>;

type Topic = {
  title: string;
  href: string;
  chips?: readonly string[];
  description?: string;
};

type GraphNode = {
  id: string;
  title: string;
  href: string;
  group: number;
  val: number;
  chips: readonly string[];
  description?: string;
  x?: number;
  y?: number;
  __labelOpacity?: number;
};

type GraphLink = {
  source: string;
  target: string;
};

export default function KnowledgeConstellation({
  topics,
}: {
  topics: readonly Topic[];
}) {
  const router = useRouter();
  const fgRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const chargeAppliedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(() => {
    const nodes: GraphNode[] = topics.map((topic, index) => ({
      id: topic.title,
      title: topic.title,
      href: topic.href,
      group: index % 3,
      val: 2 + (topic.chips?.length ?? 0),
      chips: topic.chips ?? [],
      description: topic.description,
    }));

    const links: GraphLink[] =
      nodes.length > 1
        ? nodes.map((node, index) => ({
            source: node.id,
            target: nodes[(index + 1) % nodes.length].id,
          }))
        : [];

    return { nodes, links };
  }, [topics]);

  // Apply the charge force once the graph engine is ready.
  // We previously attempted to apply this as soon as the component
  // mounted, but `fgRef.current` can still be null while the
  // ForceGraph2D internal engine initializes. Use `onEngineStop`
  // to apply the force once the graph is attached, and guard so
  // the change is applied only once.

  useEffect(() => {
    if (!mounted) return;

    let raf = 0;

    const step = () => {
      const fg = fgRef.current;
      if (!fg) return;

      const graph = fg.graphData?.();
      const nodes = graph?.nodes as GraphNode[] | undefined;

      // If nodes are not yet available, keep the animation loop
      // running until the graph attaches and the labels have
      // finished fading in. This avoids the case where the first
      // frame sees an empty node array and the loop stops.
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
    return (
      <div className="h-[420px] w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />
    );
  }

  if (!topics.length) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
        No knowledge nodes available yet.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2">
      <div className="h-[360px] w-full sm:h-[420px]">
        <ForceGraph2D
          ref={fgRef as any}
          graphData={data}
          nodeId="id"
          nodeLabel="title"
          nodeVal={(node: any) => node.val ?? 1}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.005}
          linkDirectionalParticleWidth={1.2}
          enableNodeDrag
          cooldownTicks={100}
          onNodeClick={(node: any) => {
            if (node?.href) router.push(node.href);
          }}
          onEngineStop={() => {
            if (chargeAppliedRef.current) return;
            const fg = fgRef.current;
            const charge = fg?.d3Force?.("charge");
            if (charge && typeof charge.strength === "function") {
              // apply new strength then reheat the simulation so the
              // updated force takes effect visually
              charge.strength(-140);
              fg?.d3ReheatSimulation?.();
            }
            chargeAppliedRef.current = true;
          }}
          nodeCanvasObject={(
            node: any,
            ctx: CanvasRenderingContext2D,
            globalScale: number
          ) => {
            if (node.x == null || node.y == null) return;

            const radius = 6 + (node.val ?? 1) * 2;
            const fontSize = 12 / globalScale + (node.val ?? 1) * 1.5;
            const opacity = node.__labelOpacity ?? 0;

            const color =
              node.group === 0
                ? "#06b6d4"
                : node.group === 1
                  ? "#7c3aed"
                  : "#f97316";

            ctx.globalAlpha = 0.95;
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            ctx.fill();

            ctx.globalAlpha = 0.12;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius + 10, 0, 2 * Math.PI);
            ctx.fill();

            ctx.globalAlpha = opacity;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = "#e5e7eb";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(node.title ?? "", node.x + radius + 6, node.y);

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
            ctx.arc(node.x, node.y, 18, 0, 2 * Math.PI);
            ctx.fill();
          }}
        />
      </div>

      <div className="mt-3 px-1 text-xs text-[var(--muted)]">Drag, zoom, and explore the knowledge map.</div>
    </div>
  );
}