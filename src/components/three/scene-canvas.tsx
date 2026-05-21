"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import type { ReactNode } from "react";

type SceneCanvasProps = {
  children: ReactNode;
  camera: NonNullable<CanvasProps["camera"]>;
  dpr?: CanvasProps["dpr"];
  fog?: [color: string, near: number, far: number];
};

export function SceneCanvas({
  children,
  camera,
  dpr = [1, 1.5],
  fog
}: SceneCanvasProps) {
  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={camera}
    >
      {fog ? <fog attach="fog" args={fog} /> : null}
      {children}
    </Canvas>
  );
}

export function DefaultSceneLights() {
  return (
    <>
      <ambientLight intensity={0.56} />
      <directionalLight position={[4, 6, 3]} intensity={1.16} color="#f8f2ea" />
      <pointLight position={[-4, -2, 4]} intensity={0.34} color="#8fb7ff" />
    </>
  );
}
