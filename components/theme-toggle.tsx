'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPortfolioTheme, PORTFOLIO_THEME_CHANGE_EVENT, togglePortfolioTheme } from '@/lib/theme';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const syncTheme = () => setIsDark(getPortfolioTheme() === 'dark');
    const frame = requestAnimationFrame(syncTheme);

    window.addEventListener(PORTFOLIO_THEME_CHANGE_EVENT, syncTheme);
    window.addEventListener('storage', syncTheme);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(PORTFOLIO_THEME_CHANGE_EVENT, syncTheme);
      window.removeEventListener('storage', syncTheme);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = togglePortfolioTheme();
    setIsDark(nextTheme === 'dark');
  }

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      data-sound="theme"
      suppressHydrationWarning
    >
      <Moon className="theme-moon" aria-hidden="true" />
      <Sun className="theme-sun" aria-hidden="true" />
    </button>
  );
}
