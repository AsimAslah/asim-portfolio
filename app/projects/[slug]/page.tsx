import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { ProjectVisual } from '@/components/project-visual';
import { profile, projects } from '@/data/profile';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.shortTitle,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
      images: project.screenshot ? [{ url: project.screenshot }] : [],
    },
    twitter: {
      card: 'summary',
      title: project.title,
      description: project.summary,
      images: project.screenshot ? [project.screenshot] : [],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main className="project-page">
        <div className="shell project-breadcrumb"><Link href="/#projects"><ArrowLeft aria-hidden="true" /> Back to projects</Link><span>{project.label}</span></div>
        <section className="shell project-detail-hero">
          <div>
            <p className="micro-label">Project case study</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <div className="project-detail-actions">
              {project.githubUrl && <a className="primary-button" href={project.githubUrl} target="_blank" rel="noreferrer"><span className="brand-icon" aria-hidden="true">GH</span> GitHub</a>}
              {project.demoUrl && <a className="secondary-button" href={project.demoUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight aria-hidden="true" /></a>}
            </div>
          </div>
          <ProjectVisual project={project} compact />
        </section>

        <section className="shell project-detail-grid">
          <article><p className="micro-label">01 / Problem</p><h2>The context</h2><p>{project.problem}</p></article>
          <article><p className="micro-label">02 / Solution</p><h2>The approach</h2><p>{project.solution}</p></article>
        </section>

        <section className="shell detail-section">
          <div className="detail-section-heading"><p className="micro-label">03 / System</p><h2>Key features</h2></div>
          <div className="numbered-grid">
            {project.features.map((feature, index) => <div key={feature}><span>0{index + 1}</span><p>{feature}</p></div>)}
          </div>
        </section>

        <section className="shell detail-section architecture-section">
          <div className="detail-section-heading"><p className="micro-label">04 / Workflow</p><h2>From input to outcome</h2></div>
          <div className="workflow">
            {project.workflow.map((step, index) => <div key={step}><span>0{index + 1}</span><p>{step}</p>{index < project.workflow.length - 1 && <i aria-hidden="true" />}</div>)}
          </div>
        </section>

        <section className="shell project-detail-grid detail-bottom">
          <article><p className="micro-label">05 / Challenges</p><h2>What required care</h2><ul>{project.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul></article>
          <article><p className="micro-label">06 / Outcome</p><h2>What it demonstrates</h2><p>{project.outcome}</p><div className="tag-list detail-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></article>
        </section>

        <section className="shell next-project">
          <p className="micro-label">Continue exploring</p>
          <Link href={`/projects/${next.slug}`}><span>Next project</span><strong>{next.shortTitle}</strong><ArrowUpRight aria-hidden="true" /></Link>
        </section>
      </main>
      <footer className="footer"><div className="shell footer-inner"><div><Link className="brand" href="/#home">AA<span>.</span></Link><p>{profile.name}<br />{profile.role}</p></div><Link href="/#projects">All projects ↑</Link><p>© {new Date().getFullYear()} {profile.name}</p></div></footer>
    </>
  );
}
