"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { portfolioContent } from "@/content/portfolio";

const TechGraphScene = dynamic(
  () =>
    import("@/components/home/tech-graph-scene").then(
      (mod) => mod.TechGraphScene
    ),
  {
    ssr: false
  }
);

export function StackMapSection() {
  const { stackMap } = portfolioContent;
  const reducedMotion = useReducedMotion() ?? false;
  const [selectedId, setSelectedId] = useState(stackMap.clusters[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeId = hoveredId ?? selectedId;
  const selectedCluster =
    stackMap.clusters.find((cluster) => cluster.id === selectedId) ??
    stackMap.clusters[0];
  const activeCluster =
    stackMap.clusters.find((cluster) => cluster.id === activeId) ??
    stackMap.clusters[0];

  return (
    <section
      id="stack"
      className="section-spacing scroll-mt-28 border-t border-line pt-16 md:pt-20"
    >
      <SectionHeading
        index="03"
        label="Stack"
        title={stackMap.title}
        description={stackMap.description}
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <Reveal>
          <div className="panel h-full rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow">Overview</p>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500">
                {stackMap.clusters.length} branches
              </p>
            </div>

            {stackMap.intro ? (
              <p className="mt-5 max-w-lg font-serif text-[1.95rem] leading-tight text-ink sm:text-[2.35rem]">
                {stackMap.intro}
              </p>
            ) : null}

            {selectedCluster ? (
              <div className={`${stackMap.intro ? "mt-6" : "mt-4"} flex h-[18rem] flex-col rounded-[1.55rem] border border-white/10 bg-black/25 p-5 sm:h-[17rem] lg:h-[16.75rem]`}>
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">Selected branch</p>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500">
                    {String(selectedCluster.items.length).padStart(2, "0")} tools
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  <h3 className="font-serif text-3xl leading-tight text-ink sm:text-[2.1rem]">
                    {selectedCluster.label}
                  </h3>
                  <p className="max-w-xl text-sm leading-7 text-stone-300">
                    {selectedCluster.detail}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {selectedCluster.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div
              className="mt-6 grid auto-rows-fr gap-3 sm:grid-cols-2"
              onMouseLeave={() => setHoveredId(null)}
            >
              {stackMap.clusters.map((cluster, index) => {
                const active = cluster.id === activeId;

                return (
                  <button
                    key={cluster.id}
                    type="button"
                    aria-pressed={cluster.id === selectedId}
                    onMouseEnter={() => setHoveredId(cluster.id)}
                    onFocus={() => setHoveredId(cluster.id)}
                    onClick={() => {
                      setSelectedId(cluster.id);
                      setHoveredId(null);
                    }}
                    className={`h-full min-h-[5.9rem] rounded-[1.35rem] border p-4 text-left transition duration-150 ${
                      active
                        ? "border-white/16 bg-white/[0.07]"
                        : "border-white/8 bg-white/[0.025] hover:border-white/14 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex h-full items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition ${
                              active ? "bg-stone-100" : "bg-stone-600"
                            }`}
                          />
                          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                        </div>
                        <h3 className="mt-3 text-base text-ink sm:text-lg">
                          {cluster.label}
                        </h3>
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] ${
                          active
                            ? "border-white/12 bg-white/[0.07] text-stone-200"
                            : "border-white/8 bg-white/[0.03] text-stone-500"
                        }`}
                      >
                        {String(cluster.items.length).padStart(2, "0")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="panel relative h-full min-h-[34rem] rounded-[2rem] p-3 sm:min-h-[37rem] sm:p-4 lg:min-h-[40rem]">
            <div
              className="absolute inset-0"
              onMouseLeave={() => setHoveredId(null)}
            >
              <TechGraphScene
                clusters={stackMap.clusters}
                activeId={activeId}
                onPreviewChange={setHoveredId}
                onSelect={(id) => {
                  setSelectedId(id);
                  setHoveredId(null);
                }}
                reducedMotion={reducedMotion}
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.09),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_24%,rgba(0,0,0,0.42)_100%)]" />

            <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3 sm:inset-x-5 sm:top-5">
              <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-300 backdrop-blur-md">
                stack graph
              </div>
              <div className="hidden rounded-full border border-white/10 bg-black/35 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500 backdrop-blur-md sm:block">
                hover or click
              </div>
            </div>

            {activeCluster ? (
              <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
                <div className="min-h-[12rem] rounded-[1.5rem] border border-white/10 bg-black/50 p-4 backdrop-blur-xl sm:min-h-[11rem] sm:p-5">
                  <div className="flex items-center gap-3">
                    <p className="eyebrow text-stone-500">Active branch</p>
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500">
                      {String(activeCluster.items.length).padStart(2, "0")} tools
                    </span>
                  </div>

                  <div className="mt-3 space-y-3">
                    <p className="font-serif text-[1.9rem] leading-[0.98] text-ink sm:text-[2.15rem]">
                      {activeCluster.label}
                    </p>
                    <p className="max-w-2xl text-sm leading-6 text-stone-300 sm:text-[0.98rem] sm:leading-7">
                      {activeCluster.description}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeCluster.items.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="tag border-white/10 bg-white/[0.04]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
