"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Html, Line, OrbitControls } from "@react-three/drei";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import * as THREE from "three";
import type { Line2, LineMaterial } from "three-stdlib";

import { HeroSceneFallback } from "@/components/three/scene-fallbacks";
import { WebGLGuard } from "@/components/three/webgl-guard";

type Vec3 = [number, number, number];

type AnimatedSceneProps = {
  active: boolean;
};

type SignalKind = "ai" | "data" | "growth" | "infra" | "product";

type SignalConfig = {
  code: string;
  color: string;
  kind: SignalKind;
  label: string;
  phase: number;
  position: Vec3;
};

const signalConfigs: SignalConfig[] = [
  {
    code: "01",
    color: "#78a9ff",
    kind: "infra",
    label: "Infra",
    phase: 0.08,
    position: [-3.05, 0.16, -1.48]
  },
  {
    code: "02",
    color: "#7ce8dd",
    kind: "data",
    label: "Data",
    phase: 0.27,
    position: [-2.62, 0.08, 1.78]
  },
  {
    code: "03",
    color: "#b2a5ff",
    kind: "ai",
    label: "AI",
    phase: 0.48,
    position: [0, 0.1, 2.72]
  },
  {
    code: "04",
    color: "#ff7b62",
    kind: "product",
    label: "Product",
    phase: 0.68,
    position: [3.08, 0.16, -1.22]
  },
  {
    code: "05",
    color: "#ff6fae",
    kind: "growth",
    label: "Growth",
    phase: 0.86,
    position: [2.72, 0.08, 1.76]
  }
];

const coreWarmColor = new THREE.Color("#ff684f");
const coreCoolColor = new THREE.Color("#8b7dff");
const coreWarmEmissive = new THREE.Color("#ff321e");
const coreCoolEmissive = new THREE.Color("#5d47ff");

function createSignalCurve(signal: SignalConfig) {
  const end = new THREE.Vector3(
    signal.position[0],
    signal.position[1] + 0.42,
    signal.position[2]
  );
  const direction = end.clone().normalize();

  return new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.96, 0),
      direction.clone().multiplyScalar(0.9).setY(1.52),
      end.clone().multiplyScalar(0.62).setY(0.86 + signal.phase * 0.28),
      end
    ],
    false,
    "catmullrom",
    0.52
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}

function NexusLabel({
  code,
  color,
  core = false,
  label,
  position
}: {
  code: string;
  color: string;
  core?: boolean;
  label: string;
  position: Vec3;
}) {
  return (
    <Html center position={position} style={{ pointerEvents: "none" }}>
      <div
        aria-hidden="true"
        className={`whitespace-nowrap rounded-md border bg-[#03080d]/90 font-mono uppercase backdrop-blur-xl ${
          core
            ? "px-3 py-2 text-[0.64rem] tracking-[0.2em] text-stone-100 sm:text-xs"
            : "px-2.5 py-1.5 text-[0.56rem] tracking-[0.16em] text-stone-200 sm:text-[0.68rem]"
        }`}
        style={{
          borderColor: `${color}55`,
          boxShadow: `0 12px 34px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 24px ${color}18`
        }}
      >
        <span style={{ color }} className="mr-2 opacity-75">
          {code}
        </span>
        {label}
      </div>
    </Html>
  );
}

function createParticlePositions(count: number, seedStart: number) {
  let seed = seedStart >>> 0;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (random() - 0.5) * 9.6;
    positions[index * 3 + 1] = random() * 3.9 + 0.1;
    positions[index * 3 + 2] = (random() - 0.5) * 8.4;
  }

  return positions;
}

function createOrbitalSeeds(count: number, seedStart: number) {
  let seed = seedStart >>> 0;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const values = new Float32Array(count * 6);

  for (let index = 0; index < count; index += 1) {
    const cursor = index * 6;
    values[cursor] = random() * Math.PI * 2;
    values[cursor + 1] = 0.95 + random() * 1.75;
    values[cursor + 2] = (random() - 0.5) * 1.15;
    values[cursor + 3] = (0.16 + random() * 0.38) * (random() > 0.44 ? 1 : -1);
    values[cursor + 4] = random() * Math.PI * 2;
    values[cursor + 5] = Math.floor(random() * signalConfigs.length);
  }

  return values;
}

function AmbientParticles({ active, compact }: AnimatedSceneProps & { compact: boolean }) {
  const primaryRef = useRef<THREE.Points>(null);
  const secondaryRef = useRef<THREE.Points>(null);
  const primaryPositions = useMemo(
    () => createParticlePositions(compact ? 46 : 92, 1907),
    [compact]
  );
  const secondaryPositions = useMemo(
    () => createParticlePositions(compact ? 24 : 48, 811),
    [compact]
  );

  useFrame((state, delta) => {
    if (!active) return;

    if (primaryRef.current) {
      primaryRef.current.rotation.y += delta * 0.018;
      primaryRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
    }

    if (secondaryRef.current) {
      secondaryRef.current.rotation.y -= delta * 0.012;
    }
  });

  return (
    <group>
      <points ref={primaryRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[primaryPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#9ec8ff"
          size={compact ? 0.025 : 0.031}
          sizeAttenuation
          transparent
          opacity={0.62}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points ref={secondaryRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[secondaryPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#ff8268"
          size={compact ? 0.018 : 0.024}
          sizeAttenuation
          transparent
          opacity={0.46}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function HologramFloor({ active }: AnimatedSceneProps) {
  const scanRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!active) return;

    if (scanRef.current) scanRef.current.rotation.y += delta * 0.3;
    if (ringsRef.current) ringsRef.current.rotation.y -= delta * 0.018;
  });

  return (
    <group position={[0, -0.08, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 4.35, 96]} />
        <meshBasicMaterial
          color="#10283a"
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <group ref={ringsRef}>
        {[0.72, 1.42, 2.18, 3.08, 4.12].map((radius, index) => (
          <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, index === 4 ? 0.012 : 0.007, 4, 112]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#4b789e" : "#27485f"}
              transparent
              opacity={index === 4 ? 0.5 : 0.36}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {signalConfigs.map((signal) => (
        <Line
          key={`spoke-${signal.code}`}
          points={[
            [0, 0.015, 0],
            [signal.position[0], 0.015, signal.position[2]]
          ]}
          color={signal.color}
          lineWidth={0.65}
          transparent
          opacity={0.16}
        />
      ))}

      <group ref={scanRef} position={[0, 0.025, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.18, 4.14, 64, 1, 0, Math.PI * 0.27]} />
          <meshBasicMaterial
            color="#ff6b57"
            transparent
            opacity={0.09}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <Line
          points={[
            [0, 0, 0],
            [4.18, 0, 0]
          ]}
          color="#ff8a73"
          lineWidth={1.1}
          transparent
          opacity={0.45}
        />
      </group>
    </group>
  );
}

function PulseWaves({ active }: AnimatedSceneProps) {
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (!active) return;

    const time = state.clock.elapsedTime;

    pulseRefs.current.forEach((pulse, index) => {
      if (!pulse) return;

      const phase = (time * 0.24 + index / 3) % 1;
      const scale = 0.72 + phase * 3.5;
      pulse.scale.setScalar(scale);

      const material = pulse.material as THREE.MeshBasicMaterial;
      material.opacity = Math.pow(1 - phase, 1.45) * 0.24;
    });
  });

  return (
    <group position={[0, -0.045, 0]}>
      {["#ff765f", "#78a9ff", "#ff6fae"].map((color, index) => (
        <mesh
          key={color}
          ref={(mesh) => {
            pulseRefs.current[index] = mesh;
          }}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.96, 1, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitalSwarm({ active, compact }: AnimatedSceneProps & { compact: boolean }) {
  const swarmRef = useRef<THREE.Points>(null);
  const count = compact ? 58 : 128;
  const seeds = useMemo(() => createOrbitalSeeds(count, 4049), [count]);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const seedCursor = index * 6;
      const cursor = index * 3;
      const angle = seeds[seedCursor];
      const radius = seeds[seedCursor + 1];
      const phase = seeds[seedCursor + 4];

      values[cursor] = Math.cos(angle) * radius;
      values[cursor + 1] = 1 + seeds[seedCursor + 2] + Math.sin(phase) * 0.12;
      values[cursor + 2] = Math.sin(angle) * radius;
    }

    return values;
  }, [count, seeds]);
  const colors = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const color = new THREE.Color(signalConfigs[seeds[index * 6 + 5]].color);
      const cursor = index * 3;
      values[cursor] = color.r;
      values[cursor + 1] = color.g;
      values[cursor + 2] = color.b;
    }

    return values;
  }, [count, seeds]);

  useFrame((state) => {
    if (!active || !swarmRef.current) return;

    const time = state.clock.elapsedTime;

    for (let index = 0; index < count; index += 1) {
      const seedCursor = index * 6;
      const cursor = index * 3;
      const radius = seeds[seedCursor + 1] + Math.sin(time * 0.7 + seeds[seedCursor + 4]) * 0.1;
      const angle = seeds[seedCursor] + time * seeds[seedCursor + 3];

      positions[cursor] = Math.cos(angle) * radius;
      positions[cursor + 1] =
        1 +
        seeds[seedCursor + 2] +
        Math.sin(time * 1.1 + seeds[seedCursor + 4]) * 0.14;
      positions[cursor + 2] = Math.sin(angle) * radius;
    }

    swarmRef.current.geometry.getAttribute("position").needsUpdate = true;
  });

  return (
    <points ref={swarmRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={compact ? 0.04 : 0.052}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.82}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CoreReactor({ active, compact }: AnimatedSceneProps & { compact: boolean }) {
  const reactorRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const ringARef = useRef<THREE.Mesh>(null);
  const ringBRef = useRef<THREE.Mesh>(null);
  const ringCRef = useRef<THREE.Mesh>(null);
  const beaconsRef = useRef<THREE.Group>(null);
  const coreMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (!active) return;

    const time = state.clock.elapsedTime;

    if (reactorRef.current) {
      reactorRef.current.position.y = 0.96 + Math.sin(time * 0.72) * 0.08;
    }
    if (shellRef.current) {
      shellRef.current.rotation.x += delta * 0.14;
      shellRef.current.rotation.y += delta * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.36;
      innerRef.current.rotation.y += delta * 0.48;
    }
    if (haloRef.current) {
      const scale = 1 + Math.sin(time * 1.55) * 0.07;
      haloRef.current.scale.setScalar(scale);
    }
    if (ringARef.current) ringARef.current.rotation.z += delta * 0.2;
    if (ringBRef.current) ringBRef.current.rotation.z -= delta * 0.16;
    if (ringCRef.current) ringCRef.current.rotation.z += delta * 0.11;
    if (beaconsRef.current) beaconsRef.current.rotation.y += delta * 0.46;
    if (coreMaterialRef.current) {
      const colorMix = (Math.sin(time * 0.58) + 1) / 2;
      coreMaterialRef.current.color.lerpColors(coreWarmColor, coreCoolColor, colorMix);
      coreMaterialRef.current.emissive.lerpColors(
        coreWarmEmissive,
        coreCoolEmissive,
        colorMix
      );
      coreMaterialRef.current.emissiveIntensity = 1.35 + Math.sin(time * 2.4) * 0.42;
    }
    if (coreLightRef.current) {
      const colorMix = (Math.sin(time * 0.58) + 1) / 2;
      coreLightRef.current.color.lerpColors(coreWarmColor, coreCoolColor, colorMix);
      coreLightRef.current.intensity = 2.2 + Math.sin(time * 2.4) * 0.35;
    }
  });

  return (
    <group ref={reactorRef} position={[0, 0.96, 0]}>
      <NexusLabel
        code="NX-0"
        color="#ff765f"
        core
        label="Systems nexus"
        position={[0, 1.68, 0]}
      />

      <pointLight
        ref={coreLightRef}
        color="#ff674f"
        intensity={2.2}
        distance={5.8}
        decay={2}
      />
      <pointLight color="#79b8ff" intensity={0.85} distance={4.2} position={[0, 0.4, 0.8]} />

      <mesh position={[0, -0.98, 0]}>
        <cylinderGeometry args={[0.026, 0.026, 3.15, 12]} />
        <meshBasicMaterial
          color="#ff8067"
          transparent
          opacity={0.52}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={haloRef}>
        <sphereGeometry args={[1.05, 28, 28]} />
        <meshBasicMaterial
          color="#ff684f"
          transparent
          opacity={0.045}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={shellRef} rotation={[0.15, 0.34, 0.08]}>
        <icosahedronGeometry args={[0.79, 1]} />
        <meshBasicMaterial
          color="#ff8068"
          wireframe
          transparent
          opacity={0.82}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.68, 1]} />
        <meshStandardMaterial
          color="#1a0908"
          emissive="#ff6048"
          emissiveIntensity={0.72}
          metalness={0.38}
          roughness={0.2}
          transparent
          opacity={0.56}
        />
      </mesh>

      <mesh ref={innerRef} rotation={[0.2, 0.2, 0.35]}>
        <torusKnotGeometry
          args={compact ? [0.42, 0.09, 88, 10, 2, 3] : [0.46, 0.1, 128, 14, 2, 3]}
        />
        <meshStandardMaterial
          ref={coreMaterialRef}
          color="#ffb197"
          emissive="#ff472f"
          emissiveIntensity={1.45}
          metalness={0.52}
          roughness={0.18}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.13, 18, 18]} />
        <meshBasicMaterial color="#fff4eb" />
      </mesh>

      <mesh ref={ringARef} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[1.06, 0.018, 8, 96]} />
        <meshBasicMaterial color="#ff6b57" transparent opacity={0.72} depthWrite={false} />
      </mesh>
      <mesh ref={ringBRef} rotation={[0.34, Math.PI / 2.25, 0]}>
        <torusGeometry args={[1.25, 0.011, 6, 96]} />
        <meshBasicMaterial color="#78a9ff" transparent opacity={0.48} depthWrite={false} />
      </mesh>
      <mesh ref={ringCRef} rotation={[0.9, 0.42, Math.PI / 2]}>
        <torusGeometry args={[1.43, 0.008, 5, 96]} />
        <meshBasicMaterial color="#ff70ad" transparent opacity={0.34} depthWrite={false} />
      </mesh>

      <group ref={beaconsRef}>
        {Array.from({ length: 8 }, (_, index) => {
          const angle = (index / 8) * Math.PI * 2;
          const radius = index % 2 === 0 ? 1.22 : 1.42;

          return (
            <mesh
              key={index}
              position={[
                Math.cos(angle) * radius,
                index % 2 === 0 ? 0.14 : -0.16,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[index % 2 === 0 ? 0.038 : 0.026, 8, 8]} />
              <meshBasicMaterial
                color={index % 3 === 0 ? "#78a9ff" : "#ff876e"}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function ModuleGlyph({ color, kind }: { color: string; kind: SignalKind }) {
  if (kind === "infra") {
    return (
      <group>
        {[-0.17, 0, 0.17].map((y, index) => (
          <mesh key={y} position={[0, y, 0]} rotation={[0, index * 0.16, 0]}>
            <boxGeometry args={[0.48 - index * 0.05, 0.1, 0.34 - index * 0.03]} />
            <meshStandardMaterial color="#0b1620" emissive={color} emissiveIntensity={0.32} />
            <Edges color={color} />
          </mesh>
        ))}
      </group>
    );
  }

  if (kind === "data") {
    return (
      <group>
        {[-0.12, 0.05, 0.22].map((y, index) => (
          <mesh key={y} position={[0, y, 0]}>
            <cylinderGeometry args={[0.24 - index * 0.025, 0.24 - index * 0.025, 0.09, 24]} />
            <meshStandardMaterial
              color="#071714"
              emissive={color}
              emissiveIntensity={0.38 + index * 0.08}
              metalness={0.32}
              roughness={0.24}
            />
          </mesh>
        ))}
      </group>
    );
  }

  if (kind === "ai") {
    return (
      <group>
        <mesh>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.9} />
        </mesh>
        {[
          [0.42, 0, 0],
          [-0.42, 0, 0],
          [0, 0.42, 0],
          [0, -0.42, 0],
          [0, 0, 0.42],
          [0, 0, -0.42]
        ].map((position) => (
          <mesh key={position.join(",")} position={position as Vec3}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#e9e5ff" />
          </mesh>
        ))}
      </group>
    );
  }

  if (kind === "growth") {
    return (
      <group>
        {[0, 1, 2].map((index) => (
          <mesh key={index} position={[-0.22 + index * 0.22, -0.1 + index * 0.11, 0]}>
            <boxGeometry args={[0.1, 0.22 + index * 0.16, 0.12]} />
            <meshStandardMaterial color="#180913" emissive={color} emissiveIntensity={0.52} />
            <Edges color={color} />
          </mesh>
        ))}
        <Line
          points={[
            [-0.3, 0.06, 0.09],
            [-0.08, 0.14, 0.09],
            [0.12, 0.13, 0.09],
            [0.34, 0.42, 0.09]
          ]}
          color="#ffd4e5"
          lineWidth={1.4}
        />
      </group>
    );
  }

  return (
    <group rotation={[0.34, 0.6, 0.2]}>
      <mesh>
        <boxGeometry args={[0.44, 0.44, 0.44]} />
        <meshStandardMaterial color="#180b08" emissive={color} emissiveIntensity={0.34} />
        <Edges color={color} />
      </mesh>
      <mesh scale={0.58}>
        <boxGeometry args={[0.44, 0.44, 0.44]} />
        <meshBasicMaterial color="#ffd4c9" wireframe />
      </mesh>
    </group>
  );
}

function SignalModule({ active, signal }: AnimatedSceneProps & { signal: SignalConfig }) {
  const moduleRef = useRef<THREE.Group>(null);
  const glyphRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!active) return;

    const time = state.clock.elapsedTime;

    if (moduleRef.current) {
      moduleRef.current.position.y =
        signal.position[1] + Math.sin(time * 0.82 + signal.phase * Math.PI * 2) * 0.07;
    }
    if (glyphRef.current) glyphRef.current.rotation.y += delta * (0.22 + signal.phase * 0.08);
    if (pulseRef.current) {
      const scale = 1 + ((Math.sin(time * 1.4 + signal.phase * 8) + 1) / 2) * 0.22;
      pulseRef.current.scale.setScalar(scale);
      const material = pulseRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.16 - (scale - 1) * 0.35;
    }
  });

  return (
    <group ref={moduleRef} position={signal.position}>
      <NexusLabel
        code={signal.code}
        color={signal.color}
        label={signal.label}
        position={[0, 1.02, 0]}
      />

      <pointLight color={signal.color} intensity={0.72} distance={2.4} decay={2} />

      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.48, 0.61, 0.13, 6]} />
        <meshStandardMaterial
          color="#071019"
          emissive={signal.color}
          emissiveIntensity={0.11}
          metalness={0.56}
          roughness={0.26}
        />
        <Edges color="#314657" />
      </mesh>

      <mesh position={[0, 0.115, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.43, 0.018, 6, 54]} />
        <meshBasicMaterial color={signal.color} transparent opacity={0.64} />
      </mesh>

      <mesh ref={pulseRef} position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.43, 0.48, 48]} />
        <meshBasicMaterial
          color={signal.color}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <group ref={glyphRef} position={[0, 0.49, 0]}>
        <ModuleGlyph color={signal.color} kind={signal.kind} />
      </group>
    </group>
  );
}

function EnergyRoute({
  active,
  compact,
  curve,
  signal
}: AnimatedSceneProps & {
  compact: boolean;
  curve: THREE.CatmullRomCurve3;
  signal: SignalConfig;
}) {
  const flowRef = useRef<Line2>(null);
  const curvePoints = useMemo(() => curve.getPoints(compact ? 28 : 44), [compact, curve]);

  useFrame((state, delta) => {
    if (!active || !flowRef.current) return;

    const material = flowRef.current.material as LineMaterial;
    material.dashOffset -= delta * 0.42;
    material.opacity = 0.56 + Math.sin(state.clock.elapsedTime * 2 + signal.phase * 9) * 0.22;
  });

  return (
    <group>
      <Line
        points={curvePoints}
        color={signal.color}
        lineWidth={5}
        transparent
        opacity={0.07}
      />
      <Line
        ref={flowRef}
        points={curvePoints}
        color={signal.color}
        lineWidth={1.45}
        dashed
        dashSize={0.13}
        gapSize={0.085}
        transparent
        opacity={0.76}
      />
    </group>
  );
}

function PacketStream({
  active,
  compact,
  curves
}: AnimatedSceneProps & {
  compact: boolean;
  curves: THREE.CatmullRomCurve3[];
}) {
  const streamRef = useRef<THREE.Points>(null);
  const headsPerRoute = compact ? 2 : 4;
  const pointsPerHead = compact ? 4 : 7;
  const baseColors = useMemo(
    () => signalConfigs.map((signal) => new THREE.Color(signal.color)),
    []
  );
  const positions = useMemo(() => {
    const values = new Float32Array(curves.length * headsPerRoute * pointsPerHead * 3);
    const point = new THREE.Vector3();
    let cursor = 0;

    curves.forEach((curve, routeIndex) => {
      for (let head = 0; head < headsPerRoute; head += 1) {
        for (let trail = 0; trail < pointsPerHead; trail += 1) {
          const progress =
            (signalConfigs[routeIndex].phase + head / headsPerRoute - trail * 0.018 + 1) % 1;
          const time = (routeIndex + head) % 2 === 0 ? progress : 1 - progress;
          curve.getPointAt(time, point);
          values[cursor] = point.x;
          values[cursor + 1] = point.y;
          values[cursor + 2] = point.z;
          cursor += 3;
        }
      }
    });

    return values;
  }, [curves, headsPerRoute, pointsPerHead]);
  const colors = useMemo(() => {
    const values = new Float32Array(curves.length * headsPerRoute * pointsPerHead * 3);
    let cursor = 0;

    signalConfigs.forEach((_, routeIndex) => {
      const base = baseColors[routeIndex];

      for (let head = 0; head < headsPerRoute; head += 1) {
        for (let trail = 0; trail < pointsPerHead; trail += 1) {
          const intensity = Math.pow(1 - trail / pointsPerHead, 1.55) * 1.14;
          values[cursor] = base.r * intensity;
          values[cursor + 1] = base.g * intensity;
          values[cursor + 2] = base.b * intensity;
          cursor += 3;
        }
      }
    });

    return values;
  }, [baseColors, curves.length, headsPerRoute, pointsPerHead]);

  useFrame((state) => {
    if (!active || !streamRef.current) return;

    const point = new THREE.Vector3();
    const elapsed = state.clock.elapsedTime * 0.34;
    let cursor = 0;

    curves.forEach((curve, routeIndex) => {
      for (let head = 0; head < headsPerRoute; head += 1) {
        for (let trail = 0; trail < pointsPerHead; trail += 1) {
          const progress =
            (elapsed +
              signalConfigs[routeIndex].phase +
              head / headsPerRoute -
              trail * 0.018 +
              1) %
            1;
          const time = (routeIndex + head) % 2 === 0 ? progress : 1 - progress;
          const pulse = 0.78 + Math.sin(state.clock.elapsedTime * 5 + head * 1.7) * 0.22;
          const intensity = Math.pow(1 - trail / pointsPerHead, 1.55) * 1.18 * pulse;
          const base = baseColors[routeIndex];
          curve.getPointAt(time, point);
          positions[cursor] = point.x;
          positions[cursor + 1] = point.y;
          positions[cursor + 2] = point.z;
          colors[cursor] = base.r * intensity;
          colors[cursor + 1] = base.g * intensity;
          colors[cursor + 2] = base.b * intensity;
          cursor += 3;
        }
      }
    });

    const positionAttribute = streamRef.current.geometry.getAttribute("position");
    positionAttribute.needsUpdate = true;
    streamRef.current.geometry.getAttribute("color").needsUpdate = true;
  });

  return (
    <points ref={streamRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={compact ? 0.072 : 0.092}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.96}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NexusWorld({ active }: AnimatedSceneProps) {
  const worldRef = useRef<THREE.Group>(null);
  const orbitalRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const compact = size.width < 520;
  const signalCurves = useMemo(() => signalConfigs.map(createSignalCurve), []);

  useFrame((state, delta) => {
    if (!active || !worldRef.current) return;

    worldRef.current.rotation.y = THREE.MathUtils.lerp(
      worldRef.current.rotation.y,
      -0.055 + state.pointer.x * 0.045,
      0.035
    );
    worldRef.current.rotation.x = THREE.MathUtils.lerp(
      worldRef.current.rotation.x,
      state.pointer.y * 0.018,
      0.035
    );
    if (orbitalRef.current) {
      orbitalRef.current.rotation.y += delta * (compact ? 0.075 : 0.045);
    }
  });

  return (
    <group
      ref={worldRef}
      position={[0, compact ? -0.34 : -0.42, 0]}
      rotation={[0, -0.055, 0]}
      scale={compact ? 0.86 : 1}
    >
      <AmbientParticles active={active} compact={compact} />
      <HologramFloor active={active} />
      <PulseWaves active={active} />
      <OrbitalSwarm active={active} compact={compact} />
      <CoreReactor active={active} compact={compact} />

      <group ref={orbitalRef}>
        {signalConfigs.map((signal, index) => (
          <EnergyRoute
            key={`route-${signal.code}`}
            active={active}
            compact={compact}
            curve={signalCurves[index]}
            signal={signal}
          />
        ))}

        <PacketStream active={active} compact={compact} curves={signalCurves} />

        {signalConfigs.map((signal) => (
          <SignalModule key={signal.code} active={active} signal={signal} />
        ))}
      </group>
    </group>
  );
}

function ResponsiveRig({ active, interactive }: AnimatedSceneProps & { interactive: boolean }) {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const compact = size.width < 520;
    const medium = size.width >= 520 && size.width < 760;

    camera.position.set(
      0,
      compact ? 5.3 : medium ? 4.8 : 4.35,
      compact ? 10.1 : medium ? 8.7 : 7.25
    );
    camera.fov = compact ? 48 : medium ? 44 : 39;
    camera.lookAt(0, 0.32, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  if (!interactive) return null;

  return (
    <OrbitControls
      autoRotate={active}
      autoRotateSpeed={0.44}
      enableDamping
      dampingFactor={0.07}
      enablePan={false}
      enableZoom={false}
      maxPolarAngle={Math.PI / 2.08}
      minPolarAngle={Math.PI / 4.7}
      rotateSpeed={0.72}
      target={[0, 0.32, 0]}
    />
  );
}

function SceneReady({ onReady }: { onReady: () => void }) {
  const frameCountRef = useRef(0);
  const announcedRef = useRef(false);

  useFrame(() => {
    if (announcedRef.current) return;

    frameCountRef.current += 1;

    if (frameCountRef.current >= 5) {
      announcedRef.current = true;
      onReady();
    }
  });

  return null;
}

function ContextMonitor({
  onLost,
  onRestored
}: {
  onLost: () => void;
  onRestored: () => void;
}) {
  const { gl, invalidate } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const handleLost = (event: Event) => {
      event.preventDefault();
      onLost();
    };
    const handleRestored = () => {
      onRestored();
      invalidate();
    };

    canvas.addEventListener("webglcontextlost", handleLost);
    canvas.addEventListener("webglcontextrestored", handleRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleLost);
      canvas.removeEventListener("webglcontextrestored", handleRestored);
    };
  }, [gl, invalidate, onLost, onRestored]);

  return null;
}

export function SystemScene({ active }: AnimatedSceneProps) {
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const finePointer = useMediaQuery("(pointer: fine) and (hover: hover)");
  const [contextLost, setContextLost] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const handleContextLost = useCallback(() => {
    setContextLost(true);
    setSceneReady(false);
  }, []);
  const handleContextRestored = useCallback(() => setContextLost(false), []);
  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  return (
    <WebGLGuard fallback={<HeroSceneFallback />}>
      <div
        className="relative h-full w-full bg-[#02070b]"
        data-scene-ready={sceneReady && !contextLost ? "true" : "false"}
      >
        <div
          aria-hidden="true"
          className={`webgl-scene-layer pointer-events-none absolute inset-0 ${
            sceneReady && !contextLost ? "opacity-0" : "opacity-100"
          }`}
        >
          <HeroSceneFallback />
        </div>

        <div
          className={`webgl-scene-layer absolute inset-0 ${
            sceneReady && !contextLost ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Canvas
            dpr={coarsePointer ? [1, 1.15] : [1, 1.5]}
            frameloop="always"
            gl={{
              alpha: false,
              antialias: !coarsePointer,
              powerPreference: "default",
              preserveDrawingBuffer: !coarsePointer
            }}
            camera={{ position: [0, 4.35, 7.25], fov: 39 }}
            onCreated={({ gl }) => {
              gl.outputColorSpace = THREE.SRGBColorSpace;
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.12;
            }}
            style={{
              cursor: finePointer ? "grab" : "default",
              pointerEvents: finePointer ? "auto" : "none",
              touchAction: finePointer ? "none" : "pan-y"
            }}
          >
            <SceneReady key={contextLost ? "lost" : "live"} onReady={handleSceneReady} />
            <ContextMonitor onLost={handleContextLost} onRestored={handleContextRestored} />
            <color attach="background" args={["#02070b"]} />
            <fog attach="fog" args={["#02070b", 7.4, 14.5]} />
            <ambientLight intensity={0.48} />
            <directionalLight position={[3.5, 6, 4]} intensity={1.25} color="#dcecff" />
            <pointLight position={[-4, 2.5, 1]} intensity={0.72} color="#5f9cff" />
            <pointLight position={[4, 2.2, 1]} intensity={0.68} color="#ff6b89" />
            <NexusWorld active={active} />
            <ResponsiveRig active={active} interactive={finePointer} />
          </Canvas>
        </div>
      </div>
    </WebGLGuard>
  );
}
