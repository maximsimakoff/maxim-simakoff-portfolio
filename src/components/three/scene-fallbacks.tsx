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
    { label: "Infra", left: "25%", top: "28%", icon: "▭" },
    { label: "Data", left: "24%", top: "58%", icon: "◖" },
    { label: "AI", left: "50%", top: "74%", icon: "✣" },
    { label: "Product", left: "75%", top: "28%", icon: "◇" },
    { label: "Growth", left: "76%", top: "58%", icon: "↗" }
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[radial-gradient(circle_at_50%_40%,rgba(255,107,87,0.14),transparent_28%),linear-gradient(180deg,rgba(8,20,30,0.9),rgba(2,7,11,0.98))]">
      <div
        aria-hidden="true"
        className="absolute inset-x-[8%] bottom-[12%] top-[16%] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(174,197,221,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(174,197,221,0.11) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          transform: "perspective(720px) rotateX(62deg)",
          transformOrigin: "50% 62%"
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {[
          ["M50 45 C41 36 32 30 25 32", "rgba(143,183,255,0.7)"],
          ["M50 45 C39 49 29 55 24 59", "rgba(255,141,104,0.75)"],
          ["M50 45 C50 56 50 66 50 74", "rgba(255,107,87,0.78)"],
          ["M50 45 C60 36 68 30 75 32", "rgba(217,95,141,0.75)"],
          ["M50 45 C61 50 70 55 76 59", "rgba(255,107,87,0.72)"]
        ].map(([d, stroke]) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke={stroke}
            strokeLinecap="round"
            strokeWidth="0.55"
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-[42%] h-[5.6rem] w-[5.6rem] -translate-x-1/2 -translate-y-1/2 rounded-md border border-coral bg-coral/10 shadow-[0_0_42px_rgba(255,107,87,0.45),inset_0_0_28px_rgba(255,107,87,0.16)]">
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 rounded border border-coral/60 bg-black/60 px-2 py-1 font-mono text-sm text-coral">
          CORE
        </div>
        <div className="absolute inset-3 border border-coral/25" />
      </div>

      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: node.left, top: node.top }}
        >
          <div className="mx-auto mb-2 w-fit rounded border border-white/20 bg-black/55 px-2 py-1 font-mono text-sm text-stone-200">
            {node.label}
          </div>
          <div className="grid h-16 w-24 place-items-center rounded-lg border border-white/10 bg-[#111923]/80 shadow-[0_22px_44px_rgba(0,0,0,0.35)]">
            <span className="font-mono text-3xl text-powder drop-shadow-[0_0_14px_rgba(143,183,255,0.7)]">
              {node.icon}
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
