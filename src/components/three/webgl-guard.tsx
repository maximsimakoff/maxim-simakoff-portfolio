"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type WebGLGuardProps = {
  children: ReactNode;
  fallback: ReactNode;
};

function canCreateWebGLContext() {
  if (typeof document === "undefined") return false;

  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("headlesschrome")) return false;
  if (
    typeof window.WebGLRenderingContext === "undefined" &&
    typeof window.WebGL2RenderingContext === "undefined"
  ) {
    return false;
  }

  const canvas = document.createElement("canvas");
  const options: WebGLContextAttributes = {
    alpha: true,
    antialias: true,
    failIfMajorPerformanceCaveat: false
  };

  try {
    const context =
      canvas.getContext("webgl2", options) ||
      canvas.getContext("webgl", options) ||
      canvas.getContext("experimental-webgl", options);

    if (context && "getExtension" in context) {
      context.getExtension("WEBGL_lose_context")?.loseContext();
    }

    return Boolean(context);
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
