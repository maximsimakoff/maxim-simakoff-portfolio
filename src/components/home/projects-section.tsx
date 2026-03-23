import { DepthCard } from "@/components/depth-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { portfolioContent } from "@/content/portfolio";

export function ProjectsSection() {
  const [featuredProject, ...supportingProjects] = portfolioContent.projects;

  return (
    <section
      id="projects"
      className="section-spacing scroll-mt-28 border-t border-line pt-16 md:pt-20"
    >
      <SectionHeading
        index="02"
        label="Projects"
        title="Selected work."
      />

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <DepthCard className="group panel h-full rounded-[2rem] p-7 sm:p-10">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">{featuredProject.label}</p>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500">
                  {featuredProject.period}
                </p>
              </div>
              <div className="mt-7 border-b border-line pb-6">
                <h3 className="font-serif text-[2.45rem] text-ink sm:text-[3rem]">
                  {featuredProject.name}
                </h3>
              </div>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-7 text-stone-200 sm:text-[1.1rem] sm:leading-8">
                {featuredProject.description}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base">
                {featuredProject.detail}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {featuredProject.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </DepthCard>
        </Reveal>

        <div className="space-y-5">
          {supportingProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.05}>
              <DepthCard className="group panel h-full p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">{project.label}</p>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-500">
                    {project.period}
                  </p>
                </div>
                <h3 className="mt-4 text-[1.45rem] text-ink">{project.name}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300 sm:text-base">
                  {project.description}
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {project.detail}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </DepthCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
