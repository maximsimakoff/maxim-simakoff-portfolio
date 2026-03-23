"use client";

import { Html, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import type { StackCluster } from "@/content/portfolio";

type Vector3Tuple = [number, number, number];

type TechGraphSceneProps = {
  clusters: StackCluster[];
  activeId: string;
  onPreviewChange: (id: string | null) => void;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
};

type BranchLayout = {
  anchor: Vector3Tuple;
  offsets: Vector3Tuple[];
};

const corePosition: Vector3Tuple = [0, 0, 0];

const branchLayouts: Record<string, BranchLayout> = {
  workflow: {
    anchor: [2.35, 0.18, -0.48],
    offsets: [
      [0.92, 0.52, -0.12],
      [1.1, -0.1, 0.22],
      [0.68, -0.72, -0.08],
      [0.35, 0.9, 0.12]
    ]
  },
  frontend: {
    anchor: [0.9, 1.86, -0.24],
    offsets: [
      [-0.22, 0.96, 0.1],
      [0.42, 0.88, -0.16],
      [0.88, 0.42, 0.18],
      [-0.8, 0.44, -0.04]
    ]
  },
  backend: {
    anchor: [-1.05, 1.62, 0.34],
    offsets: [
      [-0.98, 0.4, -0.16],
      [-0.52, 0.94, 0.12],
      [0.42, 0.86, -0.18],
      [0.9, 0.24, 0.08]
    ]
  },
  languages: {
    anchor: [-2.42, 0.02, 0.56],
    offsets: [
      [-1.02, 0.56, -0.06],
      [-1.1, 0.02, 0.14],
      [-0.98, -0.56, -0.12],
      [-0.46, 0.98, 0.08],
      [-0.36, -0.98, 0.1],
      [0.38, -0.78, -0.14]
    ]
  },
  data: {
    anchor: [-1.26, -1.78, -0.52],
    offsets: [
      [-0.94, -0.4, 0.14],
      [-0.34, -0.96, -0.1],
      [0.46, -0.88, 0.2],
      [0.94, -0.32, -0.12]
    ]
  },
  infra: {
    anchor: [1.28, -1.68, 0.42],
    offsets: [
      [-0.34, -1.02, -0.12],
      [0.34, -1.06, 0.1],
      [0.98, -0.64, -0.14],
      [1.04, 0.02, 0.16],
      [0.28, 0.86, -0.08]
    ]
  }
};

function addVectors(left: Vector3Tuple, right: Vector3Tuple): Vector3Tuple {
  return [left[0] + right[0], left[1] + right[1], left[2] + right[2]];
}

function midPoint(from: Vector3Tuple, to: Vector3Tuple): Vector3Tuple {
  return [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2 + (to[2] >= from[2] ? 0.12 : -0.12)
  ];
}

function branchMid(anchor: Vector3Tuple): Vector3Tuple {
  return [
    anchor[0] * 0.52,
    anchor[1] * 0.5,
    anchor[2] * 0.24 + (anchor[1] >= 0 ? 0.18 : -0.18)
  ];
}

type BranchProps = {
  cluster: StackCluster;
  active: boolean;
  subdued: boolean;
  onPreviewChange: (id: string | null) => void;
  onSelect: (id: string) => void;
};

function Branch({
  cluster,
  active,
  subdued,
  onPreviewChange,
  onSelect
}: BranchProps) {
  const layout = branchLayouts[cluster.id];

  if (!layout) return null;

  const childPositions = layout.offsets
    .slice(0, cluster.items.length)
    .map((offset) => addVectors(layout.anchor, offset));

  const lineOpacity = active ? 0.78 : subdued ? 0.14 : 0.34;
  const childLineOpacity = active ? 0.46 : subdued ? 0.1 : 0.2;
  const nodeOpacity = active ? 1 : subdued ? 0.34 : 0.8;
  const emissive = active ? 0.56 : subdued ? 0.08 : 0.18;
  const ringOpacity = active ? 0.44 : subdued ? 0.07 : 0.18;

  const handleEnter = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onPreviewChange(cluster.id);
  };

  const handleSelect = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onSelect(cluster.id);
  };

  return (
    <group>
      <Line
        points={[corePosition, branchMid(layout.anchor), layout.anchor]}
        color="#f5f3ef"
        transparent
        opacity={lineOpacity}
        lineWidth={active ? 1.6 : 1}
      />

      {childPositions.map((position, index) => (
        <Line
          key={`${cluster.id}-${cluster.items[index]}`}
          points={[layout.anchor, midPoint(layout.anchor, position), position]}
          color="#d6d3d1"
          transparent
          opacity={childLineOpacity}
          lineWidth={1}
        />
      ))}

      <mesh position={layout.anchor} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[active ? 0.37 : 0.31, 0.012, 18, 72]} />
        <meshBasicMaterial color="#f5f3ef" transparent opacity={ringOpacity} />
      </mesh>

      <mesh position={layout.anchor}>
        <sphereGeometry args={[active ? 0.14 : 0.122, 24, 24]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={emissive}
          transparent
          opacity={nodeOpacity}
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>

      <mesh
        position={layout.anchor}
        onPointerEnter={handleEnter}
        onClick={handleSelect}
      >
        <sphereGeometry args={[0.56, 18, 18]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {childPositions.map((position, index) => (
        <group key={`${cluster.id}-node-${cluster.items[index]}`} position={position}>
          <mesh onPointerEnter={handleEnter} onClick={handleSelect}>
            <sphereGeometry args={[index === 0 ? 0.072 : 0.058, 20, 20]} />
            <meshStandardMaterial
              color="#f5f3ef"
              emissive="#ffffff"
              emissiveIntensity={active ? 0.3 : subdued ? 0.03 : 0.1}
              transparent
              opacity={active ? 0.94 : subdued ? 0.18 : 0.44}
              metalness={0.08}
              roughness={0.28}
            />
          </mesh>
          <mesh onPointerEnter={handleEnter} onClick={handleSelect}>
            <sphereGeometry args={[0.18, 18, 18]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </group>
      ))}

      {active ? (
        <Html position={addVectors(layout.anchor, [0, 0.42, 0])} center>
          <div
            style={{ pointerEvents: "none" }}
            className="rounded-full border border-white/10 bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-stone-200 shadow-[0_18px_48px_rgba(0,0,0,0.3)] backdrop-blur-md"
          >
            {cluster.label}
          </div>
        </Html>
      ) : null}
    </group>
  );
}

function Graph({
  clusters,
  activeId,
  onPreviewChange,
  onSelect,
  reducedMotion
}: TechGraphSceneProps) {
  const graphRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!graphRef.current) return;

    const time = state.clock.elapsedTime;
    const targetRotationX = reducedMotion
      ? -0.18
      : -0.18 + Math.cos(time * 0.22) * 0.014;
    const targetRotationY = reducedMotion
      ? 0.2
      : 0.2 + Math.sin(time * 0.18) * 0.032;
    const targetRotationZ = reducedMotion ? 0 : Math.sin(time * 0.15) * 0.01;
    const targetPositionY = reducedMotion ? 0.26 : 0.26 + Math.sin(time * 0.3) * 0.04;

    graphRef.current.rotation.x = THREE.MathUtils.lerp(
      graphRef.current.rotation.x,
      targetRotationX,
      0.03
    );
    graphRef.current.rotation.y = THREE.MathUtils.lerp(
      graphRef.current.rotation.y,
      targetRotationY,
      0.03
    );
    graphRef.current.rotation.z = THREE.MathUtils.lerp(
      graphRef.current.rotation.z,
      targetRotationZ,
      0.03
    );
    graphRef.current.position.y = THREE.MathUtils.lerp(
      graphRef.current.position.y,
      targetPositionY,
      0.03
    );
  });

  return (
    <group ref={graphRef} position={[0, 0.18, 0]} scale={0.74}>
      <mesh position={corePosition}>
        <sphereGeometry args={[0.14, 28, 28]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.26}
          metalness={0.06}
          roughness={0.18}
        />
      </mesh>

      <mesh position={corePosition} rotation={[Math.PI / 2, 0.24, 0]}>
        <torusGeometry args={[0.52, 0.012, 18, 96]} />
        <meshBasicMaterial color="#f5f3ef" transparent opacity={0.16} />
      </mesh>

      <mesh position={corePosition} rotation={[0.84, 1.08, 0.26]}>
        <torusGeometry args={[0.78, 0.009, 18, 96]} />
        <meshBasicMaterial color="#d6d3d1" transparent opacity={0.08} />
      </mesh>

      {clusters.map((cluster) => (
        <Branch
          key={cluster.id}
          cluster={cluster}
          active={cluster.id === activeId}
          subdued={Boolean(activeId) && cluster.id !== activeId}
          onPreviewChange={onPreviewChange}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

export function TechGraphScene(props: TechGraphSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 12.6], fov: 35 }}
      onPointerMissed={() => props.onPreviewChange(null)}
    >
      <fog attach="fog" args={["#050505", 7.2, 13]} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 6, 3]} intensity={1.08} color="#ffffff" />
      <pointLight position={[-4, -2, 4]} intensity={0.32} color="#f5f3ef" />
      <pointLight position={[3, 1, 2]} intensity={0.18} color="#ffffff" />
      <Graph {...props} />
    </Canvas>
  );
}
