"use client";

import { useReducedMotion } from "framer-motion";

import type { SpeedSectionContent } from "@/content/portfolio";

type FlowPath = {
  id: string;
  d: string;
  delay: string;
  duration: string;
};

type FlowNode = {
  code: string;
  label: string;
  value: string;
  x: string;
  y: string;
  path: FlowPath;
};

const sourcePaths: FlowPath[] = [
  {
    id: "clients",
    d: "M 30 27 C 40 23, 44 30, 51 38",
    delay: "0s",
    duration: "4.8s"
  },
  {
    id: "pipeline",
    d: "M 30 43 C 39 43, 43 43, 51 43",
    delay: "0.8s",
    duration: "4.4s"
  },
  {
    id: "investments",
    d: "M 30 59 C 40 63, 44 56, 51 48",
    delay: "1.5s",
    duration: "5.1s"
  }
];

const destinationPath: FlowPath = {
  id: "destination",
  d: "M 58 43 C 64 43, 65 57, 70 65",
  delay: "0.35s",
  duration: "3.7s"
};

export function OperatingViewGraph({ speed }: { speed: SpeedSectionContent }) {
  const reducedMotion = useReducedMotion() ?? false;
  const nodes: FlowNode[] = speed.sources.slice(0, 3).map((source, index) => ({
    code: `0${index + 1}`,
    label: source.label,
    value: source.value,
    x: index === 1 ? "21.5%" : "20.5%",
    y: `${27 + index * 16}%`,
    path: sourcePaths[index]
  }));

  return (
    <div
      id="operating-view-graph"
      className="panel relative min-h-[40rem] scroll-mt-28 overflow-hidden rounded-[2.2rem] sm:min-h-[42rem] xl:min-h-[44rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_56%_38%,rgba(255,255,255,0.13),transparent_26%),radial-gradient(circle_at_76%_70%,rgba(255,255,255,0.09),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.047),rgba(255,255,255,0.015)_30%,rgba(0,0,0,0.15)_100%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.022)_1px,transparent_1px)] [background-size:8.5rem_8.5rem]" />

      <div className="pointer-events-none absolute inset-x-5 top-5 z-20 flex items-start justify-between gap-4 sm:inset-x-7 sm:top-7">
        <p className="font-mono text-[0.69rem] uppercase tracking-[0.3em] text-stone-500">
          Operating view
        </p>
        <p className="max-w-[8.5rem] text-right font-mono text-[0.69rem] uppercase tracking-[0.3em] text-stone-500">
          Illustrative workflow
        </p>
      </div>

      <div className="absolute left-[7%] top-[14.5%] z-10 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-stone-500 backdrop-blur-md">
        Reporting topics
      </div>

      <svg
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="operating-line-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(245,243,239,0.18)" />
            <stop offset="50%" stopColor="rgba(245,243,239,0.6)" />
            <stop offset="100%" stopColor="rgba(245,243,239,0.2)" />
          </linearGradient>
          <radialGradient id="operating-hub-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="48%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <ellipse cx="54.5" cy="43" rx="21" ry="25" fill="url(#operating-hub-gradient)" />

        {nodes.map((node) => (
          <path
            key={node.path.id}
            className="operating-flow-line"
            d={node.path.d}
            fill="none"
            pathLength="1"
            stroke="url(#operating-line-gradient)"
            strokeLinecap="round"
            strokeWidth="0.32"
          />
        ))}
        <path
          className="operating-flow-line operating-flow-line-strong"
          d={destinationPath.d}
          fill="none"
          pathLength="1"
          stroke="url(#operating-line-gradient)"
          strokeLinecap="round"
          strokeWidth="0.38"
        />

        {reducedMotion ? null : (
          <>
            {nodes.map((node) => (
              <circle
                key={`${node.path.id}-dot`}
                className="operating-flow-dot"
                r="0.74"
              >
                <animateMotion
                  begin={node.path.delay}
                  dur={node.path.duration}
                  path={node.path.d}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
            <circle
              className="operating-flow-dot operating-flow-dot-strong"
              r="0.86"
            >
              <animateMotion
                begin={destinationPath.delay}
                dur={destinationPath.duration}
                path={destinationPath.d}
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}
      </svg>

      <div className="absolute left-[54%] top-[43%] z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/[0.035] shadow-[0_0_70px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:h-32 sm:w-32">
        <div className="operating-hub-ring absolute inset-3 rounded-full border border-white/10" />
        <div className="operating-hub-ring operating-hub-ring-delay absolute inset-6 rounded-full border border-white/10" />
        <div className="absolute h-2.5 w-2.5 rounded-full bg-stone-100 shadow-[0_0_28px_rgba(255,255,255,0.48)]" />
        <span className="relative translate-x-[0.08em] rounded-full border border-white/10 bg-black/45 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.3em] text-stone-200 backdrop-blur-md">
          Sync
        </span>
      </div>

      {nodes.map((node) => (
        <div
          key={node.label}
          className="operating-node-card absolute z-10 w-[min(13rem,44vw)] rounded-[1.35rem] border border-white/10 bg-black/35 px-4 py-4 shadow-[0_22px_70px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.055)] backdrop-blur-xl"
          style={{ left: node.x, top: node.y }}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-stone-500">
              {node.code}
            </span>
            <p className="font-serif text-[1.25rem] leading-none text-ink sm:text-[1.45rem]">
              {node.label}
            </p>
          </div>
          <p className="mt-2 text-[0.76rem] leading-5 text-stone-400 sm:text-[0.82rem]">
            {node.value}
          </p>
        </div>
      ))}

      <div className="operating-destination-card absolute left-[73%] top-[66%] z-10 w-[min(15rem,48vw)] rounded-[1.55rem] border border-white/10 bg-black/45 p-5 shadow-[0_26px_80px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-stone-500">
            {speed.destinationLabel}
          </p>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.54rem] uppercase tracking-[0.2em] text-stone-300">
            {speed.destinationFocus}
          </span>
        </div>
        <p className="mt-5 max-w-[11rem] font-serif text-[1.35rem] leading-[1.02] text-ink sm:text-[1.55rem]">
          {speed.destinationTitle}
        </p>
        <p className="mt-3 text-[0.76rem] leading-5 text-stone-400">
          Context assembled into one readable operating surface.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-8 bottom-7 z-10 grid grid-cols-3 gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-3 font-mono text-[0.58rem] uppercase tracking-[0.24em] text-stone-500 backdrop-blur-md sm:inset-x-10">
        <span>Relationships</span>
        <span className="text-center text-stone-400">Normalize</span>
        <span className="text-right">Leadership</span>
      </div>
    </div>
  );
}
