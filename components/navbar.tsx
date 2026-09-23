'use client';

import { Command, FileDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navigation, profile } from '@/data/profile';
import { SectionAnchor } from './section-anchor';
import { SoundToggle } from './sound-toggle';
import { ThemeToggle } from './theme-toggle';
import { usePortfolioUI } from './portfolio-ui-provider';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { openCommandPalette } = usePortfolioUI();

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
        let current = '';
        sections.forEach((section) => {
          if (section.getBoundingClientRect().top <= window.innerHeight * 0.38) current = section.id;
        });
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
          current = sections.at(-1)?.id ?? current;
        }
        setActiveSection(current);
      });
    };
    update();
    const delayedUpdate = window.setTimeout(update, 180);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('hashchange', update);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(delayedUpdate);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('hashchange', update);
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
        <SectionAnchor className="brand" sectionId="home" aria-label={`${profile.name}, home`} data-sound="navigation">
          AA<span>.</span>
        </SectionAnchor>

        <div className="desktop-nav">
          {navigation.map((item) => {
            const sectionId = item.href.split('#')[1];
            const isActive = activeSection === sectionId;
            return <SectionAnchor key={item.label} href={item.href} sectionId={sectionId} className={isActive ? 'is-active' : ''} aria-current={isActive ? 'location' : undefined} data-sound="navigation">{item.label}</SectionAnchor>;
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
          <button
            className="icon-button command-palette-button"
            type="button"
            onClick={(event) => openCommandPalette(event.currentTarget)}
            aria-label="Open command palette"
            aria-keyshortcuts="Control+K Meta+K"
            data-sound="navigation"
          >
            <Command aria-hidden="true" />
            <span className="command-shortcut" aria-hidden="true">K</span>
          </button>
          <SoundToggle />
          <ThemeToggle />
          <a className="resume-button" href={profile.resumeUrl} target="_blank" rel="noreferrer" data-sound="primary">
            Resume <FileDown aria-hidden="true" />
          </a>
          <button className="icon-button menu-button" type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? 'Close menu' : 'Open menu'} data-sound="menu">
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
              <SectionAnchor key={item.label} href={item.href} sectionId={sectionId} onNavigate={() => setIsOpen(false)} className={isActive ? 'is-active' : ''} aria-current={isActive ? 'location' : undefined} data-sound="navigation">
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
