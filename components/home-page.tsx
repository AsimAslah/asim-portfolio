'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  FileDown,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  academicWork,
  education,
  focusAreas,
  navigation,
  profile,
  projects,
  skillGroups,
} from '@/data/profile';
import { Navbar } from './navbar';
import { AboutPortraits, HeroPortrait, LifestylePortrait } from './editorial-portrait';
import { ProjectCard } from './project-card';
import { Reveal } from './reveal';
import { SectionAnchor } from './section-anchor';

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

const capabilityMatrix = [
  { label: 'AI', detail: 'Models → products', depth: 5 },
  { label: 'Backend', detail: 'APIs → systems', depth: 4 },
  { label: 'Vision', detail: 'Pixels → decisions', depth: 4 },
  { label: 'Frontend', detail: 'Ideas → interfaces', depth: 4 },
] as const;

function ScrollProgressRail() {
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ids = navigation.map((item) => item.href.split('#')[1]);
    const sections = ids.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        setProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));

        let current = sections[0]?.id ?? 'home';
        sections.forEach((section) => {
          if (section.getBoundingClientRect().top <= window.innerHeight * 0.42) current = section.id;
        });
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections.at(-1)?.id ?? current;
        setActiveSection(current);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <nav className="scroll-progress-rail" aria-label="Section progress">
        <div className="scroll-progress-track" aria-hidden="true"><i style={{ transform: `scaleY(${progress})` }} /></div>
        {navigation.map((item, index) => {
          const id = item.href.split('#')[1];
          const isActive = activeSection === id;
          return (
            <SectionAnchor key={item.label} href={item.href} sectionId={id} className={isActive ? 'is-active' : ''} aria-current={isActive ? 'location' : undefined}>
              <span>{String(index + 1).padStart(2, '0')}</span><b>{item.label}</b>
            </SectionAnchor>
          );
        })}
      </nav>
      <div className="scroll-progress-mobile" aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></div>
    </>
  );
}

export function HomePage() {
  const reducedMotion = useReducedMotion();
  const [hideFloatingChat, setHideFloatingChat] = useState(false);

  useEffect(() => {
    const denseSections = Array.from(document.querySelectorAll('#projects, #contact'));
    if (!denseSections.length || !('IntersectionObserver' in window)) return;
    const visibleSections = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting ? visibleSections.add(entry.target) : visibleSections.delete(entry.target));
        setHideFloatingChat(visibleSections.size > 0);
      },
      { threshold: 0.12 },
    );
    denseSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <ScrollProgressRail />
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
            className="hero-media"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroPortrait />
          </motion.div>
        </section>

        <section className="section shell" id="about">
          <Reveal>
            <SectionHeading eyebrow="About / 01" title="Engineering with a product mindset." />
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-media"><AboutPortraits /></Reveal>
            <div className="about-story">
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
          </div>
        </section>

        <section className="section shell" id="projects">
          <Reveal>
            <SectionHeading eyebrow="Selected work / 02" title="Projects built around real problems." description="AI systems, developer tools, and thoughtful digital products — designed as complete workflows rather than isolated demos." />
          </Reveal>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Reveal className={`project-reveal ${index < 2 ? 'is-major' : ''}`} key={project.slug} delay={(index % 2) * 0.07}>
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
          <Reveal className="capability-matrix">
            {capabilityMatrix.map((capability, index) => (
              <article key={capability.label}>
                <div><span>0{index + 1}</span><p>Capability signal</p></div>
                <h3>{capability.label}</h3>
                <p>{capability.detail}</p>
                <div className="capability-level" aria-label={`${capability.label} capability signal: ${capability.depth} of 5`}>
                  {Array.from({ length: 5 }, (_, dot) => <i key={dot} className={dot < capability.depth ? 'is-active' : ''} aria-hidden="true" />)}
                </div>
              </article>
            ))}
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
          <Reveal className="focus-intro">
            <SectionHeading eyebrow="Focus areas / 04" title="What I build." />
            <LifestylePortrait />
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
                <div className="education-period"><span>0{index + 1}</span><time>{item.period}</time></div>
                <div className="education-marker" aria-hidden="true"><i /></div>
                <div className="education-detail"><h3>{item.degree}</h3>{[item.institution, item.university].some(Boolean) && <p>{[item.institution, item.university].filter(Boolean).join(' · ')}</p>}</div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section shell cta-section" aria-labelledby="cta-heading">
          <Reveal className="cta-panel">
            <div>
              <p className="micro-label">A good idea deserves momentum</p>
              <h2 id="cta-heading">Have an idea?<br /><em>Let&apos;s make it real.</em></h2>
            </div>
            <div className="cta-actions">
              <p>From the first useful prototype to a polished AI product, I&apos;m ready to help shape what comes next.</p>
              <div>
                <a className="primary-button" href="#contact">Start a conversation <ArrowDown aria-hidden="true" /></a>
                <a className="secondary-button" href="#projects">View my work <ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section shell contact-section" id="contact">
          <Reveal className="contact-card">
            <div className="contact-glow" aria-hidden="true" />
            <div className="contact-copy">
              <p className="micro-label">Contact / 06</p>
              <h2>Let&apos;s build something useful together.</h2>
              <p>Reach out for AI projects, software development, internships, freelance opportunities, or a thoughtful collaboration.</p>
              <ul className="contact-opportunities" aria-label="Open to">
                <li>AI projects</li><li>Software development</li><li>Internships</li><li>Freelance</li><li>Collaboration</li>
              </ul>
              <p className="contact-status"><span /> Available for opportunities</p>
            </div>
            <div className="contact-directory">
              <a className="contact-tile contact-tile-wide" href={`mailto:${profile.email}`}>
                <span className="contact-icon"><Mail aria-hidden="true" /></span><span><small>Email</small><strong>{profile.email}</strong></span><ArrowUpRight aria-hidden="true" />
              </a>
              <a className="contact-tile" href="tel:9207900426">
                <span className="contact-icon"><Phone aria-hidden="true" /></span><span><small>Phone</small><strong>{profile.primaryPhone}</strong></span><ArrowUpRight aria-hidden="true" />
              </a>
              <a className="contact-tile" href="tel:7510875426">
                <span className="contact-icon"><Phone aria-hidden="true" /></span><span><small>Alternative phone</small><strong>{profile.secondaryPhone}</strong></span><ArrowUpRight aria-hidden="true" />
              </a>
              <a className="contact-tile contact-tile-whatsapp" href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <span className="contact-icon"><MessageCircle aria-hidden="true" /></span><span><small>WhatsApp</small><strong>Chat on WhatsApp</strong></span><ArrowUpRight aria-hidden="true" />
              </a>
              <a className="contact-tile" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                <span className="contact-icon"><span className="brand-icon brand-icon-in" aria-hidden="true">in</span></span><span><small>LinkedIn</small><strong>Connect professionally</strong></span><ArrowUpRight aria-hidden="true" />
              </a>
              <a className="contact-tile" href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                <span className="contact-icon"><span className="brand-icon" aria-hidden="true">GH</span></span><span><small>GitHub</small><strong>Explore my code</strong></span><ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-statement"><p>Have a useful problem worth solving?</p><span>Let&apos;s build the first working version.</span></div>
        <div className="shell footer-inner">
          <div><SectionAnchor className="brand" sectionId="home">AA<span>.</span></SectionAnchor><p>{profile.name}<br />{profile.role}</p></div>
          <div className="footer-links">
            {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}
            {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>}
            {profile.email && <a href={`mailto:${profile.email}`}>Email</a>}
            <a href="#home">Back to top ↑</a>
          </div>
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </footer>

      <a className={`floating-whatsapp ${hideFloatingChat ? 'is-hidden' : ''}`} href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with Asim on WhatsApp" aria-hidden={hideFloatingChat} tabIndex={hideFloatingChat ? -1 : undefined}>
        <MessageCircle aria-hidden="true" /><span>Chat on WhatsApp</span>
      </a>
    </>
  );
}
