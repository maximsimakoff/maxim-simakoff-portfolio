"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import type { WorkProject } from "@/content/career";
import { ProductDemo, productPreviews } from "./work-demos/product-demos";
import { SystemsDemo, systemsPreviews } from "./work-demos/systems-demos";
import styles from "./work-art.module.css";

type WorkArtKind = WorkProject["kind"];
const previews = { ...productPreviews, ...systemsPreviews };
const cycleMs: Record<WorkArtKind, number> = {
  hubclaw: 9200, dashboard: 8700, sat: 9800,
  polyglot: 7400, assembly: 3800, scheduler: 8500
};

export function WorkArt({ kind, name, suspended = false }: { kind: WorkArtKind; name: string; suspended?: boolean }) {
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const frame = useRef<HTMLDivElement>(null);
  const stateId = useId();
  const preview = previews[kind];
  const active = inView && !suspended;

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => {
      // Keep the example still long enough to inspect it while using its controls.
      if (document.hidden || frame.current?.matches(":hover, :focus-within")) return;
      setStep(current => (current + 1) % preview.states.length);
    }, cycleMs[kind]);
    return () => window.clearInterval(timer);
  }, [active, kind, preview]);

  function advance() {
    const next = (step + 1) % preview.states.length;
    setStep(next);
    setAnnouncement(preview.states[next]);
  }

  function tilt(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const tiltX = (.5 - (event.clientY - bounds.top) / bounds.height) * 8;
    const tiltY = ((event.clientX - bounds.left) / bounds.width - .5) * 12;
    frame.current?.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    frame.current?.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
  }

  function resetTilt() {
    frame.current?.style.removeProperty("--tilt-x");
    frame.current?.style.removeProperty("--tilt-y");
  }

  return (
    <div ref={frame} className={`${styles.frame} ${styles[kind]}`} data-in-view={active}>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.tiltPlane}>
          {kind === "hubclaw" || kind === "dashboard" || kind === "sat"
            ? <ProductDemo key={step} kind={kind} step={step} />
            : <SystemsDemo key={step} kind={kind} step={step} />}
        </div>
      </div>
      <button
        type="button"
        className={styles.demoControl}
        aria-label={`${preview.action} in the ${name} preview`}
        aria-describedby={stateId}
        onPointerMove={tilt}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
        onClick={advance}
      >
        <span className={styles.actionChip}>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="m4 2 11 8-5 .8 2.7 5-2.3 1.3-2.6-5.2L4 16z" /></svg>
          {preview.action}
        </span>
      </button>
      <span className="sr-only" id={stateId}>{preview.states[step]}</span>
      <span className="sr-only" role="status" aria-atomic="true">{announcement}</span>
    </div>
  );
}
