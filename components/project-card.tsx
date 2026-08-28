import Link from 'next/link';
import { ArrowUpRight, Code2 } from 'lucide-react';
import type { Project } from '@/data/profile';
import { ProjectDemo } from './project-demo';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isMajor = project.slug === 'dataveil' || project.slug === 'image-to-3d-ar';

  return (
    <article className={`project-card ${isMajor ? 'is-major' : ''}`} data-project={`0${index + 1}`}>
      <Link className="project-visual-link" href={`/projects/${project.slug}`} aria-label={`View ${project.shortTitle} case study`}>
        <ProjectDemo project={project} index={index} />
        <span className="project-hover-label">View case study <ArrowUpRight aria-hidden="true" /></span>
      </Link>
      <div className="project-content">
        <div className="project-kicker"><p className="micro-label">Project / 0{index + 1}</p><span>{project.label}</span></div>
        <h3><Link href={`/projects/${project.slug}`}>{project.shortTitle}</Link></h3>
        {isMajor && (
          <p className="project-campaign">
            {project.slug === 'dataveil'
              ? 'Your data. Your privacy. Before AI sees it.'
              : 'Turn a single image into an interactive 3D experience.'}
          </p>
        )}
        <p className="project-summary">{project.summary}</p>
        <ul className="project-features">
          {project.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
        <div className="tag-list">
          {project.technologies.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <div className="project-actions">
          <Link className="project-action project-action-primary" href={`/projects/${project.slug}`}>
            View project <ArrowUpRight aria-hidden="true" />
          </Link>
          {project.githubUrl && (
            <a className="project-action project-action-secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub`}>
              View code <Code2 aria-hidden="true" />
            </a>
          )}
          {!project.githubUrl && (
            <Link className="project-action project-action-secondary" href={`/projects/${project.slug}`}>
              Learn more <ArrowUpRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
