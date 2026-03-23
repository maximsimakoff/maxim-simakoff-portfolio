import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { portfolioContent } from "@/content/portfolio";

export function ResumeSection() {
  const { resume } = portfolioContent;

  return (
    <section
      id="resume"
      className="section-spacing scroll-mt-28 border-t border-line pt-16 md:pt-20"
    >
      <SectionHeading
        index="05"
        label="Resume"
        title="Resume."
        description={resume.description}
      />
      <Reveal>
        <div className="panel grid gap-8 rounded-[2rem] p-6 sm:p-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div className="space-y-5">
            <p className="max-w-2xl text-[1.02rem] leading-7 text-stone-200 sm:text-[1.08rem] sm:leading-8">
              {resume.intro}
            </p>
            <div className="grid gap-3">
              {resume.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-white/10 bg-black/15 p-4 text-sm leading-7 text-stone-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link href="/resume" className="button-primary w-full lg:w-auto">
              Open resume
            </Link>
            <p className="max-w-xs text-sm leading-7 text-stone-500 lg:text-right">
              The resume page keeps the same recent-work emphasis in a more formal format.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
