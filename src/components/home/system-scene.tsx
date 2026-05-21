"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Html, Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { HeroSceneFallback } from "@/components/three/scene-fallbacks";
import { WebGLGuard } from "@/components/three/webgl-guard";

type Vec3 = [number, number, number];

type NodeConfig = {
  color: string;
  kind: "ai" | "cube" | "data" | "growth" | "infra";
  label: string;
  position: Vec3;
};

const nodeConfigs: NodeConfig[] = [
  { label: "Infra", kind: "infra", color: "#5c9dff", position: [-2.7, 0, -1.45] },
  { label: "Data", kind: "data", color: "#4c8eff", position: [-3.0, 0, 0.72] },
  { label: "AI", kind: "ai", color: "#6ea2ff", position: [0, 0, 2.12] },
  { label: "Product", kind: "cube", color: "#5c9dff", position: [2.7, 0, -1.45] },
  { label: "Growth", kind: "growth", color: "#4c8eff", position: [3.0, 0, 0.72] }
];

function makeGrid() {
  const grid = new THREE.GridHelper(9.5, 38, "#233342", "#0e1a22");
  const materials = Array.isArray(grid.material) ? grid.material : [grid.material];

  materials.forEach((material) => {
    material.transparent = true;
    material.opacity = 0.46;
  });

  return grid;
}

function Label({ children, position }: { children: string; position: Vec3 }) {
  return (
    <Html center position={position} style={{ pointerEvents: "none" }}>
      <div className="rounded border border-white/20 bg-[#06090d]/80 px-2.5 py-1 font-mono text-sm text-stone-200 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-md">
        {children}
      </div>
    </Html>
  );
}

function BasePad({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.92, 0.12, 0.62]} />
        <meshStandardMaterial
          color="#101923"
          emissive={color}
          emissiveIntensity={0.08}
          metalness={0.35}
          roughness={0.28}
        />
        <Edges color="#2d3b48" scale={1.02} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[0.72, 0.05, 0.44]} />
        <meshStandardMaterial color="#071018" transparent opacity={0.72} />
      </mesh>
    </group>
  );
}

function NodeIcon({ color, kind }: Pick<NodeConfig, "color" | "kind">) {
  if (kind === "infra") {
    return (
      <group position={[0, 0.4, 0]}>
        {[-0.12, 0.04, 0.2].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <boxGeometry args={[0.36, 0.1, 0.24]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} />
            <Edges color="#9ec4ff" />
          </mesh>
        ))}
      </group>
    );
  }

  if (kind === "data") {
    return (
      <group position={[0, 0.46, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.32, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.48} />
        </mesh>
        <Line
          points={[
            [-0.2, 0.16, 0],
            [0.2, 0.16, 0]
          ]}
          color="#bcd5ff"
          lineWidth={1}
          transparent
          opacity={0.7}
        />
      </group>
    );
  }

  if (kind === "growth") {
    return (
      <group position={[0, 0.48, 0]}>
        <Line
          points={[
            [-0.24, -0.08, 0],
            [-0.06, 0.06, 0],
            [0.08, -0.02, 0],
            [0.26, 0.2, 0]
          ]}
          color={color}
          lineWidth={3}
        />
        <mesh position={[0.28, 0.2, 0]} rotation={[0, 0, -0.75]}>
          <coneGeometry args={[0.07, 0.16, 3]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} />
        </mesh>
      </group>
    );
  }

  if (kind === "ai") {
    const points: Vec3[] = [
      [0, 0.55, 0],
      [-0.18, 0.36, 0.08],
      [0.2, 0.34, -0.04],
      [-0.04, 0.22, 0.2]
    ];

    return (
      <group>
        <Line points={[points[0], points[1], points[3], points[2], points[0]]} color={color} lineWidth={1.5} />
        {points.map((point) => (
          <mesh key={point.join(",")} position={point}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <mesh position={[0, 0.5, 0]} rotation={[0.5, 0.72, 0.2]}>
      <boxGeometry args={[0.36, 0.36, 0.36]} />
      <meshStandardMaterial color="#10233a" transparent opacity={0.45} />
      <Edges color={color} />
    </mesh>
  );
}

function SatelliteNode({ color, kind, label, position }: NodeConfig) {
  return (
    <group position={position}>
      <BasePad color={color} />
      <NodeIcon color={color} kind={kind} />
      <Label position={[0, 0.92, 0]}>{label}</Label>
    </group>
  );
}

function Packet({
  color,
  delay,
  from,
  to
}: {
  color: string;
  delay: number;
  from: Vec3;
  to: Vec3;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const t = (state.clock.elapsedTime * 0.28 + delay) % 1;
    ref.current.position.lerpVectors(
      new THREE.Vector3(...from),
      new THREE.Vector3(...to),
      t
    );
    ref.current.position.y += Math.sin(t * Math.PI) * 0.18;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
    </mesh>
  );
}

function Route({ color, index, to }: { color: string; index: number; to: Vec3 }) {
  const from: Vec3 = [0, 0.72, 0];
  const target: Vec3 = [to[0], 0.42, to[2]];
  const midpoint: Vec3 = [to[0] * 0.48, 0.5, to[2] * 0.48];

  return (
    <group>
      <Line
        points={[from, midpoint, target]}
        color={color}
        lineWidth={1.4}
        transparent
        opacity={0.68}
      />
      <Line
        points={[from, midpoint, target]}
        color="#ffffff"
        lineWidth={3.8}
        transparent
        opacity={0.08}
      />
      <Packet color={color} delay={index * 0.16} from={from} to={target} />
    </group>
  );
}

function CoreCube() {
  const ref = useRef<THREE.Group>(null);
  const sparks = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        id: index,
        position: [
          (Math.random() - 0.5) * 0.82,
          (Math.random() - 0.5) * 0.82,
          (Math.random() - 0.5) * 0.82
        ] as Vec3,
        scale: 0.015 + Math.random() * 0.018
      })),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.035;
  });

  return (
    <group ref={ref} position={[0, 0.82, 0]}>
      <Label position={[0, 1.15, 0]}>CORE</Label>
      <pointLight color="#ff6b57" intensity={1.35} distance={4.6} />
      <mesh>
        <boxGeometry args={[1.03, 1.03, 1.03]} />
        <meshStandardMaterial
          color="#160b08"
          emissive="#ff6b57"
          emissiveIntensity={0.18}
          metalness={0.25}
          roughness={0.22}
          transparent
          opacity={0.58}
        />
        <Edges color="#ff785f" scale={1.015} />
      </mesh>
      <mesh position={[0, -0.62, 0]}>
        <boxGeometry args={[1.42, 0.16, 1.1]} />
        <meshStandardMaterial color="#121920" emissive="#ff6b57" emissiveIntensity={0.08} />
        <Edges color="#2c343d" />
      </mesh>
      {sparks.map((spark) => (
        <mesh key={spark.id} position={spark.position}>
          <sphereGeometry args={[spark.scale, 8, 8]} />
          <meshBasicMaterial color="#ff9a78" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function OperatingMap() {
  const grid = useMemo(makeGrid, []);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.025;
  });

  return (
    <group ref={groupRef} position={[0, -0.55, 0]} rotation={[0, -0.16, 0]}>
      <primitive object={grid} />
      <CoreCube />

      {nodeConfigs.map((node, index) => (
        <Route
          key={`${node.label}-route`}
          color={index === 1 ? "#ff8d68" : index > 2 ? "#ff6aa2" : node.color}
          index={index}
          to={node.position}
        />
      ))}

      {nodeConfigs.map((node) => (
        <SatelliteNode key={node.label} {...node} />
      ))}
    </group>
  );
}

export function SystemScene() {
  return (
    <WebGLGuard fallback={<HeroSceneFallback />}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 4.25, 6.2], fov: 42 }}
      >
        <fog attach="fog" args={["#061018", 5.8, 12.2]} />
        <ambientLight intensity={0.38} />
        <directionalLight position={[2.8, 5, 3.4]} intensity={1.1} color="#d8e9ff" />
        <pointLight position={[-3, 2, 2]} intensity={0.55} color="#5c9dff" />
        <pointLight position={[3, 2, 2]} intensity={0.65} color="#ff6b57" />
        <OperatingMap />
        <OrbitControls
          enableDamping
          enablePan={false}
          maxDistance={8}
          maxPolarAngle={Math.PI / 2.16}
          minDistance={4.6}
          minPolarAngle={Math.PI / 4.8}
        />
      </Canvas>
    </WebGLGuard>
  );
}
