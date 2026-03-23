"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion
} from "framer-motion";

import { Reveal } from "@/components/reveal";
import { portfolioContent } from "@/content/portfolio";

const SOURCE_PATHS = [
  "M18 23 C20 33 29 39 43.8 46.2",
  "M50 23 C50 31 50 36.8 50 44.2",
  "M82 23 C80 33 71 39 56.2 46.2"
];
const OUTPUT_PATH = "M50 56.8 C50 62.8 50 69.4 50 75.6";

function formatSeconds(value: number) {
  return `${value.toFixed(2).padStart(5, "0")}s`;
}

function AnimatedTimer() {
  const { speed } = portfolioContent;
  const timerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(timerRef, { amount: 0.55 });
  const reducedMotion = useReducedMotion() ?? false;
  const value = useMotionValue(0);
  const [display, setDisplay] = useState(formatSeconds(0));

  useMotionValueEvent(value, "change", (latest) => {
    setDisplay(formatSeconds(Math.min(latest, speed.statValue)));
  });

  useEffect(() => {
    if (!isInView) {
      value.stop();
      value.set(0);

      return undefined;
    }

    value.set(0);

    const controls = animate(value, speed.statValue, {
      duration: reducedMotion ? 0.01 : 1.85,
      ease: [0.14, 0.92, 0.24, 1]
    });

    return () => {
      controls.stop();
    };
  }, [isInView, reducedMotion, speed.statValue, value]);

  return (
    <div ref={timerRef} className="panel rounded-[1.85rem] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Time to context</p>
          {speed.statLabel ? (
            <p className="mt-3 max-w-xs text-sm leading-6 text-stone-400">
              {speed.statLabel}
            </p>
          ) : null}
        </div>
        <span className="tag shrink-0">fast path</span>
      </div>

      <div className="relative mt-8">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-20 -translate-y-1/2 rounded-full bg-white/[0.08] blur-3xl"
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [0.18, 0.36, 0.18],
                  scaleX: [0.96, 1.04, 0.96]
                }
          }
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative flex items-end gap-2">
          <span className="font-mono text-[clamp(3.6rem,8vw,6rem)] font-medium leading-none tracking-[-0.05em] text-ink">
            {display}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="h-px overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-white/75 via-white/40 to-white/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{
              duration: reducedMotion ? 0.01 : 1.85,
              ease: [0.14, 0.92, 0.24, 1]
            }}
          />
        </div>
        <p className="max-w-sm text-sm leading-6 text-stone-400">{speed.statNote}</p>
      </div>
    </div>
  );
}

function PulsePath({
  path,
  active,
  begin,
  duration,
  reducedMotion
}: {
  path: string;
  active: boolean;
  begin: string;
  duration: string;
  reducedMotion: boolean;
}) {
  return (
    <>
      <path
        d={path}
        fill="none"
        stroke={active ? "rgba(255,255,255,0.58)" : "rgba(255,255,255,0.14)"}
        strokeLinecap="round"
        strokeWidth={active ? 0.32 : 0.22}
      />
      {reducedMotion ? null : (
        <circle r="0.62" fill={active ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.55)"}>
          <animateMotion begin={begin} dur={duration} path={path} repeatCount="indefinite" />
        </circle>
      )}
    </>
  );
}

function SpeedFlowVisual() {
  const { speed } = portfolioContent;
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="panel relative min-h-[44rem] rounded-[2rem] p-6 sm:min-h-[48rem] sm:p-8 lg:min-h-[50rem] lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_50%_52%,rgba(255,255,255,0.1),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_34%,rgba(255,255,255,0.02))]"
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <PulsePath
          path={SOURCE_PATHS[0]}
          active={false}
          begin="0s"
          duration="2.4s"
          reducedMotion={reducedMotion}
        />
        <PulsePath
          path={SOURCE_PATHS[1]}
          active={false}
          begin="0.45s"
          duration="2.2s"
          reducedMotion={reducedMotion}
        />
        <PulsePath
          path={SOURCE_PATHS[2]}
          active={false}
          begin="0.9s"
          duration="2.55s"
          reducedMotion={reducedMotion}
        />
        <circle cx="43.8" cy="46.2" r="0.68" fill="rgba(255,255,255,0.78)" />
        <circle cx="50" cy="44.2" r="0.68" fill="rgba(255,255,255,0.92)" />
        <circle cx="56.2" cy="46.2" r="0.68" fill="rgba(255,255,255,0.78)" />
        <PulsePath
          path={OUTPUT_PATH}
          active={true}
          begin="0.6s"
          duration="1.9s"
          reducedMotion={reducedMotion}
        />
        <circle cx="50" cy="56.8" r="0.68" fill="rgba(255,255,255,0.92)" />
      </svg>

      <div className="relative z-10 flex min-h-[calc(44rem-3rem)] flex-col gap-8 sm:min-h-[calc(48rem-4rem)] sm:gap-10 lg:min-h-[calc(50rem-5rem)]">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">Operating view</p>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-stone-500">
            illustrative workflow
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {speed.sources.map((source, index) => {
            return (
              <div
                key={source.label}
                className="rounded-[1.55rem] border border-white/10 bg-black/25 px-4 py-4 text-left text-stone-300 sm:min-h-[9.25rem] sm:px-5 sm:py-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow">Source 0{index + 1}</p>
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
                <p className="mt-6 font-serif text-[1.5rem] leading-tight text-ink sm:text-[1.68rem]">
                  {source.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-1 items-center justify-center pb-3">
          <div className="relative flex flex-col items-center">
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-white/10"
              animate={
                reducedMotion
                  ? undefined
                  : {
                      opacity: [0.2, 0.55, 0.2],
                      scale: [1, 1.1, 1]
                    }
              }
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/16 bg-white/[0.05] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_16px_50px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-3 rounded-full border border-white/10" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-stone-300">
                Sync
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col items-center gap-4">
          <span className="h-2.5 w-2.5 rounded-full border border-white/18 bg-[#ebe8e0] shadow-[0_0_18px_rgba(255,255,255,0.22)]" />

          <div className="w-full rounded-[1.55rem] border border-white/10 bg-black/35 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow">{speed.destinationLabel}</p>
                <h3 className="mt-3 max-w-[20rem] font-serif text-[1.7rem] leading-[1.02] text-ink sm:max-w-[23rem] sm:text-[2rem]">
                  {speed.destinationTitle}
                </h3>
              </div>
              <span className="tag self-start border-white/14 bg-white/[0.02]">
                focus: {speed.destinationFocus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpeedSection() {
  const { speed } = portfolioContent;

  return (
    <section className="section-spacing scroll-mt-28" aria-labelledby="speed-title">
      <div className="grid gap-6 xl:grid-cols-[0.88fr_1.12fr] xl:items-stretch">
        <Reveal>
          <div className="flex h-full flex-col gap-6">
            <div className="space-y-4 px-1">
              <p className="eyebrow">{speed.eyebrow}</p>
              <h2
                id="speed-title"
                className="max-w-2xl font-serif text-[2.55rem] leading-[0.98] text-ink sm:text-[3.3rem]"
              >
                {speed.title}
              </h2>
              {speed.description ? (
                <p className="max-w-xl text-sm leading-7 text-stone-400 sm:text-[1rem]">
                  {speed.description}
                </p>
              ) : null}
            </div>

            <AnimatedTimer />

            <div className="panel rounded-[1.85rem] p-6 sm:p-7">
              <div className="grid gap-5">
                {speed.takeaways.map((takeaway) => (
                  <div
                    key={takeaway.label}
                    className="flex items-start justify-between gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
                  >
                    <p className="font-mono text-[0.73rem] uppercase tracking-[0.24em] text-stone-500">
                      {takeaway.label}
                    </p>
                    <p className="max-w-[20rem] text-right text-sm leading-6 text-stone-300">
                      {takeaway.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <SpeedFlowVisual />
        </Reveal>
      </div>
    </section>
  );
}
