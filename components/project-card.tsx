import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/profile';
import { ProjectVisual } from './project-visual';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}`} className="project-visual-link" aria-label={`View ${project.title} details`}>
        <ProjectVisual project={project} index={index} />
      </Link>
      <div className="project-content">
        <p className="micro-label">{project.label}</p>
        <h3><Link href={`/projects/${project.slug}`}>{project.shortTitle}</Link></h3>
        <p>{project.summary}</p>
        <div className="tag-list">
          {project.technologies.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <div className="project-actions">
          <Link className="text-link" href={`/projects/${project.slug}`}>
            View project <ArrowUpRight aria-hidden="true" />
          </Link>
          {project.githubUrl && (
            <a className="icon-button" href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}>
              <span className="brand-icon" aria-hidden="true">GH</span>
            </a>
          )}
          {project.demoUrl && (
            <a className="small-button" href={project.demoUrl} target="_blank" rel="noreferrer">Live demo</a>
          )}
        </div>
      </div>
    </article>
  );
}
