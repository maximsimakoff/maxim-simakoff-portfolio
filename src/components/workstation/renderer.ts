import * as THREE from "three";
import { buildWorkstation } from "./model";

export type WorkstationController = {
  setExploded: (exploded: boolean) => void;
  move: (dx: number, dy: number) => void;
  reset: () => void;
  dispose: () => void;
};

export function startRenderer(
  element: HTMLDivElement, onContextLoss: () => void
): WorkstationController {
  const canvas = document.createElement("canvas");
  const options: WebGLContextAttributes = {
    alpha: true, antialias: true, powerPreference: "low-power", premultipliedAlpha: true
  };
  const context = canvas.getContext("webgl2", options);
  if (!context) throw new Error("WebGL 2 is unavailable");
  const renderer = new THREE.WebGLRenderer({ canvas, context, ...options });
  renderer.setClearColor(0, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-3, 3, 2.5, -2.5, .1, 70);
  const studioLight = new THREE.HemisphereLight("#fff9ed", "#bbb0c5", 1.9);
  scene.add(studioLight);
  const key = new THREE.DirectionalLight("#fff5df", 2.45);
  key.position.set(-4, 8, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -5.4, right: 5.4, top: 6.1, bottom: -5.2, near: .2, far: 22 });
  key.shadow.normalBias = .018;
  key.shadow.bias = -.0003;
  key.shadow.intensity = .44;
  scene.add(key);
  const rim = new THREE.DirectionalLight("#d5c6f7", 1.25);
  rim.position.set(1, 4, -5);
  scene.add(rim);

  const workstation = buildWorkstation();
  scene.add(workstation.group);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(36, 36), new THREE.ShadowMaterial({
    color: "#584970", opacity: .29, depthWrite: false
  }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  element.appendChild(renderer.domElement);

  const restingYaw = .53;
  const restingPitch = .28;
  let yaw = restingYaw, pitch = restingPitch, targetYaw = yaw, targetPitch = pitch;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const slideDuration = 2.6;
  let active = true, disposed = false;
  let separation = 0, targetSeparation = 0, slideVelocity = 0;
  let time = 0, previous = 0, frame = 0, aspect = 1;
  const aim = new THREE.Vector3();

  function paint() {
    // Make room as the cabinet lifts, then hold the framing for the extraction.
    const framing = THREE.MathUtils.smoothstep(separation, 0, .55);
    const height = Math.max(5.03, 6.17 / aspect) + framing * 1.62;
    camera.left = -height * aspect / 2;
    camera.right = height * aspect / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    const swing = yaw + (reducedMotion.matches ? 0 : Math.sin(time * .23) * .035);
    const elevation = pitch + (reducedMotion.matches ? 0 : Math.sin(time * .29) * .009);
    aim.set(-.05, 1.58 + framing * .63, .35);
    camera.position.set(
      Math.sin(swing) * Math.cos(elevation),
      Math.sin(elevation),
      Math.cos(swing) * Math.cos(elevation)
    ).multiplyScalar(12).add(aim);
    camera.lookAt(aim);
    workstation.animate(time);
    workstation.explode(separation);
    renderer.render(scene, camera);
  }

  function wake() {
    if (!frame && !disposed && active && !document.hidden) {
      previous = performance.now() - 40;
      frame = requestAnimationFrame(tick);
    }
  }

  function tick(now: number) {
    frame = 0;
    if (!active || document.hidden || disposed) return;
    const elapsed = now - previous;
    const movingView = Math.abs(targetYaw - yaw) + Math.abs(targetPitch - pitch) > .0004;
    const movingParts = separation !== targetSeparation;
    if (elapsed >= 32 || movingView || movingParts) {
      const delta = Math.min(elapsed / 1000, .075);
      previous = now;
      time += delta;
      yaw = THREE.MathUtils.damp(yaw, targetYaw, 14, delta);
      pitch = THREE.MathUtils.damp(pitch, targetPitch, 14, delta);
      if (movingParts) {
        // Keep the same playhead when the direction changes mid-slide.
        const direction = Math.sign(targetSeparation - separation);
        slideVelocity = THREE.MathUtils.damp(slideVelocity, direction / slideDuration, 15, delta);
        separation = THREE.MathUtils.clamp(separation + slideVelocity * delta, 0, 1);
        if (separation === targetSeparation) slideVelocity = 0;
        renderer.shadowMap.needsUpdate = true;
      }
      paint();
    }
    frame = requestAnimationFrame(tick);
  }

  function resize() {
    const { width, height } = element.getBoundingClientRect();
    if (!width || !height) return;
    aspect = width / height;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 550 ? 1.5 : 1.75));
    renderer.setSize(width, height, false);
    paint();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(element);
  const intersection = new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
    if (active) wake();
  });
  intersection.observe(element);
  function contextLost(event: Event) {
    event.preventDefault();
    onContextLoss();
  }
  document.addEventListener("visibilitychange", wake);
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  resize();
  wake();

  return {
    setExploded(value) {
      targetSeparation = value ? 1 : 0;
      wake();
    },
    move(dx, dy) {
      targetYaw = THREE.MathUtils.clamp(targetYaw + dx, -.95, 1.42);
      targetPitch = THREE.MathUtils.clamp(targetPitch + dy, .12, .72);
      wake();
    },
    reset() { targetYaw = restingYaw; targetPitch = restingPitch; wake(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", wake);
      resizeObserver.disconnect();
      intersection.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        if (object instanceof THREE.InstancedMesh) object.dispose();
        for (const material of [object.material].flat()) materials.add(material);
      });
      for (const material of materials) {
        if ("map" in material && material.map instanceof THREE.Texture) textures.add(material.map);
        material.dispose();
      }
      textures.forEach((texture) => texture.dispose());
      key.shadow.map?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    }
  };
}
