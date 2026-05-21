"use client";

import { Edges, Float } from "@react-three/drei";
import type { ReactNode } from "react";

import type { Vector3Tuple } from "@/components/three/types";

type GlassPanel3DProps = {
  width: number;
  height: number;
  position: Vector3Tuple;
  rotation?: Vector3Tuple;
  reducedMotion: boolean;
  children?: ReactNode;
};

export function GlassPanel3D({
  width,
  height,
  position,
  rotation = [0, 0, 0],
  reducedMotion,
  children
}: GlassPanel3DProps) {
  return (
    <Float
      speed={reducedMotion ? 0 : 1.05}
      rotationIntensity={reducedMotion ? 0 : 0.035}
      floatIntensity={reducedMotion ? 0 : 0.06}
    >
      <group position={position} rotation={rotation}>
        <mesh>
          <boxGeometry args={[width, height, 0.055]} />
          <meshStandardMaterial
            color="#f5f3ef"
            emissive="#ffffff"
            emissiveIntensity={0.018}
            metalness={0.28}
            opacity={0.062}
            roughness={0.18}
            transparent
          />
          <Edges color="#d6d3d1" scale={1.01} />
        </mesh>
        <mesh position={[0, height * 0.33, 0.034]}>
          <planeGeometry args={[width * 0.82, 0.012]} />
          <meshBasicMaterial color="#ffffff" opacity={0.2} transparent />
        </mesh>
        {children}
      </group>
    </Float>
  );
}
