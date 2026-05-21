import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { portfolioContent } from "@/content/portfolio";

export function ExperienceSection() {
  const { featuredExperience, experience, experienceNotice } = portfolioContent;

  return (
    <section
      id="experience"
      className="section-spacing section-rule scroll-mt-28"
    >
      <SectionHeading
        index="02"
        label="Experience"
        title="Recent technical work"
        description={experienceNotice}
      />

      <Reveal>
        <article className="panel p-5 sm:p-6">
          <div className="grid gap-7 lg:grid-cols-[0.42fr_1fr]">
            <div className="space-y-4">
              <div>
                <p className="eyebrow">{featuredExperience.company}</p>
                <h3 className="mt-3 text-[1.7rem] font-semibold leading-tight text-ink sm:text-[2.15rem]">
                  {featuredExperience.role}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {featuredExperience.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_0.78fr]">
              <div>
                <p className="max-w-3xl text-lg leading-8 text-stone-200">
                  {featuredExperience.spotlight}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-400 sm:text-base">
                  {featuredExperience.summary}
                </p>
              </div>

              <ul className="space-y-3">
                {featuredExperience.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-6 text-stone-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </Reveal>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {experience.map((item, index) => (
          <Reveal key={`${item.company}-${item.role}`} delay={index * 0.04}>
            <article className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">{item.company}</p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">
                    {item.role}
                  </h3>
                </div>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-stone-500">
                  {item.meta[0]}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                {item.summary}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
