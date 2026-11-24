import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { makeBadgeTexture, makeContactShadow, makeDisplayTexture } from "./display";

type Position = [number, number, number];
type Profile = [width: number, height: number, depth: number, radius: number];

// Cross sections let the CRT taper to the rear and the front bezel fold inward.
function shellGeometry(profiles: Profile[]) {
  const coordinates: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const [width, height] = profiles[0];
  const steps = 6;
  const ringSize = (steps + 1) * 4;
  profiles.forEach(([w, h, z, r], ring) => {
    for (let corner = 0; corner < 4; corner++) {
      const cx = (corner === 0 || corner === 3 ? 1 : -1) * (w / 2 - r);
      const cy = (corner < 2 ? 1 : -1) * (h / 2 - r);
      for (let s = 0; s <= steps; s++) {
        const a = (corner + s / steps) * Math.PI / 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        coordinates.push(x, y, z);
        uvs.push(.5 + x / width, .5 + y / height);
        if (ring === 0) continue;
        const idx = corner * (steps + 1) + s;
        const i = (ring - 1) * ringSize + idx;
        const j = (ring - 1) * ringSize + (idx + 1) % ringSize;
        indices.push(i, j, i + ringSize, j, j + ringSize, i + ringSize);
      }
    }
  });
  const last = (profiles.length - 1) * ringSize;
  for (let i = 1; i < ringSize - 1; i++) {
    indices.push(0, i + 1, i);
    indices.push(last, last + i, last + i + 1);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(coordinates, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

type Key = { x: number; z: number; width: number; label: string; color: string };

function createKeyboardKeys() {
  const size = .183;
  const rows = [
    ["ESC", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "DEL"],
    ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
    ["CTRL", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "RET"],
    ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "UP"],
    ["OPT", "ALT", "", "ALT", "<", "v", ">"]
  ];
  const widths: Record<string, number> = { ESC: 1.2, TAB: 1.2, CTRL: 1.5, RET: 1.75, SHIFT: 1.8, OPT: 1.4, ALT: 1.3, "": 6.5 };
  const accents = ["TAB", "CTRL", "SHIFT", "DEL", "ALT", "OPT", "UP", "<", "v", ">"];
  const keys: Key[] = [];
  rows.forEach((row, rowIndex) => {
    let x = -1.405;
    row.forEach((label) => {
      const width = (widths[label] ?? 1) * size;
      const color = label === "ESC" || label === "RET" ? "#8c7d9c" : accents.includes(label) ? "#b9aea0" : "#e1d9c5";
      keys.push({ x: x + width / 2, z: -.355 + rowIndex * .174, width, color, label });
      x += width;
    });
  });
  ["7", "8", "4", "5", "1", "2", "0", "."].forEach((label, index) => {
    keys.push({ x: 1.16 + (index % 2) * size, z: -.30 + Math.floor(index / 2) * .202, width: size, color: "#c6bbaa", label });
  });
  return keys;
}

function createLegends(keys: Key[]) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas drawing is unavailable");
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 16px monospace";
  ctx.fillStyle = "#595651";
  keys.forEach(({ x, z, label }) => ctx.fillText(label, (x / 3.1 + .5) * 1200, (z / 1.02 + .5) * 400));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function buildWorkstation() {
  const group = new THREE.Group();
  const parts = Array.from({ length: 8 }, () => new THREE.Group());
  parts.forEach((part) => group.add(part));
  const batches = parts.map(() => new Map<THREE.Material, THREE.BufferGeometry[]>());
  let partIndex = 0;
  const plastic = (color: string) => new THREE.MeshStandardMaterial({ color, roughness: .78, metalness: .025 });
  const cream = plastic("#e3d9bf");
  const warm = plastic("#ccbea3");
  const shadow = plastic("#a89c84");
  const dark = plastic("#4b473f");
  const black = plastic("#292924");
  const recess = plastic("#6b6658");
  const activity = new THREE.MeshBasicMaterial({ color: "#a8f2a9" });
  const power = new THREE.MeshBasicMaterial({ color: "#a8ea9e" });
  const display = new THREE.MeshBasicMaterial({ map: makeDisplayTexture(), toneMapped: false });
  const scanTime = { value: 0 };
  display.onBeforeCompile = (shader) => {
    shader.uniforms.scanTime = scanTime;
    shader.fragmentShader = "uniform float scanTime;\n" + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace("#include <map_fragment>", `
      #include <map_fragment>
      float line = abs(vMapUv.y - (1.0 - fract(scanTime * .11)));
      diffuseColor.rgb += vec3(.012,.035,.020) * (1.0 - smoothstep(.0,.065,line));
      float cursor = step(.306,vMapUv.x) * step(vMapUv.x,.325) * step(.137,vMapUv.y) * step(vMapUv.y,.163);
      diffuseColor.rgb += vec3(.30,.58,.38) * cursor * step(.42,fract(scanTime*.98+.65));
    `);
  };
  const badge = new THREE.MeshBasicMaterial({ map: makeBadgeTexture() });

  function add(geometry: THREE.BufferGeometry, material: THREE.Material, pos: Position, rotation: Position = [0, 0, 0]) {
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(...pos),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
      new THREE.Vector3(1, 1, 1)
    );
    const shape = geometry.index ? geometry.toNonIndexed() : geometry;
    shape.applyMatrix4(matrix);
    if (shape !== geometry) geometry.dispose();
    const batch = batches[partIndex];
    if (!batch.has(material)) batch.set(material, []);
    batch.get(material)!.push(shape);
  }
  const box = (size: Position, p: Position, mat: THREE.Material, radius = .028) =>
    add(new RoundedBoxGeometry(...size, 2, radius), mat, p);
  const panel = (profiles: Profile[], p: Position, mat: THREE.Material) => add(shellGeometry(profiles), mat, p);
  const plate = (width: number, height: number, p: Position, material: THREE.Material) =>
    add(new THREE.PlaneGeometry(width, height), material, p);
  function cord(points: Position[], radius: number, material = dark) {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    add(new THREE.TubeGeometry(curve, Math.min(110, points.length * 6), radius, 6, false), material, [0, 0, 0]);
  }

  // Horizontal CPU, expansion bay, floppy drive and split injection-molded case.
  box([3.52, .12, 1.94], [0, .10, -.27], dark, .04);
  box([3.81, .22, 2.13], [0, .24, -.27], warm, .05);
  box([3.82, .033, 2.14], [0, .35, -.27], recess, .015);
  // The paired drawer guides nest inside the closed chassis.
  for (const z of [-.90, .36]) {
    box([3.48, .048, .11], [0, .385, z], dark, .012);
  }
  partIndex = 7;
  for (const z of [-.90, .36]) {
    box([2.82, .033, .074], [.08, .414, z], warm, .009);
  }
  partIndex = 1;
  box([3.86, .36, 2.17], [0, .535, -.27], cream, .055);
  box([1.11, .21, .043], [.91, .536, .818], shadow, .015);
  box([.95, .061, .049], [.88, .555, .835], black, .009);
  box([.22, .074, .055], [1.235, .48, .849], warm, .01);
  box([.057, .031, .018], [.43, .483, .85], activity, .008);
  for (let i = 0; i < 5; i++) box([.65, .024, .016], [-1.35, .42 + i * .047, .819], recess, .008);
  plate(.57, .105, [-.52, .548, .818], badge);
  for (let i = 0; i < 12; i++) box([.014, .16, .042], [1.933, .53, -.91 + i * .079], recess, .01);

  // The logic board normally sits inside the processor chassis.
  partIndex = 2;
  const board = plastic("#377a68");
  const solder = plastic("#bdab72");
  box([3.23, .043, 1.57], [0, .453, -.27], board, .027);
  box([.48, .12, .48], [-.74, .518, -.20], dark, .011);
  for (let i = 0; i < 7; i++) {
    box([.024, .03, .63], [-.93 + i * .061, .484, -.20], solder, .006);
    box([.62, .03, .025], [-.74, .484, -.38 + i * .061], solder, .006);
  }
  for (let i = 0; i < 4; i++) {
    box([.88, .09, .133], [.67, .516, -.72 + i * .245], dark, .016);
    for (let j = 0; j < 6; j++) box([.031, .024, .18], [.35 + j * .125, .482, -.72 + i * .245], solder, .005);
  }
  for (let i = 0; i < 3; i++) {
    box([.62, .037, .021], [-.13, .483, .09 + i * .071], solder, .005);
    add(new THREE.CylinderGeometry(.075, .075, .13, 12), warm, [-1.30, .54, -.67 + i * .30]);
  }

  // CRT cabinet, three stepped bevels and a shallow convex glass surface.
  partIndex = 3;
  box([1.65, .15, 1.17], [0, .78, -.37], shadow, .065);
  box([1.24, .29, .86], [0, .91, -.38], warm, .09);
  const center: Position = [0, 2.12, 0];
  panel([[2.08, 1.62, -1.52, .22], [2.28, 1.76, -1.48, .22], [3.08, 2.23, -.61, .16], [3.19, 2.34, .28, .15]], center, warm);
  panel([[3.184, 2.327, .267, .15], [3.184, 2.327, .313, .15]], center, recess);
  partIndex = 4;
  panel([[3.19, 2.34, .305, .16], [3.23, 2.37, .355, .15], [3.23, 2.37, .57, .15], [3.18, 2.32, .635, .15]], center, cream);
  panel([[2.81, 1.96, .638, .205], [2.76, 1.91, .657, .197], [2.64, 1.79, .671, .185]], [0, 2.19, 0], shadow);
  panel([[2.66, 1.805, .669, .18], [2.59, 1.747, .681, .165]], [0, 2.19, 0], dark);
  partIndex = 5;
  panel([[2.60, 1.75, .683, .17], [2.32, 1.57, .702, .15], [1.65, 1.11, .723, .11], [.25, .17, .733, .014]], [0, 2.19, 0], display);
  partIndex = 3;
  for (let i = 0; i < 9; i++) {
    const z = -.53 + i * .084;
    const x = 1.55 + (z + .61) * .062;
    box([.021, .59, .035], [x, 2.47, z], recess, .012);
  }
  for (let i = 0; i < 9; i++) box([1.16, .035, .019], [0, 2.38 + i * .064, -1.518], dark, .008);
  partIndex = 4;
  plate(.43, .079, [-1.11, 1.109, .637], badge);
  for (let i = 0; i < 3; i++) box([.09, .055, .022], [.78 + i * .127, 1.126, .646], warm, .014);
  box([.145, .071, .025], [1.265, 1.126, .646], shadow, .016);
  box([.055, .022, .021], [1.264, 1.129, .66], power, .008);

  // A compact mechanical keyboard with individually profiled, moving keycaps.
  const keyGroup = new THREE.Group();
  keyGroup.rotation.x = .055;
  keyGroup.position.set(-.29, .245, 1.77);
  group.add(keyGroup);
  function keyPart(size: Position, pos: Position, mat: THREE.Material, radius: number) {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(...size, 2, radius), mat);
    mesh.position.set(...pos);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    keyGroup.add(mesh);
  }
  keyPart([3.29, .14, 1.19], [0, -.107, 0], warm, .055);
  keyPart([3.33, .128, 1.2], [0, -.002, 0], cream, .053);
  keyPart([2.58, .02, .93], [-.13, .059, -.025], dark, .018);
  keyPart([.43, .02, .86], [1.252, .059, 0], dark, .014);
  const keys = createKeyboardKeys();
  const keyShape = shellGeometry([
    [1, 1, 0, .096], [.97, .98, .047, .09], [.79, .79, .085, .09], [.74, .74, .092, .09]
  ]);
  keyShape.rotateX(-Math.PI / 2);
  const caps = new THREE.InstancedMesh(keyShape, plastic("#ffffff"), keys.length);
  caps.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  caps.castShadow = true;
  caps.receiveShadow = true;
  const placement = new THREE.Object3D();
  function setKey(index: number, depression = 0) {
    const key = keys[index];
    placement.position.set(key.x, .063 - depression, key.z);
    placement.scale.set(key.width - .016, 1, .159);
    placement.updateMatrix();
    caps.setMatrixAt(index, placement.matrix);
  }
  keys.forEach((key, i) => {
    setKey(i);
    caps.setColorAt(i, new THREE.Color(key.color));
  });
  const switchPlate = new THREE.Group();
  keyGroup.add(switchPlate);
  switchPlate.add(caps);
  const legends = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 1.02), new THREE.MeshBasicMaterial({
    map: createLegends(keys), transparent: true, depthWrite: false
  }));
  legends.rotation.x = -Math.PI / 2;
  legends.position.y = .156;
  switchPlate.add(legends);

  // Wired mouse with inset buttons, a split shell and a free-form cable.
  partIndex = 6;
  box([.47, .08, .72], [1.90, .074, 1.53], shadow, .048);
  box([.50, .20, .72], [1.90, .183, 1.53], cream, .088);
  box([.37, .021, .29], [1.90, .28, 1.43], recess, .024);
  box([.17, .033, .265], [1.806, .292, 1.423], warm, .025);
  box([.17, .033, .265], [1.993, .292, 1.423], warm, .025);
  cord([[1.9, .14, 1.23], [1.98, .06, .89], [2.17, .044, .55], [2.25, .041, .10], [2.10, .07, -.32], [1.91, .19, -.45]], .023);
  const coil: Position[] = [[-1.26, .19, 1.19], [-1.29, .105, 1.11]];
  for (let i = 0; i <= 52; i++) {
    const t = i / 52;
    coil.push([-1.29 + t * .57, .097 + .047 * Math.cos(t * 8 * Math.PI), 1.04 - t * .13 + .049 * Math.sin(t * 8 * Math.PI)]);
  }
  coil.push([-.66, .13, .85], [-.65, .19, .76]);
  cord(coil, .02);

  batches.forEach((batch, index) => {
    for (const [material, geometries] of batch) {
      const merged = mergeGeometries(geometries);
      geometries.forEach((geometry) => geometry.dispose());
      if (!merged) continue;
      const mesh = new THREE.Mesh(merged, material);
      mesh.castShadow = material !== display && material !== badge;
      mesh.receiveShadow = material instanceof THREE.MeshStandardMaterial;
      parts[index].add(mesh);
    }
  });
  const shadowTexture = makeContactShadow();
  function contact(width: number, depth: number, x: number, z: number, opacity: number) {
    const material = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, opacity, depthWrite: false });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(x, .011, z);
    group.add(plane);
  }
  contact(6.4, 3.9, .10, -.23, .72);
  contact(4.6, 1.65, -.23, 1.78, .80);
  contact(.9, 1.09, 1.92, 1.54, .65);
  const [, cover, logicBoard, cabinet, bezel, glass, , drawerGuides] = parts;
  let lastKey = -1;
  return {
    group,
    explode(progress: number) {
      const travel = (start: number, end: number) => THREE.MathUtils.smootherstep(progress, start, end);

      // The intact monitor lifts off its stand position before the computer opens.
      const monitorHeight = .88 * travel(0, .27) + .47 * travel(.27, .49);
      cover.position.set(0, .89 * travel(.18, .43), -.15 * travel(.23, .43));

      // The PCB and telescoping runners stay on the same horizontal track.
      const extraction = travel(.37, .68);
      drawerGuides.position.x = .83 * extraction;
      logicBoard.position.x = 1.65 * extraction;

      // The bezel carries the glass forward, then the glass pulls clear of the bezel.
      const bezelDepth = .48 * travel(.49, .75);
      cabinet.position.set(0, monitorHeight, -.53 * travel(.54, .79));
      bezel.position.set(0, monitorHeight, bezelDepth);
      glass.position.set(0, monitorHeight, bezelDepth + .72 * travel(.67, .91));
      switchPlate.position.y = .46 * travel(.80, 1);
    },
    animate(time: number) {
      scanTime.value = time;
      activity.color.set(Math.sin(time * 5.4) + Math.sin(time * 13.4) > .6 ? "#c8f8aa" : "#718261");
      const cycle = time % 8;
      const typing = cycle > 4 && cycle < 5.5;
      const stroke = Math.floor((cycle - 4) * 7);
      const index = typing ? [18, 27, 32, 23, 29, 19, 41, 16, 33, 24, 38][stroke % 11] : -1;
      if (lastKey === index) return;
      if (lastKey >= 0) setKey(lastKey);
      if (index >= 0) setKey(index, .024);
      lastKey = index;
      caps.instanceMatrix.needsUpdate = true;
    }
  };
}
