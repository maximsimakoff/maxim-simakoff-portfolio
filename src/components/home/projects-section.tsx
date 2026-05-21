import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { portfolioContent } from "@/content/portfolio";

export function ProjectsSection() {
  const [featuredProject, ...supportingProjects] = portfolioContent.projects;

  return (
    <section
      id="projects"
      className="section-spacing section-rule scroll-mt-28"
    >
      <SectionHeading index="01" label="Projects" title="Selected systems" />

      <div className="grid gap-4">
        <Reveal>
          <article className="panel p-5 sm:p-6">
            <div className="grid gap-7 lg:grid-cols-[0.38fr_1fr]">
              <div>
                <p className="eyebrow">{featuredProject.label}</p>
                <h3 className="mt-3 text-[2rem] font-semibold leading-tight text-ink sm:text-[2.7rem]">
                  {featuredProject.name}
                </h3>
                <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-coral">
                  {featuredProject.period}
                </p>
              </div>

              <div className="grid gap-5 xl:grid-cols-[1fr_0.72fr]">
                <p className="text-base leading-8 text-stone-200 sm:text-lg">
                  {featuredProject.description}
                </p>
                <div>
                  <p className="text-sm leading-7 text-stone-400">
                    {featuredProject.detail}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="grid gap-3">
          {supportingProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.04}>
              <article className="group grid gap-4 rounded-lg border border-white/10 bg-white/[0.025] p-4 transition hover:border-coral/35 hover:bg-white/[0.04] md:grid-cols-[0.36fr_1fr_0.3fr] md:items-start">
                <div>
                  <p className="eyebrow">{project.label}</p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">
                    {project.name}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-stone-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
