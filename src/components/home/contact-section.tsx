import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { portfolioContent } from "@/content/portfolio";
import { getPrivateProfile } from "@/lib/private-profile";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M5 3.5h7.5V11M12.25 3.75 3.5 12.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ContactSection() {
  const { contact } = portfolioContent;
  const { contactLinks } = getPrivateProfile();

  return (
    <section
      id="contact"
      className="section-spacing section-rule scroll-mt-28"
    >
      <SectionHeading
        index="05"
        label="Contact"
        title={contact.title}
        description={contact.description}
      />
      <Reveal>
        <div className="panel grid gap-6 p-5 sm:p-6 lg:grid-cols-[0.62fr_1fr] lg:items-end">
          <div>
            <p className="max-w-xl text-[1.6rem] font-semibold leading-tight text-ink sm:text-[2rem]">
              Product-minded engineering with real system ownership.
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-stone-400">
              Best fit: teams building internal platforms, AI workflow tools, or revenue systems that need someone who can ship across the stack.
            </p>
          </div>

          {contactLinks.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex min-w-0 items-center justify-between gap-4 rounded-lg border border-white/10 bg-black/20 p-4 transition hover:border-coral/40 hover:bg-coral/10"
                >
                  <div className="min-w-0">
                    <p className="eyebrow">{item.label}</p>
                    <p className="mt-2 break-all text-base font-medium leading-6 text-ink sm:break-normal">
                      {item.value}
                    </p>
                  </div>
                  <span className="shrink-0 text-stone-500 transition group-hover:text-coral">
                    <ArrowIcon />
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="eyebrow">Contact</p>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Direct contact details are configured privately for deployment.
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
