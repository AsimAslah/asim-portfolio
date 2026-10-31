import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check, FlaskConical, GitBranch, ShieldQuestion, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { PIIShiftResearchExplorer } from '@/components/piishift-research-explorer';
import { profile } from '@/data/profile';

const title = 'PIIShift-RAG: Conformal Privacy-Risk Routing for RAG under PII Distribution Shift';
const description = 'An ongoing research project exploring calibrated privacy-risk routing for retrieval-augmented generation when PII patterns shift.';

export const metadata: Metadata = {
  title: 'PIIShift-RAG',
  description,
  alternates: profile.siteUrl ? { canonical: `${profile.siteUrl}/projects/piishift-rag` } : undefined,
  openGraph: { title, description, type: 'article', images: ['/og.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
};

export default function PIIShiftRagPage() {
  return (
    <>
      <Navbar />
      <main className="project-page piishift-page">
        <div className="shell project-breadcrumb">
          <Link href="/#projects" prefetch={false} data-sound="navigation"><ArrowLeft aria-hidden="true" /> Back to projects</Link>
          <span>Ongoing M.Tech research</span>
        </div>

        <section className="shell piishift-hero">
          <div className="piishift-hero-copy">
            <div className="piishift-live-badge"><i aria-hidden="true" /> Currently building</div>
            <p className="micro-label">Privacy-Aware Retrieval-Augmented Generation</p>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="piishift-hero-actions">
              <a href="#workflow" className="primary-button">Explore workflow <ArrowUpRight aria-hidden="true" /></a>
              <Link href="/#projects" className="secondary-button" prefetch={false}>Portfolio projects</Link>
            </div>
          </div>
          <div className="piishift-hero-visual" aria-label="PIIShift-RAG research status">
            <div className="piishift-orbit" aria-hidden="true"><i /><i /><i /></div>
            <ShieldQuestion aria-hidden="true" />
            <span>Research / active</span>
            <strong>Risk-aware<br />RAG routing</strong>
            <small>Conformal calibration under distribution shift</small>
          </div>
        </section>

        <section className="shell project-detail-grid project-detail-grid-three piishift-intro-grid">
          <article><p className="micro-label">01 / Overview</p><h2>Research direction</h2><p>The project investigates how a RAG system could route requests according to calibrated privacy risk when the PII patterns encountered at deployment differ from those seen during development.</p></article>
          <article><p className="micro-label">02 / Problem</p><h2>Why routing matters</h2><p>A single processing route can expose sensitive content or become overly restrictive. The research frames privacy handling as a routing decision informed by both detected PII and uncertainty.</p></article>
          <article><p className="micro-label">03 / Research gap</p><h2>Shift changes confidence</h2><p>PII detectors and risk scores may become unreliable as data distributions change. The open research question is how to retain meaningful risk control while selecting among processing routes.</p></article>
        </section>

        <section className="shell detail-section piishift-solution-section">
          <div className="detail-section-heading">
            <p className="micro-label">04 / Proposed solution</p>
            <h2>Calibrate risk, then route.</h2>
          </div>
          <div className="piishift-proposal">
            <p>The proposed architecture combines PII detection, privacy-risk estimation, conformal calibration, and policy-aware routing. Instead of treating every request identically, it selects a processing path suited to the calibrated risk signal—or abstains when the intended privacy control cannot be met.</p>
            <div className="piishift-principles">
              <div><ShieldQuestion aria-hidden="true" /><strong>Represent uncertainty</strong><span>Use calibration to reason about risk rather than relying only on a raw score.</span></div>
              <div><GitBranch aria-hidden="true" /><strong>Route deliberately</strong><span>Choose among cloud, protected, local-only, and abstention paths.</span></div>
              <div><Sparkles aria-hidden="true" /><strong>Stay useful</strong><span>Preserve a viable response path where the privacy policy allows it.</span></div>
            </div>
          </div>
        </section>

        <section className="shell detail-section piishift-workflow-section" id="workflow">
          <div className="detail-section-heading">
            <p className="micro-label">05 / Interactive architecture</p>
            <h2>From input to a privacy-aware route</h2>
            <p>Select a stage or expand a routing outcome to explore the proposed system.</p>
          </div>
          <div><PIIShiftResearchExplorer /></div>
        </section>

        <section className="shell project-detail-grid piishift-shift-grid">
          <article>
            <p className="micro-label">06 / Distribution shift</p>
            <h2>Deployment data will not stay still.</h2>
            <p>Names, identifiers, document formats, domains, and language patterns can differ from development data. The research focuses on this mismatch because it can change both detection quality and the reliability of downstream privacy-risk estimates.</p>
          </article>
          <article>
            <p className="micro-label">07 / Conformal risk control</p>
            <h2>Make uncertainty actionable.</h2>
            <p>Conformal calibration is being explored as the statistical layer between risk estimation and routing. The target is explicit, testable risk control under stated assumptions; no empirical performance claim is made yet.</p>
          </article>
        </section>

        <section className="shell detail-section technology-section piishift-stack-section">
          <div className="detail-section-heading">
            <p className="micro-label">08 / Technology stack</p>
            <h2>Confirmed research scope</h2>
            <p>The implementation stack has not been publicly documented, so this page lists only the confirmed methods and system concepts.</p>
          </div>
          <div>
            <div className="tag-list detail-tags">
              <span>Retrieval-Augmented Generation</span><span>PII Detection</span><span>Privacy Risk Estimation</span><span>Conformal Calibration</span><span>Privacy-Aware Routing</span>
            </div>
            <p className="piishift-source-note"><FlaskConical aria-hidden="true" /> No public project repository, README, or implementation stack was available when this case study was prepared. Links and technical claims will be added only when verified.</p>
          </div>
        </section>

        <section className="shell detail-section piishift-status-section">
          <div className="detail-section-heading">
            <p className="micro-label">09 / Development status</p>
            <h2>What is defined—and what is next</h2>
          </div>
          <div className="piishift-status-grid">
            <article className="is-defined"><span><Check aria-hidden="true" /> Defined</span><h3>Research framing</h3><ul><li>Privacy-risk routing problem</li><li>Distribution-shift focus</li><li>Four candidate processing routes</li></ul></article>
            <article className="is-proposed"><span><GitBranch aria-hidden="true" /> Proposed</span><h3>System architecture</h3><ul><li>PII detection and risk estimation</li><li>Conformal calibration layer</li><li>Risk-aware routing policy</li></ul></article>
            <article className="is-future"><span><FlaskConical aria-hidden="true" /> Future validation</span><h3>Implementation and evaluation</h3><ul><li>Confirmed technical stack</li><li>Datasets and shift scenarios</li><li>Empirical results and limitations</li></ul></article>
          </div>
        </section>

        <section className="shell next-project">
          <p className="micro-label">Continue exploring</p>
          <Link href="/projects/dataveil" prefetch={false} data-sound="project"><span>Related privacy project</span><strong>DataVeil</strong><ArrowUpRight aria-hidden="true" /></Link>
        </section>
      </main>
      <footer className="footer"><div className="shell footer-inner"><div><Link className="brand" href="/#home" prefetch={false}>AA<span>.</span></Link><p>{profile.name}<br />{profile.role}</p></div><Link href="/#projects" prefetch={false}>All projects ↑</Link><p>© {new Date().getFullYear()} {profile.name}</p></div></footer>
    </>
  );
}
