'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

type SectionAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> & {
  children: ReactNode;
  href?: string;
  onNavigate?: () => void;
  sectionId: string;
};

export function SectionAnchor({ children, href, onNavigate, sectionId, ...props }: SectionAnchorProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return;

    const target = document.getElementById(sectionId);
    if (!target) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.pushState(null, '', `#${sectionId}`);
  };

  return (
    <a href={href ?? `/#${sectionId}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
