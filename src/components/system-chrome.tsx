"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring
} from "framer-motion";
import { useEffect } from "react";

export function SystemChrome() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    damping: 32,
    mass: 0.16,
    stiffness: 230
  });
  const pointerX = useMotionValue(-800);
  const pointerY = useMotionValue(-800);
  const pointerGlow = useMotionTemplate`radial-gradient(560px circle at ${pointerX}px ${pointerY}px, rgba(255, 107, 87, 0.085), transparent 68%)`;

  useEffect(() => {
    if (
      reducedMotion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [pointerX, pointerY, reducedMotion]);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-px bg-white/10"
      >
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-coral via-[#ffb06f] to-powder shadow-[0_0_18px_rgba(255,107,87,0.8)]"
          style={{ scaleX: progress }}
        />
      </div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[55] hidden md:block"
        style={{ background: pointerGlow }}
      />
      <div aria-hidden="true" className="premium-screen-texture" />
    </>
  );
}
