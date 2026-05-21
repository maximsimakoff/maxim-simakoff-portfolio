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
  const selectedCluster =
    stackMap.clusters.find((cluster) => cluster.id === selectedId) ??
    stackMap.clusters[0];

  return (
    <section
      id="stack"
      className="section-spacing section-rule scroll-mt-28"
    >
      <SectionHeading
        index="03"
        label="Stack"
        title={stackMap.title}
        description={stackMap.description}
      />

      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <Reveal>
          <div className="panel p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="eyebrow">Branches</p>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-stone-500">
                click to inspect
              </p>
            </div>

            <div className="grid gap-2">
              {stackMap.clusters.map((cluster, index) => {
                const active = cluster.id === selectedId;

                return (
                  <button
                    key={cluster.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedId(cluster.id)}
                    className={`rounded-lg border p-4 text-left transition duration-150 ${
                      active
                        ? "border-coral/45 bg-coral/10"
                        : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${active ? "bg-coral" : "bg-stone-600"}`} />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-stone-500">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <h3 className="text-base font-semibold text-ink">
                            {cluster.label}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-stone-400">
                          {cluster.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="panel relative min-h-[31rem] p-4 sm:p-5">
            <div className="absolute inset-0">
              <TechGraphScene
                clusters={stackMap.clusters}
                activeId={selectedId}
                onSelect={setSelectedId}
                reducedMotion={reducedMotion}
              />
            </div>

            <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-4 sm:inset-x-5 sm:top-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-coral">
                Interactive map
              </p>
              <p className="hidden font-mono text-[0.66rem] uppercase tracking-[0.16em] text-stone-500 sm:block">
                {String(stackMap.clusters.length).padStart(2, "0")} branches
              </p>
            </div>

            {selectedCluster ? (
              <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
                <div className="rounded-lg border border-white/10 bg-black/58 p-4 backdrop-blur-xl">
                  <div className="grid gap-3 md:grid-cols-[0.45fr_1fr] md:items-start">
                    <h3 className="text-xl font-semibold leading-tight text-ink">
                      {selectedCluster.label}
                    </h3>
                    <div>
                      <p className="text-sm leading-6 text-stone-300">
                        {selectedCluster.detail}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedCluster.items.slice(0, 5).map((item) => (
                          <span key={item} className="tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
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
