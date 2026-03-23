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
        <div className="panel max-w-[56rem] rounded-[1.9rem] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-[1.02rem] leading-7 text-stone-200 sm:text-[1.08rem] sm:leading-8">
              {resume.intro}
            </p>
            <div className="flex lg:justify-end">
              <Link href="/resume" className="button-primary w-full sm:w-auto">
                Open resume
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
