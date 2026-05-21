import Link from "next/link";

import { HeroDepthVisual } from "@/components/home/hero-depth-visual";
import { TerminalSidebarNav } from "@/components/terminal-scroll-button";
import { portfolioContent } from "@/content/portfolio";
import { getPrivateProfile, type PrivateLink } from "@/lib/private-profile";

type IconName = "mail" | "github" | "linkedin" | "pin";

type SidebarContact = {
  href?: string;
  icon: IconName;
  label: string;
};

function ContactIcon({ name }: { name: IconName }) {
  const shared = {
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7
  };

  if (name === "github") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 19.2c-4.2 1.2-4.2-2-5.9-2.4m11.8 4.8v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.8-1.4 5.8-6.2a4.8 4.8 0 0 0-1.3-3.4 4.5 4.5 0 0 0-.1-3.4s-1-.3-3.5 1.3a12.1 12.1 0 0 0-6.4 0C6.4 2.9 5.4 3.2 5.4 3.2a4.5 4.5 0 0 0-.1 3.4A4.8 4.8 0 0 0 4 10c0 4.8 3 5.9 5.8 6.2-.5.5-.6 1.1-.6 2v3.4"
          {...shared}
        />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M7.2 10.2v8.4M7.2 6.7v.1M11 18.6v-8.4m0 3.6c.5-2.2 4.8-2.8 4.8 1v3.8" {...shared} />
        <path d="M4.8 3.8h14.4a1 1 0 0 1 1 1v14.4a1 1 0 0 1-1 1H4.8a1 1 0 0 1-1-1V4.8a1 1 0 0 1 1-1Z" {...shared} />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M12 21s6.5-5.9 6.5-11.1A6.5 6.5 0 0 0 5.5 9.9C5.5 15.1 12 21 12 21Z" {...shared} />
        <path d="M12 12.1a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" {...shared} />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path d="M4.5 6.8h15v10.4h-15V6.8Z" {...shared} />
      <path d="m5 7.3 7 5.2 7-5.2" {...shared} />
    </svg>
  );
}

function ArrowMark() {
  return <span className="font-mono text-coral transition group-hover:translate-x-1">{">"}</span>;
}

function ContactRow({ item }: { item: SidebarContact }) {
  const content = (
    <>
      <span className="text-stone-300">
        <ContactIcon name={item.icon} />
      </span>
      <span className="min-w-0 flex-1 break-words pr-2 leading-6">{item.label}</span>
      <ArrowMark />
    </>
  );

  if (!item.href) {
    return (
      <div className="group flex items-center gap-4 py-3 font-mono text-sm text-stone-300">
        {content}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      className="group flex items-center gap-4 py-3 font-mono text-sm text-stone-300 transition hover:text-ink"
    >
      {content}
    </a>
  );
}

function contactLabel(link: PrivateLink | null, fallback: string) {
  return link?.value || fallback;
}

function Sidebar() {
  const privateProfile = getPrivateProfile();
  const contacts: SidebarContact[] = [
    {
      href: privateProfile.email?.href,
      icon: "mail",
      label: `const email = '${contactLabel(privateProfile.email, "maximsimakoff@gmail.com")}'`
    },
    {
      href: privateProfile.github?.href,
      icon: "github",
      label: `const github = '${contactLabel(privateProfile.github, "github.com/maximsimakoff")}'`
    },
    {
      href: privateProfile.linkedin?.href,
      icon: "linkedin",
      label: `const linkedin = '${contactLabel(privateProfile.linkedin, "linkedin.com/in/maxim-simakoff")}'`
    },
    {
      icon: "pin",
      label: `const location = '${privateProfile.location || "Madrid, Spain (CET)"}'`
    }
  ];
  const nav = [
    { index: "01", label: "Projects", targetId: "projects" },
    { index: "02", label: "Experience", targetId: "experience" },
    { index: "03", label: "Selected systems", targetId: "systems" },
    { index: "04", label: "Resume", targetId: "resume" },
    { index: "05", label: "Contact", targetId: "contact" }
  ];

  return (
    <aside className="terminal-sidebar flex min-h-screen flex-col border-b border-terminal-line px-6 py-8 lg:sticky lg:top-0 lg:h-[100dvh] lg:max-h-[100dvh] lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:border-b-0 lg:border-r lg:px-10">
      <div className="font-mono text-sm text-ink">
        <span className="text-coral">{">"}</span> engineer.system()
      </div>

      <div className="mt-14">
        <h1 className="text-[clamp(4.8rem,12vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-ink lg:text-[5.4rem]">
          Maxim
          <span className="block">Simakoff</span>
        </h1>
        <div className="mt-8 h-1 w-9 bg-coral" />
        <p className="mt-7 max-w-[23rem] font-mono text-2xl leading-[1.45] text-ink">
          Revenue systems,
          <span className="block text-coral">AI workflows,</span>
          and product engineering.
        </p>
      </div>

      <div className="mt-8 divide-y divide-terminal-line">
        {contacts.map((item) => (
          <ContactRow key={item.icon} item={item} />
        ))}
      </div>

      <nav className="mt-7 border-y border-terminal-line py-5">
        <TerminalSidebarNav items={nav} />
      </nav>

      <div className="mt-auto border-t border-terminal-line pt-5 font-mono text-sm text-stone-400">
        <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.55)]" />
        Available for full-time roles
      </div>
    </aside>
  );
}

function SectionTitle({
  id,
  title,
  action
}: {
  id: string;
  title: string;
  action?: string;
}) {
  return (
    <div id={id} className="flex scroll-mt-10 items-center justify-between gap-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <h2 className="shrink-0 font-mono text-xl uppercase tracking-tight text-ink">
          <span className="text-coral">{"//"}</span> {title}
        </h2>
        <span className="h-px min-w-8 flex-1 bg-terminal-line" />
      </div>
      {action ? (
        <a href={`#${id}`} className="hidden font-mono text-sm text-coral sm:block">
          {action} {"->"}
        </a>
      ) : null}
    </div>
  );
}

function ProjectIcon({ index }: { index: number }) {
  const colors = ["text-coral", "text-rose", "text-powder", "text-sky-400"];
  const color = colors[index % colors.length];

  return (
    <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-terminal-line bg-white/[0.025] ${color}`}>
      <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24" fill="none">
        {index === 0 ? (
          <path d="m13 2-8 12h6l-1 8 9-13h-6l0-7Z" fill="currentColor" />
        ) : index === 1 ? (
          <path d="M12 3v18M6.6 6.6l10.8 10.8M3 12h18M6.6 17.4 17.4 6.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        ) : (
          <>
            <path d="M5 19V9M12 19V5M19 19v-7" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            <path d="M4 19.5h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
          </>
        )}
      </svg>
    </div>
  );
}

function Projects() {
  return (
    <section className="terminal-section">
      <SectionTitle id="projects" title="Projects" action="view all" />
      <div className="mt-7 divide-y divide-terminal-line">
        {portfolioContent.projects.slice(0, 4).map((project, index) => (
          <article
            key={project.name}
            className="group grid gap-4 py-4 transition hover:bg-white/[0.018] sm:grid-cols-[1fr_auto] sm:items-center"
          >
            <div className="flex min-w-0 gap-5">
              <ProjectIcon index={index} />
              <div className="min-w-0">
                <h3 className="font-mono text-xl text-ink">{project.name}</h3>
                <p className="mt-1 max-w-[46rem] text-sm leading-6 text-stone-400">
                  {project.description}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:max-w-[28rem] sm:justify-end">
              {project.tags.slice(0, 6).map((tag) => (
                <span key={tag} className="terminal-tag">
                  {tag}
                </span>
              ))}
              <span className="ml-2 self-center font-mono text-coral transition group-hover:translate-x-1">
                {">"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const { featuredExperience, experience } = portfolioContent;
  const allExperience = [
    {
      company: featuredExperience.company,
      role: featuredExperience.role,
      summary: featuredExperience.summary,
      tags: featuredExperience.tags
    },
    ...experience
  ];

  return (
    <section className="terminal-section">
      <SectionTitle id="experience" title="Experience" action="view all" />
      <div className="mt-7 divide-y divide-terminal-line">
        {allExperience.map((item) => (
          <article
            key={`${item.company}-${item.role}`}
            className="grid gap-4 py-5 md:grid-cols-[0.34fr_1fr_auto] md:items-start"
          >
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-coral">
                {item.company}
              </p>
              <h3 className="mt-2 font-mono text-lg text-ink">{item.role}</h3>
            </div>
            <p className="max-w-[45rem] text-sm leading-7 text-stone-400">
              {item.summary}
            </p>
            <div className="flex flex-wrap gap-2 md:max-w-[18rem] md:justify-end">
              {item.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="terminal-tag">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SelectedSystems() {
  return (
    <section className="terminal-section">
      <SectionTitle id="systems" title="Selected systems" />
      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {portfolioContent.stackMap.clusters.slice(0, 6).map((cluster) => (
          <article
            key={cluster.id}
            className="rounded-lg border border-terminal-line bg-white/[0.018] p-5"
          >
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-coral">
              {cluster.label}
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-400">
              {cluster.detail}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cluster.items.slice(0, 6).map((item) => (
                <span key={item} className="terminal-tag">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResumeBlock() {
  return (
    <section className="terminal-section">
      <SectionTitle id="resume" title="Resume" />
      <div className="mt-7 flex flex-col gap-5 rounded-lg border border-terminal-line bg-white/[0.018] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-mono text-2xl text-ink">Full resume and background</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-400">
            A compact version with experience, projects, skills, and contact details.
          </p>
        </div>
        <Link href="/resume" className="terminal-button">
          open resume {"->"}
        </Link>
      </div>
    </section>
  );
}

function ContactBlock() {
  const privateProfile = getPrivateProfile();
  const links = privateProfile.contactLinks;

  return (
    <section className="terminal-section">
      <SectionTitle id="contact" title="Contact" />
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {links.length > 0 ? (
          links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group rounded-lg border border-terminal-line bg-white/[0.018] p-5 font-mono text-stone-300 transition hover:border-coral/40 hover:text-ink"
            >
              <span className="block text-sm uppercase tracking-[0.18em] text-coral">
                {link.label}
              </span>
              <span className="mt-3 flex items-center justify-between gap-4">
                <span className="min-w-0 truncate">{link.value}</span>
                <ArrowMark />
              </span>
            </a>
          ))
        ) : (
          <div className="rounded-lg border border-terminal-line bg-white/[0.018] p-5 text-sm leading-7 text-stone-400">
            Direct contact details are configured privately for deployment.
          </div>
        )}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="terminal-page min-h-screen lg:grid lg:grid-cols-[29rem_minmax(0,1fr)]">
      <Sidebar />
      <main className="min-w-0">
        <section className="border-b border-terminal-line px-6 py-8 sm:px-10">
          <div className="mb-5 flex items-center gap-3">
            <h2 className="shrink-0 font-mono text-xl uppercase tracking-tight text-ink">
              <span className="text-coral">{"// LIVE"}</span> operating map
            </h2>
            <span className="h-px flex-1 bg-terminal-line" />
            <span className="hidden items-center gap-2 font-mono text-sm text-emerald-400 sm:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.55)]" />
              SYS: ONLINE
            </span>
          </div>
          <HeroDepthVisual />
        </section>

        <Projects />
        <Experience />
        <SelectedSystems />
        <ResumeBlock />
        <ContactBlock />
      </main>
    </div>
  );
}
