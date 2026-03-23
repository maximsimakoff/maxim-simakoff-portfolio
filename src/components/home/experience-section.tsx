import { DepthCard } from "@/components/depth-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { portfolioContent } from "@/content/portfolio";

export function ExperienceSection() {
  const { featuredExperience, experience, experienceNotice } = portfolioContent;

  return (
    <section
      id="experience"
      className="section-spacing scroll-mt-28 border-t border-line pt-16 md:pt-20"
    >
      <SectionHeading
        index="01"
        label="Experience"
        title="Recent technical work."
        description={experienceNotice}
      />

      <Reveal>
        <DepthCard className="group panel rounded-[2rem]">
          <article className="grid xl:grid-cols-[1.08fr_0.92fr]">
            <div className="min-w-0 p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-300">
                  featured
                </span>
                {featuredExperience.meta.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 space-y-4">
                <p className="eyebrow">{featuredExperience.company}</p>
                <h3 className="max-w-2xl font-serif text-[2.4rem] leading-tight text-ink sm:text-[3.2rem]">
                  {featuredExperience.role}
                </h3>
                <p className="max-w-3xl text-[1.02rem] leading-7 text-stone-200 sm:text-[1.1rem] sm:leading-8">
                  {featuredExperience.spotlight}
                </p>
                <p className="max-w-2xl text-sm leading-7 text-stone-400 sm:text-base">
                  {featuredExperience.summary}
                </p>
              </div>

              <ul className="mt-7 grid gap-3">
                {featuredExperience.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-7 text-stone-300">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-stone-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-2">
                {featuredExperience.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.02] p-7 sm:p-10 xl:border-l xl:border-t-0">
              <div className="rounded-[1.45rem] border border-white/10 bg-black/25 p-5">
                <div className="flex items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500">
                  <span>Focus areas</span>
                  <span>current</span>
                </div>

                <div className="mt-5 space-y-5">
                  {featuredExperience.pillars.map((pillar) => (
                    <div
                      key={pillar.label}
                      className="flex items-start justify-between gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
                    >
                      <p className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500">
                        {pillar.label}
                      </p>
                      <p className="min-w-0 text-right text-sm leading-6 text-stone-300">
                        {pillar.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </DepthCard>
      </Reveal>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="eyebrow">Earlier experience</p>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-600">
            secondary
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {experience.map((item, index) => (
            <Reveal key={`${item.company}-${item.role}`} delay={index * 0.05}>
              <DepthCard className="group panel h-full p-5 opacity-85 sm:p-6">
                <div className="flex h-full flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {item.meta.map((meta) => (
                      <span
                        key={meta}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500"
                      >
                        {meta}
                      </span>
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow">{item.company}</p>
                    <h4 className="mt-2 text-xl text-ink">{item.role}</h4>
                    <p className="mt-3 text-sm leading-7 text-stone-400">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </DepthCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
