'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, FileDown, Mail, MapPin, MessageCircle } from 'lucide-react';
import { education, experience, profile, projects, skillGroups } from '@/data/profile';
import { Navbar } from './navbar';
import { AboutPortraits, HeroPortrait } from './editorial-portrait';
import { CodeCompanion } from './code-companion';
import { ProjectCard } from './project-card';
import { Reveal } from './reveal';
import { SectionAnchor } from './section-anchor';
import { FeedbackSection } from './feedback-section';

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

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        setProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));
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

  return <div className="scroll-progress" aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></div>;
}

export function HomePage() {
  return (
    <>
      <Navbar />
      <ScrollProgressBar />
      <main>
        <section className="hero shell" id="home">
          <div className="hero-copy">
            <p className="status-line"><span /> Available for opportunities</p>
            <p className="hero-role">{profile.role}</p>
            <h1 aria-label="Asim Aslah"><span>ASIM</span><span className="hero-name-last">ASLAH</span><i aria-hidden="true">.</i></h1>
            <p className="hero-intro">{profile.intro}</p>
            <ul className="hero-stack" aria-label="Core technologies">
              <li>Python</li><li>FastAPI</li><li>PyTorch</li><li>React</li>
            </ul>
            <div className="hero-actions hero-actions-primary">
              <SectionAnchor className="primary-button" sectionId="projects" data-sound="primary">View projects <ArrowRight aria-hidden="true" /></SectionAnchor>
              <SectionAnchor className="secondary-button" sectionId="about" data-sound="navigation">About me <ArrowRight aria-hidden="true" /></SectionAnchor>
            </div>
            <div className="hero-socials" aria-label="Profile links">
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" data-sound="navigation"><span className="brand-icon" aria-hidden="true">GH</span> GitHub</a>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" data-sound="navigation"><span className="brand-icon brand-icon-in" aria-hidden="true">in</span> LinkedIn</a>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" data-sound="primary"><FileDown aria-hidden="true" /> Download resume</a>
              <SectionAnchor sectionId="contact" data-sound="navigation">Contact</SectionAnchor>
            </div>
          </div>

          <div className="hero-media">
            <HeroPortrait />
          </div>
        </section>

        <section className="section shell" id="projects">
          <Reveal>
            <SectionHeading eyebrow="Featured projects / 01" title="Products built around real problems." description="Applied AI and full-stack systems shaped as complete, usable workflows — not isolated demos." />
          </Reveal>
          <CodeCompanion />
          <div className="featured-work">
            {projects.slice(0, 2).map((project, index) => (
              <Reveal className="project-reveal is-major" key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
          <div className="supporting-work-heading"><p className="micro-label">More experiments</p><span>Frontend craft and human–computer interaction.</span></div>
          <div className="project-grid supporting-work">
            {projects.slice(2).map((project, index) => (
              <Reveal className="project-reveal" key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} index={index + 2} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section shell experience-section" id="experience" aria-labelledby="experience-heading">
          <Reveal>
            <SectionHeading eyebrow="Experience / 02" title="Industry experience." description="Verified product work with a real software team." />
          </Reveal>
          <Reveal className="experience-card">
            <div className="experience-caption">
              <span>{experience.caption}</span>
              <small>Completion verified</small>
            </div>
            <div className="experience-copy">
              <p className="micro-label">{experience.product} / Product</p>
              <h3 id="experience-heading">{experience.title}</h3>
              <p className="experience-organization">{experience.organization}</p>
              <p>{experience.description}</p>
            </div>
            <div className="experience-actions">
              <time>{experience.period}</time>
            </div>
          </Reveal>
        </section>

        <section className="section shell" id="about">
          <Reveal>
            <SectionHeading eyebrow="About / 03" title="Engineering with a product mindset." />
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
              <Reveal className="education-mini" delay={0.1}>
                <p className="micro-label">Education</p>
                {education.map((item) => (
                  <div key={item.degree}><time>{item.period}</time><p><strong>{item.degree}</strong><span>{item.institution}</span></p></div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section shell" id="skills">
          <Reveal>
            <SectionHeading eyebrow="Technical skills / 04" title="A focused toolkit, not a keyword wall." description="The technologies I use to move from model experiments to dependable interfaces." />
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

        <section className="section shell contact-section" id="contact">
          <Reveal className="contact-card">
            <div className="contact-glow" aria-hidden="true" />
            <div className="contact-copy">
              <p className="micro-label">Contact / 05</p>
              <h2>Let&apos;s build something intelligent.</h2>
              <p>Reach out for AI projects, software development, internships, freelance opportunities, or a thoughtful collaboration.</p>
              <p className="contact-status"><span /> Available for opportunities</p>
            </div>
            <div className="contact-directory">
              <a className="contact-tile contact-tile-wide" href={`mailto:${profile.email}`} data-sound="primary">
                <span className="contact-icon"><Mail aria-hidden="true" /></span><span><small>Email</small><strong>{profile.email}</strong></span><ArrowUpRight aria-hidden="true" />
              </a>
              <a className="contact-tile contact-tile-whatsapp" href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" data-sound="primary">
                <span className="contact-icon"><MessageCircle aria-hidden="true" /></span><span><small>WhatsApp</small><strong>Start a conversation</strong></span><ArrowUpRight aria-hidden="true" />
              </a>
              <a className="contact-tile" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" data-sound="navigation">
                <span className="contact-icon"><span className="brand-icon brand-icon-in" aria-hidden="true">in</span></span><span><small>LinkedIn</small><strong>Connect professionally</strong></span><ArrowUpRight aria-hidden="true" />
              </a>
              <a className="contact-tile" href={profile.githubUrl} target="_blank" rel="noopener noreferrer" data-sound="navigation">
                <span className="contact-icon"><span className="brand-icon" aria-hidden="true">GH</span></span><span><small>GitHub</small><strong>@AsimAslah</strong></span><ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </section>

        <FeedbackSection />
      </main>

      <footer className="footer">
        <div className="shell footer-inner">
          <div><SectionAnchor className="brand" sectionId="home" data-sound="navigation">AA<span>.</span></SectionAnchor><p>{profile.name}<br />{profile.role}</p></div>
          <div className="footer-links">
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <SectionAnchor sectionId="home" data-sound="navigation">Back to top ↑</SectionAnchor>
          </div>
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </div>
      </footer>
    </>
  );
}
