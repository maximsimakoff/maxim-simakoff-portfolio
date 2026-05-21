"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import type { Vector3Tuple } from "@/components/three/types";

type FlowLine3DProps = {
  points: Vector3Tuple[];
  active?: boolean;
};

type FlowParticle3DProps = {
  points: Vector3Tuple[];
  delay: number;
  speed: number;
  radius?: number;
  reducedMotion: boolean;
};

export function FlowLine3D({ points, active = false }: FlowLine3DProps) {
  return (
    <Line
      points={points}
      color="#f5f3ef"
      lineWidth={active ? 1.5 : 1}
      opacity={active ? 0.5 : 0.28}
      transparent
    />
  );
}

export function FlowParticle3D({
  points,
  delay,
  speed,
  radius = 0.035,
  reducedMotion
}: FlowParticle3DProps) {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point))),
    [points]
  );

  useFrame((state) => {
    if (!ref.current) return;

    const progress = reducedMotion
      ? delay % 1
      : (state.clock.elapsedTime * speed + delay) % 1;
    const point = curve.getPointAt(progress);
    ref.current.position.copy(point);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 18, 18]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={0.55}
        roughness={0.24}
      />
    </mesh>
  );
}
