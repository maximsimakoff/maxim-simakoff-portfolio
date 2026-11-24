"use client";

type StackGraphFallbackProps = {
  activeLabel?: string;
};

const stackNodes = [
  { x: "50%", y: "47%", label: "Core", strong: true },
  { x: "73%", y: "31%", label: "Workflow" },
  { x: "61%", y: "18%", label: "Front" },
  { x: "36%", y: "22%", label: "Back" },
  { x: "22%", y: "47%", label: "Lang" },
  { x: "34%", y: "72%", label: "Data" },
  { x: "65%", y: "73%", label: "Infra" }
];

export function HeroSceneFallback() {
  const nodes = [
    { code: "01", color: "#78a9ff", glyph: "//", label: "Infra", left: "20%", top: "38%" },
    { code: "02", color: "#7ce8dd", glyph: "DB", label: "Data", left: "24%", top: "66%" },
    { code: "03", color: "#b2a5ff", glyph: "AI", label: "AI", left: "50%", top: "78%" },
    { code: "04", color: "#ff7b62", glyph: "PX", label: "Product", left: "80%", top: "38%" },
    { code: "05", color: "#ff6fae", glyph: "+ +", label: "Growth", left: "76%", top: "66%" }
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[radial-gradient(circle_at_50%_42%,rgba(255,107,87,0.18),transparent_22%),radial-gradient(circle_at_20%_24%,rgba(120,169,255,0.08),transparent_30%),linear-gradient(180deg,#030a0f_0%,#02070b_100%)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-[-10%] bottom-[-18%] top-[42%] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,169,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(120,169,255,0.09) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "linear-gradient(to bottom, transparent, black 24%, transparent 86%)",
          transform: "perspective(560px) rotateX(66deg)",
          transformOrigin: "50% 76%"
        }}
      />

      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <ellipse
          cx="50"
          cy="63"
          fill="none"
          rx="33"
          ry="12"
          stroke="rgba(120,169,255,0.12)"
          strokeWidth="0.28"
        />
        <ellipse
          cx="50"
          cy="63"
          fill="none"
          rx="24"
          ry="8"
          stroke="rgba(255,107,87,0.14)"
          strokeWidth="0.22"
        />
        {[
          ["M50 46 C40 33 30 34 20 38", "#78a9ff"],
          ["M50 46 C38 49 30 59 24 66", "#7ce8dd"],
          ["M50 46 C50 59 50 68 50 78", "#b2a5ff"],
          ["M50 46 C61 32 71 33 80 38", "#ff7b62"],
          ["M50 46 C63 49 70 59 76 66", "#ff6fae"]
        ].map(([d, stroke], index) => (
          <path
            key={d}
            className="nexus-fallback-route"
            d={d}
            fill="none"
            stroke={stroke}
            strokeLinecap="round"
            strokeWidth="0.5"
            style={{ animationDelay: `${index * -0.65}s` }}
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-[46%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 sm:h-28 sm:w-28">
        <div className="nexus-fallback-ring absolute -inset-7 rounded-full border border-coral/25 sm:-inset-10" />
        <div className="nexus-fallback-ring-reverse absolute -inset-4 rotate-45 rounded-[42%] border border-powder/25 sm:-inset-6" />
        <div className="absolute inset-0 rotate-45 rounded-[30%] border border-coral/80 bg-coral/[0.08] shadow-[0_0_54px_rgba(255,107,87,0.48),inset_0_0_30px_rgba(255,107,87,0.16)]" />
        <div className="nexus-fallback-core absolute inset-[24%] rounded-full border border-[#ffb197]/70 bg-[#ff654b]/35 shadow-[0_0_28px_rgba(255,92,68,0.95),inset_0_0_12px_rgba(255,255,255,0.5)]" />
        <div className="absolute left-1/2 top-1/2 h-px w-[145%] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] bg-gradient-to-r from-transparent via-coral/70 to-transparent" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-coral/40 bg-black/65 px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-stone-100 backdrop-blur-md sm:text-[0.66rem]">
          <span className="mr-1.5 text-coral">NX-0</span>
          Systems nexus
        </div>
      </div>

      {nodes.map((node) => (
        <div
          key={node.label}
          className="nexus-fallback-node absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: node.left, top: node.top }}
        >
          <div
            className="mx-auto mb-1.5 w-fit whitespace-nowrap rounded border bg-black/65 px-2 py-1 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-stone-200 backdrop-blur-md sm:text-[0.62rem]"
            style={{ borderColor: `${node.color}55` }}
          >
            <span className="mr-1.5" style={{ color: node.color }}>
              {node.code}
            </span>
            {node.label}
          </div>
          <div
            className="grid h-10 w-14 place-items-center rounded-md border bg-[#071019]/85 shadow-[0_18px_38px_rgba(0,0,0,0.4)] sm:h-14 sm:w-20"
            style={{
              borderColor: `${node.color}44`,
              boxShadow: `0 18px 38px rgba(0,0,0,0.4), 0 0 24px ${node.color}18`
            }}
          >
            <span
              className="font-mono text-xs font-semibold tracking-[0.12em] sm:text-base"
              style={{ color: node.color, textShadow: `0 0 14px ${node.color}` }}
            >
              {node.glyph}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StackGraphFallback({ activeLabel }: StackGraphFallbackProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,107,87,0.08),transparent_28%,rgba(143,183,255,0.06))]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[
          "M50 47 C57 40 64 35 73 31",
          "M50 47 C54 35 57 26 61 18",
          "M50 47 C45 35 42 28 36 22",
          "M50 47 C39 47 31 47 22 47",
          "M50 47 C44 58 39 66 34 72",
          "M50 47 C57 58 61 66 65 73"
        ].map((path) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="rgba(255,107,87,0.28)"
            strokeDasharray="1.4 2.8"
            strokeLinecap="round"
            strokeWidth="0.42"
          />
        ))}
      </svg>

      {stackNodes.map((node) => (
        <div
          key={node.label}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-md ${
            node.strong
              ? "h-8 w-8 border-coral/35 bg-coral/18 shadow-[0_0_42px_rgba(255,107,87,0.3)]"
              : "h-4 w-4 border-white/16 bg-white/12 shadow-[0_0_26px_rgba(143,183,255,0.22)]"
          }`}
          style={{ left: node.x, top: node.y }}
        >
          {node.strong ? (
            <span className="absolute inset-[-1.1rem] rounded-full border border-coral/20" />
          ) : null}
        </div>
      ))}

      {activeLabel ? (
        <div className="absolute left-1/2 top-[24%] -translate-x-1/2 rounded-full border border-white/10 bg-black/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-200 backdrop-blur-md">
          {activeLabel}
        </div>
      ) : null}
    </div>
  );
}
