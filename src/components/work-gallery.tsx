"use client";

import { useEffect, useRef, useState } from "react";
import { workProjects, type WorkProject } from "@/content/career";
import { Icon } from "./portfolio-icon";
import { WorkArt } from "./work-art";

type ProjectSelection = { project: WorkProject; trigger: HTMLButtonElement };

const collections: { id: WorkProject["collection"]; title: string }[] = [
  { id: "professional", title: "Professional projects" },
  { id: "campus", title: "Hackathon & coursework" }
];

function ProjectDetail({ project, trigger, onDismiss }: ProjectSelection & { onDismiss: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      trigger.focus({ preventScroll: true });
    };
  }, [trigger]);

  return (
    <dialog ref={dialog} className="project-detail" aria-labelledby="detail-title"
      onCancel={event => { event.preventDefault(); onDismiss(); }}
      onClick={event => { if (event.target === event.currentTarget) onDismiss(); }}>
      <div className="detail-content">
        <button type="button" className="detail-close" aria-label="Close project details" onClick={onDismiss}><Icon name="close" /></button>
        <div className="detail-art"><WorkArt kind={project.kind} name={project.name} /></div>
        <div className="detail-body">
          <p className="mono metadata">{project.company}<span> / </span>{project.year}</p>
          <h2 id="detail-title">{project.name}</h2>
          <p className="detail-lead">{project.summary}</p>
          {project.details.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <ul className="tag-list" aria-label="Project topics">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          {project.link && <a className="button solid" href={project.link.href}>{project.link.label}</a>}
        </div>
      </div>
    </dialog>
  );
}

export function WorkGallery() {
  const [selection, setSelection] = useState<ProjectSelection | null>(null);

  return (
    <section id="projects" className="work-section band" aria-labelledby="work-heading">
      <div className="shell">
        <h2 className="section-heading" id="work-heading">Selected work<span className="period">.</span></h2>
        {collections.map(collection => {
          const projects = workProjects.filter(project => project.collection === collection.id);
          if (!projects.length) return null;
          return (
            <section className="work-collection" key={collection.id} aria-labelledby={`work-${collection.id}`}>
              <h3 className="collection-heading" id={`work-${collection.id}`}>{collection.title}</h3>
              <div className="project-grid">
                {projects.map(item => (
                  <article className="project-card" key={item.kind}>
                    <div className="project-art"><WorkArt kind={item.kind} name={item.name} suspended={Boolean(selection)} /></div>
                    <div className="project-copy">
                      <p className="mono metadata">{item.company}<span> / </span>{item.year}</p>
                      <h4>
                        <button className="project-open" type="button" aria-haspopup="dialog"
                          onClick={event => setSelection({ project: item, trigger: event.currentTarget })}
                          aria-label={`View ${item.name} project details`}>
                          {item.name}<span className="project-plus" aria-hidden="true"><Icon name="plus" size={18} /></span>
                        </button>
                      </h4>
                      <p className="project-summary">{item.summary}</p>
                      <ul className="tag-list" aria-label="Project topics">{item.tags.slice(0, 3).map(tag => <li key={tag}>{tag}</li>)}</ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      {selection && <ProjectDetail {...selection} onDismiss={() => setSelection(null)} />}
    </section>
  );
}
