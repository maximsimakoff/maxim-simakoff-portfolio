"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 28, scale: reducedMotion ? 1 : 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
