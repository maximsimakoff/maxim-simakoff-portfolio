"use client";

import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { useRef } from "react";

import { HeroSceneFallback } from "@/components/three/scene-fallbacks";

const SystemScene = dynamic(
  () => import("@/components/home/system-scene").then((mod) => mod.SystemScene),
  {
    loading: () => <HeroSceneFallback />,
    ssr: false
  }
);

export function HeroDepthVisual() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isNearViewport = useInView(sceneRef, { margin: "240px 0px" });

  return (
    <div
      ref={sceneRef}
      aria-describedby="operating-map-description"
      className="relative h-[22rem] touch-pan-y overflow-hidden rounded-xl border border-terminal-line bg-[#04090d] shadow-[0_28px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.05)] sm:h-[28rem] md:h-[31rem] xl:h-[33rem] 2xl:h-[35rem]"
    >
      <p id="operating-map-description" className="sr-only">
        An animated three-dimensional signal engine with a crystalline reactor,
        five orbiting system modules, and live data routes.
      </p>
      <SystemScene active={isNearViewport} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,107,87,0.1),transparent_35%),linear-gradient(180deg,rgba(1,4,7,0.08)_0%,transparent_50%,rgba(3,7,10,0.72)_100%)]" />
      <div className="system-scan-line pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent via-coral/[0.055] to-transparent" />

      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-4 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-stone-500 sm:inset-x-5 sm:top-5 sm:text-[0.64rem]">
        <span className="rounded border border-white/10 bg-black/35 px-2.5 py-1.5 backdrop-blur-md">
          Nexus // signal engine
        </span>
        <span className="flex items-center gap-2 rounded border border-emerald-400/15 bg-black/35 px-2.5 py-1.5 text-emerald-300/80 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
          05 channels / live
        </span>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-coral/45" />
      <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-powder/35" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-powder/25" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-coral/35" />

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-terminal-line bg-black/50 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-stone-500 backdrop-blur-md sm:bottom-5 sm:text-[0.66rem]">
        <span className="md:hidden">Live signal engine</span>
        <span className="hidden md:inline">Drag to orbit // signals streaming</span>
      </div>
    </div>
  );
}
