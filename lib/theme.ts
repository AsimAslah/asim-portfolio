export const PORTFOLIO_THEME_CHANGE_EVENT = 'portfolio-theme-change';

export type PortfolioTheme = 'light' | 'dark';

let transitionTimer: ReturnType<typeof setTimeout> | null = null;

export function getPortfolioTheme(): PortfolioTheme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function setPortfolioTheme(theme: PortfolioTheme) {
  const root = document.documentElement;

  root.classList.add('theme-switching');
  root.classList.toggle('dark', theme === 'dark');

  try {
    localStorage.setItem('theme', theme);
  } catch {
    // The selected theme still applies for the current visit.
  }

  window.dispatchEvent(new CustomEvent<PortfolioTheme>(PORTFOLIO_THEME_CHANGE_EVENT, { detail: theme }));

  if (transitionTimer) clearTimeout(transitionTimer);
  transitionTimer = setTimeout(() => {
    root.classList.remove('theme-switching');
    transitionTimer = null;
  }, 450);
}

export function togglePortfolioTheme() {
  const nextTheme = getPortfolioTheme() === 'dark' ? 'light' : 'dark';
  setPortfolioTheme(nextTheme);
  return nextTheme;
}
