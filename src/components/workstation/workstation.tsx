"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import type { WorkstationController } from "./renderer";
import styles from "./workstation.module.css";

export function Workstation() {
  const canvasHost = useRef<HTMLDivElement>(null);
  const controller = useRef<WorkstationController | null>(null);
  const drag = useRef<{ x: number; y: number; id: number } | null>(null);
  const [ready, setReady] = useState(false);
  const [exploded, setExploded] = useState(false);
  useEffect(() => {
    const element = canvasHost.current;
    if (!element) return;
    let mounted = true;
    function fallback() {
      if (!mounted) return;
      controller.current?.dispose();
      controller.current = null;
      setReady(false);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (!window.WebGL2RenderingContext) return;
      import("./renderer").then(({ startRenderer }) => {
        if (!mounted) return;
        controller.current = startRenderer(element, fallback);
        setReady(true);
      }).catch(fallback);
    }, { rootMargin: "200px" });
    observer.observe(element);
    return () => {
      mounted = false;
      observer.disconnect();
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const api = controller.current;
    if (!api) return;
    switch (event.key) {
      case "ArrowLeft": api.move(-.12, 0); break;
      case "ArrowRight": api.move(.12, 0); break;
      case "ArrowUp": api.move(0, .07); break;
      case "ArrowDown": api.move(0, -.07); break;
      case "Home": api.reset(); break;
      default: return;
    }
    event.preventDefault();
  }
  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!ready || !event.isPrimary || event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    controller.current?.move(-dx * .007, dy * .004);
    drag.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  }
  function clearDrag() { drag.current = null; }
  function toggleExploded() {
    controller.current?.setExploded(!exploded);
    setExploded(!exploded);
  }

  return (
    <div className={`workstation-viewport ${styles.stage}`} data-ready={ready}>
      <div aria-hidden="true" className={styles.grid} />
      <div
        className={styles.model} ref={canvasHost}
        style={ready ? undefined : {
          backgroundImage: `url("${process.env.NEXT_PUBLIC_PORTFOLIO_BASE_PATH ?? ""}/workstation.webp")`
        }}
        role="img" aria-label={ready
          ? "Interactive vintage desktop computer. Drag or use the arrow keys to rotate. Press Home to reset."
          : "Beige vintage desktop computer with a mint MS monogram on a dark CRT, mechanical keyboard and wired mouse."}
        tabIndex={ready ? 0 : undefined}
        onKeyDown={onKeyDown} onPointerDown={onPointerDown} onPointerMove={onPointerMove}
        onPointerUp={clearDrag} onPointerCancel={clearDrag} onLostPointerCapture={clearDrag}
      />
      {ready && (
        <button type="button" className={styles.explode} onClick={toggleExploded}
          aria-label={exploded ? "Reassemble the workstation" : "Explode the workstation into its component parts"} aria-pressed={exploded}>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m3 7 7-4 7 4-7 4-7-4Zm0 3 7 4 7-4m-14 3 7 4 7-4" /></svg>
          {exploded ? "Assemble" : "Explode"}
        </button>
      )}
    </div>
  );
}
