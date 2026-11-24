import { CanvasTexture, SRGBColorSpace } from "three";

function makeTexture(width: number, height: number, paint: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas drawing is unavailable");
  paint(ctx);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

// Draw the phosphor characters directly so the computer never needs a font file.
const glyphs = [
  "110001100111110", "111011101100010", "111111101100000", "110101100111110",
  "110001100000011", "110001101000011", "110001100111110"
];

export function makeDisplayTexture() {
  return makeTexture(640, 464, (ctx) => {
    const glow = ctx.createRadialGradient(278, 178, 20, 320, 226, 366);
    glow.addColorStop(0, "#18332c");
    glow.addColorStop(0.72, "#132722");
    glow.addColorStop(1, "#0a1414");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 640, 464);

    ctx.fillStyle = "#93ecb1";
    ctx.shadowColor = "#60efa4";
    ctx.shadowBlur = 8;
    const pixel = 20;
    glyphs.forEach((row, y) => [...row].forEach((occupied, x) => {
      if (occupied === "1") ctx.fillRect(170 + x * pixel, 138 + y * pixel, pixel, pixel);
    }));
    ctx.shadowBlur = 0;
    ctx.font = "600 17px monospace";
    ctx.fillStyle = "#81bc98";
    ctx.fillText("M/S PERSONAL SYSTEM", 40, 56);
    ctx.textAlign = "right";
    ctx.fillText("64K", 600, 56);
    ctx.textAlign = "left";
    ctx.fillStyle = "#577e67";
    ctx.fillRect(40, 73, 560, 2);
    ctx.fillRect(40, 367, 560, 2);
    ctx.fillStyle = "#94d7a8";
    ctx.fillText("> SYSTEM READY", 40, 403);
    ctx.fillStyle = "rgba(4, 18, 15, .20)";
    for (let y = 0; y < 464; y += 4) ctx.fillRect(0, y, 640, 1);
    const reflection = ctx.createLinearGradient(0, 0, 200, 322);
    reflection.addColorStop(0, "rgba(216, 232, 216, .1)");
    reflection.addColorStop(1, "rgba(216, 232, 216, 0)");
    ctx.fillStyle = reflection;
    ctx.fillRect(0, 0, 640, 464);
  });
}

export function makeBadgeTexture() {
  return makeTexture(384, 70, (ctx) => {
    ctx.fillStyle = "#cdc9bc";
    ctx.fillRect(0, 0, 384, 70);
    ["#7564ab", "#ab8bc1", "#ef947f"].forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(14 + i * 14, 14, 10, 42);
    });
    ctx.font = "bold 34px monospace";
    ctx.fillStyle = "#393732";
    ctx.fillText("M/S SYSTEMS", 76, 47);
  });
}

export function makeContactShadow() {
  return makeTexture(128, 128, (ctx) => {
    const gradient = ctx.createRadialGradient(64, 64, 6, 64, 64, 64);
    gradient.addColorStop(0, "rgba(55, 40, 69, .6)");
    gradient.addColorStop(.44, "rgba(55, 40, 69, .36)");
    gradient.addColorStop(.78, "rgba(55, 40, 69, .12)");
    gradient.addColorStop(1, "rgba(55, 40, 69, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  });
}
