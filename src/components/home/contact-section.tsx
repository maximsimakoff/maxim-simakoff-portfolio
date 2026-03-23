import { DepthCard } from "@/components/depth-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { portfolioContent } from "@/content/portfolio";
import { getPrivateProfile } from "@/lib/private-profile";

export function ContactSection() {
  const { contact } = portfolioContent;
  const { contactLinks } = getPrivateProfile();

  return (
    <section
      id="contact"
      className="section-spacing scroll-mt-28 border-t border-line pt-16 md:pt-20"
    >
      <SectionHeading
        index="06"
        label="Contact"
        title={contact.title}
        description={contact.description}
      />
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <Reveal>
          <div className="panel h-full rounded-[2rem] p-7 sm:p-9">
            <p className="eyebrow">Fit</p>
            <p className="mt-5 max-w-md font-serif text-[2.05rem] leading-tight text-ink sm:text-[2.7rem]">
              Best fit: product-minded engineering with real system ownership.
            </p>
          </div>
        </Reveal>

        {contactLinks.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {contactLinks.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <DepthCard className="group panel h-full p-6 sm:p-8">
                  <a
                    href={item.href}
                    className="flex min-w-0 items-center justify-between gap-4"
                  >
                    <div className="min-w-0 space-y-2">
                      <p className="eyebrow">{item.label}</p>
                      <p className="break-all text-lg leading-7 text-ink sm:break-normal sm:text-xl">
                        {item.value}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-sm text-stone-500 transition group-hover:text-stone-300">
                      ↗
                    </span>
                  </a>
                </DepthCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="panel h-full rounded-[2rem] p-7 sm:p-9">
              <p className="eyebrow">Contact</p>
              <p className="mt-5 max-w-md text-sm leading-7 text-stone-400 sm:text-base">
                Direct contact details are configured privately for deployment.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
