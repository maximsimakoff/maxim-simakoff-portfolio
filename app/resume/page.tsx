import type { Metadata } from "next";

import { PortfolioHeader } from "@/components/portfolio-header";
import {
  careerRoles,
  education,
  languages,
  profileLinks,
  skills,
  workProjects
} from "@/content/career";
import { getPrivateProfile } from "@/lib/private-profile";
import { getSharingMetadata } from "@/lib/sharing-metadata";
import styles from "./resume.module.css";

const description = "Maxim Simakoff’s engineering experience, selected projects, and education.";

export const metadata: Metadata = {
  title: "Résumé",
  description,
  ...getSharingMetadata("/resume/", "Résumé | Maxim Simakoff", description)
};

export default function ResumePage() {
  const profile = getPrivateProfile();
  const contacts = [
    profile.email,
    profile.linkedin ?? {
      label: "LinkedIn",
      value: "linkedin.com/in/maxim-simakoff",
      href: profileLinks.linkedin
    },
    profile.github ?? {
      label: "GitHub",
      value: "github.com/maximsimakoff",
      href: profileLinks.github
    },
    profile.phone
  ].filter((item) => item !== null);

  return (
    <div className={styles.page}>
      <a className="skip-link" href="#main-content">Skip to résumé</a>
      <PortfolioHeader />
      <main className={styles.sheet} id="main-content">
        <header className={styles.intro}>
          <p className={styles.kicker}>Résumé</p>
          <h1>Maxim Simakoff</h1>
          <p className={styles.introText}>
            AI Engineer at Tribe Capital and Forward Deployed Engineer at SmartStart Education.
            I build research tools for investors and software for education teams.
          </p>
          <div className={styles.contacts} id="contact">
            <span>{profile.location}</span>
            {contacts.map((contact) => (
              <a key={contact.label} href={contact.href}>
                {contact.label === "Email" || contact.label === "Phone" ? contact.value : contact.label}
              </a>
            ))}
          </div>
        </header>

        <div className={styles.body}>
          <section id="experience" className={styles.experience} aria-labelledby="roles-title">
            <h2 id="roles-title">Experience</h2>
            {careerRoles.map((entry) => (
              <article className={styles.role} key={entry.company + entry.role}>
                <div className={styles.roleMeta}>
                  <span className={styles.company}>
                    {entry.company}
                    {entry.company !== entry.employmentType && <span className={styles.employmentType}> · {entry.employmentType}</span>}
                  </span>
                  <span className={styles.period}>{entry.period}</span>
                </div>
                <h3>{entry.role}</h3>
                <p>{entry.summary}</p>
              </article>
            ))}
          </section>

          <div className={styles.rail}>
            <section id="education" className={styles.block} aria-labelledby="education-title">
              <h2 id="education-title">Education</h2>
              <h3>{education.school}</h3>
              <p>Bachelor’s degree in {education.field}</p>
              <p>Expected {education.graduation} · {education.gpa} GPA</p>
            </section>

            <section id="projects" className={styles.block} aria-labelledby="projects-title">
              <h2 id="projects-title">Selected projects</h2>
              {workProjects.map((project) => (
                <article className={styles.project} key={project.kind}>
                  <h3>
                    {project.link ? <a href={project.link.href}>{project.name}</a> : project.name}
                  </h3>
                  <p>{project.summary}</p>
                </article>
              ))}
            </section>

            <section id="stack" className={styles.block} aria-labelledby="skills-title">
              <h2 id="skills-title">Technical skills</h2>
              <dl className={styles.skills}>
                {skills.map((group) => (
                  <div key={group.label}>
                    <dt>{group.label}</dt>
                    <dd>{group.items.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className={styles.block} aria-labelledby="languages-title">
              <h2 id="languages-title">Languages</h2>
              <dl className={styles.languages}>
                {languages.map((language) => (
                  <div key={language.name}>
                    <dt>{language.name}</dt>
                    <dd>{language.proficiency}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
