import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { portfolioContent } from "@/content/portfolio";
import { getPrivateProfile } from "@/lib/private-profile";

export const metadata: Metadata = {
  title: "Resume"
};

export default function ResumePage() {
  const privateProfile = getPrivateProfile();
  const { person, resume, featuredExperience, experience, projects, skills } =
    portfolioContent;
  const sidebarLinks = [
    privateProfile.email,
    privateProfile.linkedin,
    privateProfile.github
  ].filter((item): item is NonNullable<typeof item> => item !== null);
  const hasSidebar = Boolean(privateProfile.location || sidebarLinks.length > 0);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-20 pt-8 sm:px-8 lg:px-10">
        <Reveal className="panel mt-8 p-5 sm:p-6">
          <div className={`grid gap-7 ${hasSidebar ? "lg:grid-cols-[1.2fr_0.8fr]" : ""}`}>
            <div className="space-y-5">
              <p className="eyebrow">Resume</p>
              <h1 className="text-[2.55rem] font-semibold leading-tight text-ink sm:text-[3.4rem]">
                {person.name}
              </h1>
              {resume.intro ? (
                <p className="max-w-2xl text-[1.02rem] leading-7 text-stone-300 sm:text-[1.08rem] sm:leading-8">
                  {resume.intro}
                </p>
              ) : null}
            </div>
            {hasSidebar ? (
              <div className="space-y-3 border-t border-line pt-6 text-sm leading-7 text-stone-300 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                {privateProfile.location ? <p>{privateProfile.location}</p> : null}
                {sidebarLinks.map((link) => (
                  <a key={link.label} href={link.href} className="block hover:text-ink">
                    {link.value}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </Reveal>

        {resume.highlights.length > 0 ? (
          <section className="section-spacing section-rule scroll-mt-28">
            <SectionHeading
              index="01"
              label="Highlights"
              title="Quick overview."
              description={resume.description}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {resume.highlights.map((item, index) => (
                <Reveal
                  key={item}
                  delay={index * 0.05}
                  className="panel p-5 text-sm leading-7 text-stone-300"
                >
                  {item}
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        <section id="experience" className="section-spacing section-rule scroll-mt-28">
          <SectionHeading
            index={resume.highlights.length > 0 ? "02" : "01"}
            label="Featured experience"
            title={`${featuredExperience.company} / ${featuredExperience.role}`}
            description={featuredExperience.spotlight}
          />
          <Reveal>
            <article className="panel p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {featuredExperience.meta.map((item) => (
                  <span
                    key={item}
                    className="tag"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-6 max-w-4xl text-sm leading-8 text-stone-300 sm:text-base">
                {featuredExperience.summary}
              </p>

              <ul className="mt-6 grid gap-3">
                {featuredExperience.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-7 text-stone-400">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-stone-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {featuredExperience.pillars.map((pillar) => (
                  <div
                    key={pillar.label}
                    className="rounded-lg border border-white/10 bg-black/15 p-4"
                  >
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-stone-500">
                      {pillar.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-stone-300">{pillar.value}</p>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </section>

        <section className="section-spacing section-rule scroll-mt-28">
          <SectionHeading
            index={resume.highlights.length > 0 ? "03" : "02"}
            label="Additional experience"
            title="Earlier experience"
            description={portfolioContent.experienceNotice}
          />
          <div className="space-y-5">
            {experience.map((item, index) => (
              <Reveal key={item.company + item.role} delay={index * 0.06}>
                <article className="panel p-5 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    {item.meta.map((meta) => (
                      <span
                        key={meta}
                        className="tag"
                      >
                        {meta}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 border-b border-line pb-5">
                    <p className="eyebrow">{item.company}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-ink">{item.role}</h3>
                  </div>
                  <p className="mt-5 max-w-3xl text-sm leading-7 text-stone-300">
                    {item.summary}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-400">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 rounded-full bg-stone-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="section-spacing section-rule scroll-mt-28">
          <SectionHeading
            index={resume.highlights.length > 0 ? "04" : "03"}
            label="Projects"
            title="Selected work"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal
                key={project.name}
                delay={index * 0.06}
                className="panel p-5 sm:p-6"
              >
                <p className="eyebrow">{project.label}</p>
                <h3 className="mt-2 text-2xl font-semibold text-ink">{project.name}</h3>
                <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-coral">
                  {project.period}
                </p>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  {project.description}
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {project.detail}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="stack" className="section-spacing section-rule scroll-mt-28">
          <SectionHeading
            index={resume.highlights.length > 0 ? "05" : "04"}
            label="Skills"
            title="Tools and working style"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {skills.map((group, index) => (
              <Reveal
                key={group.label}
                delay={index * 0.05}
                className="panel p-5 sm:p-6"
              >
                <h3 className="text-xl font-semibold text-ink">{group.label}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  {group.items.join(" / ")}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="section-spacing scroll-mt-28">
          <Reveal>
            <div className="flex flex-wrap gap-4 border-t border-line pt-10">
              <Link href="/" className="button-secondary">
                Back to portfolio
              </Link>
              {privateProfile.email ? (
                <a href={privateProfile.email.href} className="button-primary">
                  Contact
                </a>
              ) : null}
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
