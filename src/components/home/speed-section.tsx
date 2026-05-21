import { Reveal } from "@/components/reveal";
import { portfolioContent } from "@/content/portfolio";

export function SpeedSection() {
  const { speed } = portfolioContent;
  const steps = [
    ...speed.sources.map((source) => ({
      label: source.label,
      value: source.value
    })),
    {
      label: speed.destinationFocus,
      value: speed.destinationTitle
    }
  ];

  return (
    <section className="section-spacing section-rule scroll-mt-28" aria-labelledby="speed-title">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="space-y-3">
            <p className="eyebrow">{speed.eyebrow}</p>
            <h2 id="speed-title" className="max-w-xl text-[2rem] font-semibold leading-tight text-ink sm:text-[2.55rem]">
              {speed.title}
            </h2>
            <p className="max-w-md text-sm leading-7 text-stone-400">
              {speed.statNote}
            </p>
          </div>

          <div className="panel p-4 sm:p-5">
            <div className="grid gap-3 md:grid-cols-4">
              {steps.map((step, index) => (
                <div key={`${step.label}-${index}`} className="relative rounded-lg border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-coral">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {index < steps.length - 1 ? (
                      <span className="hidden h-px flex-1 bg-gradient-to-r from-coral/45 to-transparent md:block" />
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-400">
                    {step.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
