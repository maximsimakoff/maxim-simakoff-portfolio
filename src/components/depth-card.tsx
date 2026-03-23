"use client";

import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring
} from "framer-motion";

type DepthCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function DepthCard({
  children,
  className,
  intensity = 8
}: DepthCardProps) {
  const reducedMotion = useReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const rotateX = useSpring(rawRotateX, {
    stiffness: 180,
    damping: 18,
    mass: 0.6
  });
  const rotateY = useSpring(rawRotateY, {
    stiffness: 180,
    damping: 18,
    mass: 0.6
  });

  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.16), transparent 55%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;

    glowX.set(px * 100);
    glowY.set(py * 100);
    rawRotateX.set((0.5 - py) * intensity);
    rawRotateY.set((px - 0.5) * intensity);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      className={`relative ${className ?? ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={
        reducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1600,
              transformStyle: "preserve-3d"
            }
      }
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
        style={reducedMotion ? undefined : { background: glow }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
