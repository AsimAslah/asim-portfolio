import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Code2 } from 'lucide-react';
import type { Project } from '@/data/profile';
import { ProjectDemo } from './project-demo';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isMajor = project.slug === 'dataveil' || project.slug === 'image-to-3d-ar';

  return (
    <article className={`project-card ${isMajor ? 'is-major' : ''}`} data-project={`0${index + 1}`}>
      <Link className="project-visual-link" href={`/projects/${project.slug}`} prefetch={false} aria-label={`View ${project.shortTitle} case study`} data-cursor="focus" data-sound="project">
        {isMajor && project.screenshot && project.screenshotAlt && project.screenshotSize ? (
          <div className={`project-shot tone-${project.tone}`}>
            <div className="project-shot-chrome" aria-hidden="true">
              <span><i /><i /><i /></span>
              <b>{project.shortTitle} / verified build</b>
              <em>0{index + 1}</em>
            </div>
            <div className="project-shot-frame">
              <Image
                src={project.screenshot}
                alt={project.screenshotAlt}
                width={project.screenshotSize.width}
                height={project.screenshotSize.height}
                sizes="(max-width: 900px) calc(100vw - 40px), 58vw"
                quality={88}
              />
            </div>
            <span className="project-shot-proof" aria-hidden="true">Working interface / repository evidence</span>
          </div>
        ) : <ProjectDemo project={project} index={index} />}
        <span className="project-hover-label">View case study <ArrowUpRight aria-hidden="true" /></span>
      </Link>
      <div className="project-content">
        <div className="project-kicker"><p className="micro-label">Project / 0{index + 1}</p><span>{project.label}</span></div>
        <h3><Link href={`/projects/${project.slug}`} prefetch={false} data-sound="project">{project.shortTitle}</Link></h3>
        {isMajor && (
          <p className="project-campaign">
            {project.slug === 'dataveil'
              ? 'Your data. Your privacy. Before AI sees it.'
              : 'Turn a single image into a preview-ready 3D mesh.'}
          </p>
        )}
        <p className="project-summary">{project.summary}</p>
        {isMajor ? (
          <div className="project-brief">
            <p><span>Problem</span>{project.problem}</p>
            <p><span>Solution</span>{project.solution}</p>
          </div>
        ) : <div className="project-build"><span>What I built</span><p>{project.build}</p></div>}
        <div className="tag-list">
          {project.technologies.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <div className="project-actions">
          <Link className="project-action project-action-primary" href={`/projects/${project.slug}`} prefetch={false} data-sound="project">
            View project <ArrowUpRight aria-hidden="true" />
          </Link>
          {project.githubUrl && (
            <a className="project-action project-action-secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub`} data-sound="project">
              View code <Code2 aria-hidden="true" />
            </a>
          )}
          {project.demoUrl && (
            <a className="project-action project-action-secondary" href={project.demoUrl} target="_blank" rel="noopener noreferrer" data-sound="project">
              Live demo <ArrowUpRight aria-hidden="true" />
            </a>
          )}
          {!project.githubUrl && (
            <Link className="project-action project-action-secondary" href={`/projects/${project.slug}`} prefetch={false} data-sound="project">
              Learn more <ArrowUpRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
