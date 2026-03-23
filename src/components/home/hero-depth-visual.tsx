"use client";

import dynamic from "next/dynamic";

import { portfolioContent } from "@/content/portfolio";

const SystemScene = dynamic(
  () => import("@/components/home/system-scene").then((mod) => mod.SystemScene),
  {
    ssr: false
  }
);

export function HeroDepthVisual() {
  const { featuredExperience } = portfolioContent;

  return (
    <div className="relative mx-auto w-full max-w-[35rem]">
      <div className="panel relative aspect-[0.94] rounded-[2.15rem] border border-white/10 bg-black/30">
        <div className="absolute inset-0">
          <SystemScene />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.58))]" />

        <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {featuredExperience.meta.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-black/35 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-300 backdrop-blur-md"
              >
                {item}
              </span>
            ))}
          </div>
          <span className="hidden rounded-full border border-white/10 bg-black/35 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500 backdrop-blur-md sm:block">
            project overview
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-5 bottom-5">
          <div className="rounded-[1.5rem] border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
            <div className="space-y-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-stone-500">
              <div className="flex items-center justify-between gap-4">
                <span>latest</span>
                <span className="text-right text-stone-200">
                  {featuredExperience.company}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>focus</span>
                <span className="text-right text-stone-300">
                  crm / investor ops
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>scope</span>
                <span className="text-right text-stone-300">
                  research / reporting
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
