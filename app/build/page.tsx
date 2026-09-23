import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Database, Gauge, Keyboard, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { ProjectWorkflow } from '@/components/project-workflow';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'How this portfolio was built',
  description: 'An engineering overview of the architecture, accessibility, performance, feedback, and BYTE decisions behind Asim Aslah’s portfolio.',
};

const systemLayers = [
  {
    icon: Layers3,
    title: 'Application',
    text: 'React and Next.js components are built through Vinext for a Cloudflare-compatible application runtime.',
  },
  {
    icon: Gauge,
    title: 'Delivery',
    text: 'Cloudflare Workers serves the application, while static images, fonts, video, and project assets are delivered separately.',
  },
  {
    icon: Database,
    title: 'Feedback',
    text: 'A server-side API validates submissions and stores ratings in Cloudflare D1 with duplicate and rate-limit protection.',
  },
  {
    icon: Sparkles,
    title: 'BYTE',
    text: 'The portfolio guide uses verified repository data, explicit question routing, and a replaceable answer-provider interface.',
  },
];

const accessibilityDecisions = [
  'Keyboard access for navigation, BYTE, dialogs, project workflows, and the interactive name.',
  'Visible focus states and semantic labels for controls that use visual shorthand.',
  'Reduced-motion behavior for scrolling, pointer reactions, floating elements, and spring effects.',
  'Touch-friendly controls and layouts that preserve reading order on smaller screens.',
];

const performanceDecisions = [
  'CSS transforms and requestAnimationFrame are used for small pointer interactions.',
  'Project media is loaded only where it adds evidence to a case study.',
  'No heavy animation, diagram, command-palette, or chat dependency is required.',
  'Portfolio content remains typed data so project pages and BYTE share one source of truth.',
];

export default function BuildPage() {
  return (
    <>
      <Navbar />
      <main className="build-page">
        <div className="shell project-breadcrumb">
          <Link href="/#home" prefetch={false} data-sound="navigation"><ArrowLeft aria-hidden="true" /> Back to portfolio</Link>
          <span>Engineering notes</span>
        </div>

        <section className="shell build-hero">
          <p className="micro-label">How this portfolio was built</p>
          <h1>A small product system, not a static résumé.</h1>
          <p>
            This portfolio combines typed project content, accessible interactions, a Cloudflare application runtime,
            and a deliberately constrained portfolio assistant. The goal is to demonstrate engineering decisions without
            making the interface feel like a technology demo.
          </p>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="secondary-button" data-sound="primary">
            View GitHub profile <ArrowUpRight aria-hidden="true" />
          </a>
        </section>

        <section className="shell build-section" aria-labelledby="build-system-heading">
          <div className="detail-section-heading">
            <p className="micro-label">01 / System</p>
            <h2 id="build-system-heading">The working parts</h2>
          </div>
          <div className="build-system-grid">
            {systemLayers.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shell build-section" aria-labelledby="build-byte-heading">
          <div className="detail-section-heading">
            <p className="micro-label">02 / BYTE architecture</p>
            <h2 id="build-byte-heading">Verified answers by design</h2>
            <p>BYTE is scripted and says so. A provider boundary allows a future server-side model without moving secrets into the browser.</p>
          </div>
          <ProjectWorkflow
            label="BYTE answer architecture"
            steps={['Portfolio data', 'Knowledge model', 'Question routing', 'Answer provider', 'Accessible chat UI']}
          />
        </section>

        <section className="shell build-section build-two-column">
          <article>
            <div className="build-section-icon"><Keyboard aria-hidden="true" /></div>
            <p className="micro-label">03 / Accessibility</p>
            <h2>Interaction without exclusion</h2>
            <ul>{accessibilityDecisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
          </article>
          <article>
            <div className="build-section-icon"><Gauge aria-hidden="true" /></div>
            <p className="micro-label">04 / Performance</p>
            <h2>Small effects, bounded cost</h2>
            <ul>{performanceDecisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
          </article>
        </section>

        <section className="shell build-section build-feedback-note" aria-labelledby="build-feedback-heading">
          <ShieldCheck aria-hidden="true" />
          <div>
            <p className="micro-label">05 / Feedback protection</p>
            <h2 id="build-feedback-heading">Useful signals with restrained data collection</h2>
            <p>
              Feedback is validated server-side, stored in D1, and protected with per-browser duplicate checks and rate limiting.
              The interface does not add fingerprinting, accounts, or new personal-information fields.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-inner">
          <div><Link className="brand" href="/#home" prefetch={false}>AA<span>.</span></Link><p>{profile.name}<br />{profile.role}</p></div>
          <Link href="/#projects" prefetch={false}>Explore the projects ↑</Link>
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </footer>
    </>
  );
}
