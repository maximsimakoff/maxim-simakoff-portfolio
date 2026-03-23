import Link from "next/link";

import { ContactSection } from "@/components/home/contact-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { Hero } from "@/components/home/hero";
import { ProjectsSection } from "@/components/home/projects-section";
import { ResumeSection } from "@/components/home/resume-section";
import { SpeedSection } from "@/components/home/speed-section";
import { StackMapSection } from "@/components/home/stack-map-section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { portfolioContent } from "@/content/portfolio";

export default function HomePage() {
  const { about, person } = portfolioContent;

  return (
    <div className="relative overflow-hidden">
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader />
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-16 pt-6 sm:px-8 lg:px-12">
        <Hero />
        <SpeedSection />
        <ExperienceSection />
        <ProjectsSection />
        <StackMapSection />

        <section
          id="about"
          className="section-spacing scroll-mt-28 border-t border-line pt-16 md:pt-20"
        >
          <SectionHeading
            index="04"
            label="About"
            title={about.title}
            description={about.description}
          />
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal>
              <div className="panel rounded-[2rem] p-6 sm:p-8">
                <p className="max-w-2xl font-serif text-[2.05rem] leading-tight text-ink sm:text-[2.7rem]">
                  {person.snapshot}
                </p>
                <div className="mt-5 space-y-4">
                  {about.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="max-w-copy text-sm leading-7 text-stone-400 sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {about.principles.map((principle, index) => (
                <Reveal key={principle.label} delay={index * 0.05}>
                  <div className="panel h-full p-5">
                    <p className="eyebrow">{principle.label}</p>
                    <p className="mt-3 text-sm leading-7 text-stone-300">
                      {principle.value}
                    </p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.12} className="sm:col-span-2">
                <div className="panel rounded-[1.6rem] p-5">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {about.facts.map((fact) => (
                      <div key={fact.label} className="space-y-1">
                        <dt className="eyebrow">{fact.label}</dt>
                        <dd className="text-sm leading-7 text-stone-300">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <ResumeSection />
        <ContactSection />

        <Reveal className="section-spacing pt-8">
          <div className="panel flex flex-col gap-8 rounded-[2rem] p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="eyebrow">Resume</p>
              <h2 className="max-w-3xl font-serif text-[2rem] leading-tight text-ink sm:text-[2.45rem]">
                Want the full picture? Open the resume.
              </h2>
            </div>
            <Link href="/resume" className="button-secondary whitespace-nowrap">
              Open resume
            </Link>
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
