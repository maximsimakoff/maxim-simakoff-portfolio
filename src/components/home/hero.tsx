import { Reveal } from "@/components/reveal";
import { HeroDepthVisual } from "@/components/home/hero-depth-visual";
import { portfolioContent } from "@/content/portfolio";

export function Hero() {
  const { hero, person } = portfolioContent;

  return (
    <section className="grid min-h-[80vh] items-center gap-10 pb-10 pt-16 lg:grid-cols-[0.96fr_1.04fr] lg:gap-14">
      <div className="space-y-6">
        <Reveal className="space-y-6">
          <div className="space-y-4">
            <p className="eyebrow">
              {person.name} / {hero.eyebrow}
            </p>
            <h1 className="max-w-5xl text-balance font-serif text-[2.95rem] leading-[0.96] text-ink sm:text-[4.05rem] lg:text-[4.7rem]">
              {hero.title}
            </h1>
            <p className="max-w-copy text-base leading-7 text-stone-300 sm:text-[1.05rem] sm:leading-8">
              {hero.description}
            </p>
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-stone-500">
            {person.statusNote}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <HeroDepthVisual />
      </Reveal>
    </section>
  );
}
