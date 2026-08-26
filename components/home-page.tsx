'use client';

import { FormEvent } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  FileDown,
  Mail,
  MapPin,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  academicWork,
  education,
  focusAreas,
  profile,
  projects,
  skillGroups,
} from '@/data/profile';
import { Navbar } from './navbar';
import { ProjectCard } from './project-card';
import { Reveal } from './reveal';

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="section-heading">
      <div>
        <p className="micro-label">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

function ContactForm({ email }: { email: string }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '');
    const sender = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${sender}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label><span>Name</span><input type="text" name="name" autoComplete="name" required /></label>
        <label><span>Email</span><input type="email" name="email" autoComplete="email" required /></label>
      </div>
      <label><span>Message</span><textarea name="message" rows={5} required /></label>
      <button className="primary-button" type="submit">Open in email <ArrowUpRight aria-hidden="true" /></button>
    </form>
  );
}

export function HomePage() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <Navbar />
      <main>
        <section className="hero shell" id="home">
          <motion.div
            className="hero-copy"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="status-line"><span /> Available for opportunities</p>
            <p className="hero-name">{profile.name}</p>
            <h1>Building useful products at the intersection of <em>AI and the web.</em></h1>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <a className="primary-button" href="#projects">View projects <ArrowDown aria-hidden="true" /></a>
              <a className="secondary-button" href={profile.resumeUrl} target="_blank" rel="noreferrer">Download resume <FileDown aria-hidden="true" /></a>
            </div>
            {(profile.githubUrl || profile.linkedinUrl) && (
              <div className="hero-socials">
                {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer"><span className="brand-icon" aria-hidden="true">GH</span> GitHub</a>}
                {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer"><span className="brand-icon brand-icon-in" aria-hidden="true">in</span> LinkedIn</a>}
              </div>
            )}
          </motion.div>

          <motion.div
            className="system-map"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            aria-label="A visual map of Asim's practical product development process"
          >
            <div className="system-map-header"><span>PRODUCT SYSTEM / 01</span><span className="map-live"><i /> ACTIVE</span></div>
            <div className="map-canvas">
              <div className="map-node map-main"><small>BUILD</small><strong>Practical AI</strong><span>Ideas → working products</span></div>
              <div className="map-node map-one"><span>01</span><ScanSearch aria-hidden="true" /> Vision</div>
              <div className="map-node map-two"><span>02</span><Code2 aria-hidden="true" /> APIs</div>
              <div className="map-node map-three"><span>03</span><Sparkles aria-hidden="true" /> Product</div>
              <div className="map-connector connector-one" />
              <div className="map-connector connector-two" />
              <div className="map-connector connector-three" />
              <div className="map-pulse pulse-one" /><div className="map-pulse pulse-two" />
            </div>
            <div className="system-map-footer"><span>Python / TypeScript</span><span>{profile.location}</span></div>
          </motion.div>
        </section>

        <section className="section shell" id="about">
          <Reveal>
            <SectionHeading eyebrow="About / 01" title="Engineering with a product mindset." />
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-copy">
              <p>{profile.about}</p>
              <div className="location-line"><MapPin aria-hidden="true" /> Based in {profile.location}</div>
            </Reveal>
            <Reveal className="principles" delay={0.08}>
              <div><span>01</span><strong>Useful over novel</strong><p>Start with a real problem and build the smallest dependable path to solving it.</p></div>
              <div><span>02</span><strong>AI with guardrails</strong><p>Treat privacy, reliability, and user control as product requirements.</p></div>
              <div><span>03</span><strong>End-to-end ownership</strong><p>Connect models and APIs to interfaces people can actually use.</p></div>
            </Reveal>
          </div>
        </section>

        <section className="section shell" id="projects">
          <Reveal>
            <SectionHeading eyebrow="Selected work / 02" title="Projects built around real problems." description="AI systems, developer tools, and thoughtful digital products — designed as complete workflows rather than isolated demos." />
          </Reveal>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 2) * 0.07}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>

          <Reveal className="academic-block">
            <div className="academic-heading">
              <p className="micro-label">Additional AI / ML work</p>
              <p>Selected academic explorations across language, vision, anomaly detection, and cybersecurity.</p>
            </div>
            <div className="academic-grid">
              {academicWork.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <div><p>{item.area}</p><h3>{item.title}</h3></div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="section shell" id="skills">
          <Reveal>
            <SectionHeading eyebrow="Capabilities / 03" title="A focused, full-stack toolkit." description="Tools chosen to move from model experimentation to reliable APIs and usable web products." />
          </Reveal>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <Reveal className="skill-group" key={group.name} delay={(index % 3) * 0.05}>
                <div className="skill-group-heading"><span>0{index + 1}</span><h3>{group.name}</h3></div>
                <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section shell focus-section">
          <Reveal>
            <SectionHeading eyebrow="Focus areas / 04" title="What I build." />
          </Reveal>
          <Reveal className="focus-list">
            {focusAreas.map((area, index) => (
              <div key={area}><span>0{index + 1}</span><p>{area}</p><ArrowUpRight aria-hidden="true" /></div>
            ))}
          </Reveal>
        </section>

        <section className="section shell" id="education">
          <Reveal>
            <SectionHeading eyebrow="Education / 05" title="Academic foundation." />
          </Reveal>
          <div className="education-list">
            {education.map((item, index) => (
              <Reveal className="education-item" key={item.degree} delay={index * 0.07}>
                <div className="education-marker"><span>0{index + 1}</span><i /></div>
                <div><p className="micro-label">{item.period}</p><h3>{item.degree}</h3><p>{[item.institution, item.university].filter(Boolean).join(' · ')}</p></div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section shell contact-section" id="contact">
          <Reveal className="contact-card">
            <div className="contact-copy">
              <p className="micro-label">Contact / 06</p>
              <h2>Let’s build something useful.</h2>
              <p>I’m interested in software development, AI/ML, full-stack, and AI engineering opportunities where practical product thinking matters.</p>
              <div className="contact-links">
                {profile.email && <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" /> {profile.email}</a>}
                {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer"><span className="brand-icon" aria-hidden="true">GH</span> GitHub</a>}
                {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer"><span className="brand-icon brand-icon-in" aria-hidden="true">in</span> LinkedIn</a>}
              </div>
            </div>
            {profile.email ? <ContactForm email={profile.email} /> : (
              <div className="contact-mark" aria-hidden="true"><ShieldCheck /><span>Open to meaningful work</span></div>
            )}
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-inner">
          <div><Link className="brand" href="/#home">AA<span>.</span></Link><p>{profile.name}<br />{profile.role}</p></div>
          <div className="footer-links">
            {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}
            {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>}
            {profile.email && <a href={`mailto:${profile.email}`}>Email</a>}
            <a href="#home">Back to top ↑</a>
          </div>
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </footer>
    </>
  );
}
