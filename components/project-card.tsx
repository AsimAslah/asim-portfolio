import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/profile';
import { ProjectDemo } from './project-demo';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isMajor = project.slug === 'dataveil' || project.slug === 'image-to-3d-ar';

  return (
    <article className={`project-card ${isMajor ? 'is-major' : ''}`} data-project={`0${index + 1}`}>
      <ProjectDemo project={project} index={index} />
      <div className="project-content">
        <div className="project-kicker"><p className="micro-label">Project / 0{index + 1}</p><span>{project.label}</span></div>
        <h3><Link href={`/projects/${project.slug}`}>{project.shortTitle}</Link></h3>
        <p>{project.summary}</p>
        <ul className="project-features">
          {project.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
        <div className="tag-list">
          {project.technologies.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <div className="project-actions">
          <Link className="text-link" href={`/projects/${project.slug}`}>
            Case study <ArrowUpRight aria-hidden="true" />
          </Link>
          {project.githubUrl && (
            <a className="small-button" href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}>
              <span className="brand-icon" aria-hidden="true">GH</span>
            </a>
          )}
          {project.demoUrl && (
            <a className="small-button" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Live demo <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
