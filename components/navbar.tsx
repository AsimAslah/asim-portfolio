'use client';

import { FileDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigation, profile } from '@/data/profile';
import { SectionAnchor } from './section-anchor';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="navbar shell" aria-label="Primary navigation">
        <SectionAnchor className="brand" sectionId="home" aria-label={`${profile.name}, home`}>
          AA<span>.</span>
        </SectionAnchor>

        <div className="desktop-nav">
          {navigation.map((item) => {
            const sectionId = item.href.split('#')[1];
            return <SectionAnchor key={item.label} href={item.href} sectionId={sectionId}>{item.label}</SectionAnchor>;
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
          <ThemeToggle />
          <a className="resume-button" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            Resume <FileDown aria-hidden="true" />
          </a>
          <button className="icon-button menu-button" type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? 'Close menu' : 'Open menu'}>
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`} id="mobile-menu">
        <div className="shell mobile-menu-inner">
          {navigation.map((item, index) => {
            const sectionId = item.href.split('#')[1];
            return (
              <SectionAnchor key={item.label} href={item.href} sectionId={sectionId} onNavigate={() => setIsOpen(false)}>
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
