'use client';

import { FileDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navigation, profile } from '@/data/profile';
import { SectionAnchor } from './section-anchor';
import { SoundToggle } from './sound-toggle';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.href.split('#')[1]))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 18);
        let current = sections[0].id;
        sections.forEach((section) => {
          if (section.getBoundingClientRect().top <= window.innerHeight * 0.38) current = section.id;
        });
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

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.body.classList.add('menu-open');
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <nav className="navbar shell" aria-label="Primary navigation">
        <SectionAnchor className="brand" sectionId="home" aria-label={`${profile.name}, home`}>
          AA<span>.</span>
        </SectionAnchor>

        <div className="desktop-nav">
          {navigation.map((item) => {
            const sectionId = item.href.split('#')[1];
            const isActive = activeSection === sectionId;
            return <SectionAnchor key={item.label} href={item.href} sectionId={sectionId} className={isActive ? 'is-active' : ''} aria-current={isActive ? 'location' : undefined}>{item.label}</SectionAnchor>;
          })}
        </div>

        <div className="nav-actions">
          {profile.githubUrl && (
            <a className="icon-button desktop-social" href={profile.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
              <span className="brand-icon" aria-hidden="true">GH</span>
            </a>
          )}
          {profile.linkedinUrl && (
            <a className="icon-button desktop-social" href={profile.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <span className="brand-icon brand-icon-in" aria-hidden="true">in</span>
            </a>
          )}
          <SoundToggle />
          <ThemeToggle />
          <a className="resume-button" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            Resume <FileDown aria-hidden="true" />
          </a>
          <button className="icon-button menu-button" type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? 'Close menu' : 'Open menu'}>
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`} id="mobile-menu" aria-hidden={!isOpen} inert={isOpen ? undefined : true}>
        <div className="shell mobile-menu-inner">
          {navigation.map((item, index) => {
            const sectionId = item.href.split('#')[1];
            const isActive = activeSection === sectionId;
            return (
              <SectionAnchor key={item.label} href={item.href} sectionId={sectionId} onNavigate={() => setIsOpen(false)} className={isActive ? 'is-active' : ''} aria-current={isActive ? 'location' : undefined}>
                <span>0{index + 1}</span>{item.label}
              </SectionAnchor>
            );
          })}
          <div className="mobile-menu-footer">
            <span>{profile.role}</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
