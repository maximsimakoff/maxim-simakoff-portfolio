import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioHeader } from "@/components/portfolio-header";
import { Icon, PixelMark } from "@/components/portfolio-icon";
import { StructuredData } from "@/components/structured-data";
import { WorkGallery } from "@/components/work-gallery";
import { Workstation } from "@/components/workstation/workstation";
import { careerRoles, cloudPlatforms, education, profileLinks, toolGroups } from "@/content/career";
import { getPrivateProfile } from "@/lib/private-profile";
import { getSharingMetadata, siteOrigin } from "@/lib/sharing-metadata";

const title = "Maxim Simakoff | Engineering Portfolio";
const description = "Explore Maxim Simakoff’s engineering portfolio, including AI research tools for investment teams, investor dashboards, and adaptive SAT preparation software.";
const homepage = `${siteOrigin}/`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  ...getSharingMetadata("/", title, description)
};

export default function Home() {
  const contact = getPrivateProfile();
  const linkedin = contact.linkedin?.href || profileLinks.linkedin;
  const github = contact.github?.href || profileLinks.github;
  const currentRoles = careerRoles.filter(({ current }) => current);

  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${homepage}#website`,
            name: "Maxim Simakoff",
            url: homepage
          },
          {
            "@type": "ProfilePage",
            "@id": `${homepage}#profile`,
            url: homepage,
            isPartOf: { "@id": `${homepage}#website` },
            mainEntity: {
              "@type": "Person",
              "@id": `${homepage}#person`,
              name: "Maxim Simakoff",
              url: homepage,
              description: currentRoles.map(({ role, company, employmentType }) =>
                `${role} (${employmentType.toLowerCase()}) at ${company}`
              ).join(" and "),
              worksFor: currentRoles.map(({ company }) => ({ "@type": "Organization", name: company })),
              sameAs: [linkedin, github]
            }
          }
        ]
      }} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <PortfolioHeader />
      <main id="main-content">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-intro">
            <p className="hero-kicker mono"><span aria-hidden="true" />Software engineer</p>
            <h1 id="hero-title">Maxim<br />Simakoff<span className="period">.</span></h1>
            <p className="hero-description">I build AI systems at <strong>Tribe Capital</strong> and software for educators at <strong>SmartStart Education.</strong></p>
            <div className="hero-actions">
              <a className="button solid" href="#projects"><Icon name="grid" size={16} />Explore work</a>
              <Link className="button outlined" href="/resume"><Icon name="file" size={16} />View résumé</Link>
            </div>
            <p className="hero-location"><Icon name="pin" size={15} />{contact.location}</p>
          </div>
          <figure className="workstation-frame" aria-label="Interactive 3D model of a vintage desktop computer">
            <Workstation />
            <figcaption className="stage-label mono"><Icon name="cube" size={15} />3D viewport</figcaption>
            <span className="stage-reticle" aria-hidden="true" />
            <span className="stage-instruction mono"><Icon name="orbit" size={16} />Drag to rotate</span>
          </figure>
        </section>
        <WorkGallery />
        <section className="experience-section band" id="experience" aria-labelledby="experience-heading">
          <div className="shell experience-layout">
            <div className="experience-intro">
              <h2 className="section-heading" id="experience-heading">Experience<span className="period">.</span></h2>
              <Link className="text-link" href="/resume#experience"><Icon name="file" size={16} />Full résumé</Link>
            </div>
            <div className="role-list">
              {careerRoles.slice(0, 3).map((item) => (
                <article className="role" key={item.company + item.role}>
                  <div className="role-meta"><span className="mono metadata">{item.company}<span> / </span>{item.employmentType}</span><span className="role-date">{item.period}</span></div>
                  <h3>{item.role}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="about-section band" id="about" aria-labelledby="about-heading">
          <div className="shell about-layout">
            <div className="about-intro">
              <h2 className="section-heading" id="about-heading">About me<span className="period">.</span></h2>
              <p>I started tutoring math long before I wrote software for classrooms. Today I study computer science at UMass Amherst and build tools for educators and investment teams.</p>
              <a className="text-link" href={github}><Icon name="github" size={17} />GitHub</a>
            </div>
            <div className="about-sheet">
              <div className="about-fact"><Icon name="cap" size={23} /><div><h3>Education</h3><p>{education.school}<br />Computer Science · Expected {education.graduation}</p></div></div>
            </div>
          </div>
          <section id="systems" aria-labelledby="tools-heading" className="shell mt-10 sm:mt-14">
            <h3 id="tools-heading" className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
              <span className="text-[var(--violet)]"><Icon name="code" size={23} /></span>
              Tools &amp; platforms
            </h3>
            <dl className="cloud-platforms" aria-label="Cloud platforms">
              {cloudPlatforms.map(({ name, services }) => (
                <div key={name} className="cloud-platform">
                  <dt>{name}</dt>
                  <dd>{services.join(" · ")}</dd>
                </div>
              ))}
            </dl>
            <dl className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {toolGroups.map(({ label, highlights, additional }) => (
                <div key={label} className="border-t border-[var(--line)] pt-3">
                  <dt className="font-semibold">{label}</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-[var(--muted)]">
                    {[...highlights, ...additional].join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </section>
        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="shell contact-layout">
            <div><h2 id="contact-heading" className="section-heading">Get in touch<span className="period">.</span></h2></div>
            <div className="contact-actions">
              {contact.email && <a className="button solid" href={contact.email.href}><Icon name="mail" size={17} />Send an email</a>}
              <a className={`button ${contact.email ? "outlined" : "solid"}`} href={linkedin}><Icon name="linkedin" size={17} />Connect on LinkedIn</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="shell site-footer">
        <Link href="/" className="wordmark"><PixelMark /><span>Maxim Simakoff</span></Link>
        <div><Link href="/resume">Résumé</Link><a href={github}>GitHub</a><a href={linkedin}>LinkedIn</a></div>
      </footer>
    </>
  );
}
