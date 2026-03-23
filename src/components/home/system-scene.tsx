"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ModuleFrameProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
};

function ModuleFrame({ position, rotation, scale }: ModuleFrameProps) {
  return (
    <Float speed={1.3} rotationIntensity={0.08} floatIntensity={0.2}>
      <group position={position} rotation={rotation}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={scale} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.05}
            roughness={0.22}
            metalness={0.12}
            emissive="#ffffff"
            emissiveIntensity={0.03}
          />
          <Edges color="#e7e5e4" scale={1.02} />
        </mesh>
        <mesh position={[0, 0, scale[2] * 0.7]}>
          <planeGeometry args={[scale[0] * 0.58, 0.04]} />
          <meshBasicMaterial color="#f5f3ef" transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function Node({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.8} rotationIntensity={0.05} floatIntensity={0.12}>
      <mesh position={position}>
        <sphereGeometry args={[0.05, 18, 18]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.18}
        />
      </mesh>
    </Float>
  );
}

function Sculpture() {
  const groupRef = useRef<THREE.Group>(null);
  const connectorPaths = useMemo<[number, number, number][][]>(
    () => [
      [
        [-1.65, 1.0, 0.52],
        [-0.7, 0.55, 0.18],
        [0.72, 0.64, -0.2]
      ],
      [
        [-1.2, -0.9, 0.42],
        [-0.15, -0.3, 0.08],
        [1.45, -0.65, -0.28]
      ],
      [
        [0.2, 1.05, 0.18],
        [0.54, 0.26, -0.02],
        [1.64, 0.1, -0.4]
      ]
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.18,
      0.045
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.3,
      0.045
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -state.pointer.x * 0.06,
      0.04
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      state.pointer.y * 0.15,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      <ModuleFrame
        position={[0, 0.05, 0]}
        rotation={[-0.18, 0.3, -0.08]}
        scale={[3.45, 2.1, 0.06]}
      />
      <ModuleFrame
        position={[-1.05, 0.72, 0.58]}
        rotation={[0.22, -0.36, 0.18]}
        scale={[1.62, 1.12, 0.05]}
      />
      <ModuleFrame
        position={[1.32, -0.56, -0.48]}
        rotation={[-0.24, 0.32, -0.16]}
        scale={[1.42, 1.1, 0.05]}
      />
      <ModuleFrame
        position={[1.72, 0.66, -0.86]}
        rotation={[0.26, -0.18, 0.24]}
        scale={[0.78, 1.62, 0.04]}
      />

      {connectorPaths.map((points, index) => (
        <Line
          key={index}
          points={points}
          color="#d6d3d1"
          transparent
          opacity={0.32}
          lineWidth={1}
        />
      ))}

      <Node position={[-1.66, 1.02, 0.52]} />
      <Node position={[-1.18, -0.92, 0.42]} />
      <Node position={[0.24, 1.04, 0.18]} />
      <Node position={[0.72, 0.64, -0.2]} />
      <Node position={[1.46, -0.66, -0.28]} />
      <Node position={[1.64, 0.1, -0.4]} />
    </group>
  );
}

export function SystemScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6.6], fov: 34 }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -2, 4]} intensity={0.45} color="#f5f3ef" />
      <Sculpture />
    </Canvas>
  );
}
