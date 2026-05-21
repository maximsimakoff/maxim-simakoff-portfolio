import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { HeroDepthVisual } from "@/components/home/hero-depth-visual";
import { portfolioContent } from "@/content/portfolio";

export function Hero() {
  const { hero, person } = portfolioContent;

  return (
    <section className="grid min-h-[calc(100vh-5.25rem)] items-center gap-8 pb-10 pt-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 lg:pt-14">
      <Reveal className="lg:sticky lg:top-28 lg:self-start">
        <div className="max-w-[32rem] space-y-8">
          <div className="space-y-5">
            <h1 className="max-w-full text-[clamp(3.05rem,16vw,6.7rem)] font-semibold leading-[0.92] text-ink sm:text-[clamp(3.25rem,9vw,6.7rem)]">
              {person.name.split(" ").map((word) => (
                <span key={word} className="block">
                  {word}
                </span>
              ))}
            </h1>
            <p className="max-w-[25rem] text-xl leading-8 text-stone-300 sm:text-2xl sm:leading-9">
              {person.role}
            </p>
          </div>

          <div className="space-y-5 border-l border-coral/45 pl-5">
            <h2 className="max-w-[20rem] text-balance text-[1.38rem] font-semibold leading-tight text-ink sm:max-w-[24rem] sm:text-[1.9rem]">
              {hero.title}
            </h2>
            <p className="max-w-[21rem] text-sm leading-7 text-stone-400 sm:max-w-[29rem] sm:text-base">
              {hero.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="button-primary">
              View projects
            </a>
            <Link href="/resume" className="button-secondary">
              Open resume
            </Link>
          </div>

          <div className="grid max-w-[30rem] gap-3 sm:grid-cols-3">
            {["Full-stack", "AI workflows", "Internal systems"].map((item) => (
              <div
                key={item}
                className="border-t border-white/10 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-stone-500"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="max-w-[21rem] text-sm leading-6 text-stone-500 sm:max-w-[28rem]">
            {person.statusNote}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="space-y-4">
          <HeroDepthVisual />
          <div className="grid gap-3 sm:grid-cols-3">
            {portfolioContent.speed.sources.map((source) => (
              <div
                key={source.label}
                className="rounded-lg border border-white/10 bg-white/[0.025] p-4"
              >
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-coral">
                  {source.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  {source.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
