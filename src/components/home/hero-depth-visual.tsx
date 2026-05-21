"use client";

import dynamic from "next/dynamic";

const SystemScene = dynamic(
  () => import("@/components/home/system-scene").then((mod) => mod.SystemScene),
  {
    ssr: false
  }
);

export function HeroDepthVisual() {
  return (
    <div className="relative h-[28rem] overflow-hidden rounded-lg border border-terminal-line bg-[#060b10] sm:h-[31rem] lg:h-[33rem] xl:h-[35rem]">
      <SystemScene />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,107,87,0.08),transparent_34%),linear-gradient(180deg,transparent_60%,rgba(3,7,10,0.56))]" />

      <div className="pointer-events-none absolute bottom-5 right-5 hidden rounded-lg border border-terminal-line bg-black/45 px-4 py-3 font-mono text-xs leading-5 text-stone-400 backdrop-blur-md sm:block">
        <div className="flex items-center gap-2">
          <span className="inline-block h-4 w-2 rounded-full border border-stone-500" />
          Drag to orbit
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg leading-none">⌄</span>
          Scroll to zoom
        </div>
      </div>
    </div>
  );
}
