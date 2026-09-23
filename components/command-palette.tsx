'use client';

import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BriefcaseBusiness, FileDown, FolderKanban, Search, Sparkles, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { profile, projects } from '@/data/profile';

type CommandPaletteProps = {
  isOpen: boolean;
  onClose: (restoreFocus?: boolean) => void;
  onOpenByte: () => void;
};

type PaletteCommand = {
  group: 'Navigate' | 'Projects' | 'Actions';
  href?: string;
  id: string;
  keywords: string;
  label: string;
  type?: 'byte' | 'resume';
};

const navigationCommands: PaletteCommand[] = [
  { id: 'home', label: 'Home', href: '/#home', group: 'Navigate', keywords: 'hero start' },
  { id: 'projects', label: 'Projects', href: '/#projects', group: 'Navigate', keywords: 'work case studies' },
  { id: 'experience', label: 'Experience', href: '/#experience', group: 'Navigate', keywords: 'internship realviz brickrat' },
  { id: 'about', label: 'About and education', href: '/#about', group: 'Navigate', keywords: 'bio college study' },
  { id: 'skills', label: 'Technical skills', href: '/#skills', group: 'Navigate', keywords: 'technology stack tools' },
  { id: 'contact', label: 'Contact', href: '/#contact', group: 'Navigate', keywords: 'email linkedin whatsapp hire' },
  { id: 'feedback', label: 'Feedback', href: '/#feedback', group: 'Navigate', keywords: 'rating review' },
  { id: 'build', label: 'How this portfolio was built', href: '/build', group: 'Navigate', keywords: 'architecture cloudflare accessibility engineering' },
];

const actionCommands: PaletteCommand[] = [
  { id: 'byte', label: 'Ask BYTE', group: 'Actions', keywords: 'assistant portfolio guide', type: 'byte' },
  { id: 'resume', label: 'Open résumé', href: profile.resumeUrl, group: 'Actions', keywords: 'cv download', type: 'resume' },
];

const projectCommands: PaletteCommand[] = projects.map((project) => ({
  id: `project-${project.slug}`,
  label: project.shortTitle,
  href: `/projects/${project.slug}`,
  group: 'Projects',
  keywords: `${project.title} ${project.label} ${project.summary} ${project.technologies.join(' ')}`,
}));

const allCommands = [...navigationCommands, ...projectCommands, ...actionCommands];

function commandIcon(command: PaletteCommand) {
  if (command.type === 'byte') return <Sparkles aria-hidden="true" />;
  if (command.type === 'resume') return <FileDown aria-hidden="true" />;
  if (command.group === 'Projects') return <FolderKanban aria-hidden="true" />;
  return <BriefcaseBusiness aria-hidden="true" />;
}

export function CommandPalette({ isOpen, onClose, onOpenByte }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const filteredCommands = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return allCommands;
    return allCommands.filter((command) => `${command.label} ${command.keywords}`.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add('command-palette-open');
    requestAnimationFrame(() => inputRef.current?.focus());

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('input, button:not(:disabled), a[href]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('command-palette-open');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function runCommand(command: PaletteCommand) {
    if (command.type === 'byte') {
      onOpenByte();
      return;
    }
    if (command.type === 'resume' && command.href) {
      window.open(command.href, '_blank', 'noopener,noreferrer');
      onClose();
      return;
    }
    if (!command.href) return;

    onClose(false);
    if (command.href.startsWith('/#') && pathname === '/') {
      const sectionId = command.href.slice(2);
      const target = document.getElementById(sectionId);
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${sectionId}`);
      return;
    }
    router.push(command.href);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((index) => (index + 1) % Math.max(filteredCommands.length, 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((index) => (index - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
    } else if (event.key === 'Enter' && filteredCommands[selectedIndex]) {
      event.preventDefault();
      runCommand(filteredCommands[selectedIndex]);
    }
  }

  return (
    <div className="command-palette-backdrop" onMouseDown={() => onClose()}>
      <div
        ref={dialogRef}
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div><span className="micro-label">Quick navigation</span><h2 id="command-palette-title">Go anywhere</h2></div>
          <button type="button" onClick={() => onClose()} aria-label="Close command palette"><X aria-hidden="true" /></button>
        </header>
        <label className="command-palette-search">
          <Search aria-hidden="true" />
          <span className="sr-only">Search portfolio commands</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search pages, projects, or actions…"
            role="combobox"
            aria-controls="command-palette-results"
            aria-expanded="true"
            aria-activedescendant={filteredCommands[selectedIndex] ? `command-${filteredCommands[selectedIndex].id}` : undefined}
            autoComplete="off"
          />
          <kbd>Esc</kbd>
        </label>

        <div className="command-palette-results" id="command-palette-results" role="listbox" aria-label="Portfolio commands">
          {filteredCommands.length ? filteredCommands.map((command, index) => (
            <button
              type="button"
              id={`command-${command.id}`}
              role="option"
              aria-selected={index === selectedIndex}
              className={index === selectedIndex ? 'is-selected' : undefined}
              key={command.id}
              onMouseMove={() => setSelectedIndex(index)}
              onClick={() => runCommand(command)}
            >
              <span className="command-icon">{commandIcon(command)}</span>
              <span><strong>{command.label}</strong><small>{command.group}</small></span>
              <ArrowRight aria-hidden="true" />
            </button>
          )) : (
            <p className="command-empty">No matching page or project. Try a broader search.</p>
          )}
        </div>
        <footer><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>Enter</kbd> Open</span></footer>
      </div>
    </div>
  );
}
