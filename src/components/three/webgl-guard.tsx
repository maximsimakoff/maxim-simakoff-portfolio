"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type WebGLGuardProps = {
  children: ReactNode;
  fallback: ReactNode;
};

function canCreateWebGLContext() {
  if (typeof document === "undefined") return false;

  if (typeof window.WebGL2RenderingContext === "undefined") return false;

  const canvas = document.createElement("canvas");
  const options: WebGLContextAttributes = {
    alpha: true,
    antialias: true,
    failIfMajorPerformanceCaveat: false
  };

  try {
    return Boolean(canvas.getContext("webgl2", options));
  } catch {
    return false;
  }
}

export function WebGLGuard({ children, fallback }: WebGLGuardProps) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(canCreateWebGLContext());
  }, []);

  if (supported === null) return <>{fallback}</>;

  return <>{supported ? children : fallback}</>;
}
