'use client';

import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CodeCompanion } from './code-companion';
import { CommandPalette } from './command-palette';

type PortfolioUIContextValue = {
  openByte: (trigger?: HTMLElement | null) => void;
  openCommandPalette: (trigger?: HTMLElement | null) => void;
};

const PortfolioUIContext = createContext<PortfolioUIContextValue | null>(null);

export function PortfolioUIProvider({ children }: { children: ReactNode }) {
  const [isByteOpen, setIsByteOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const lastByteTriggerRef = useRef<HTMLElement | null>(null);
  const lastPaletteTriggerRef = useRef<HTMLElement | null>(null);

  const openByte = useCallback((trigger?: HTMLElement | null) => {
    if (trigger) lastByteTriggerRef.current = trigger;
    setIsPaletteOpen(false);
    setIsByteOpen(true);
  }, []);

  const handleByteOpenChange = useCallback((isOpen: boolean, trigger?: HTMLElement | null) => {
    if (isOpen) {
      openByte(trigger);
      return;
    }

    setIsByteOpen(false);
    requestAnimationFrame(() => lastByteTriggerRef.current?.focus());
  }, [openByte]);

  const openCommandPalette = useCallback((trigger?: HTMLElement | null) => {
    if (trigger) lastPaletteTriggerRef.current = trigger;
    setIsByteOpen(false);
    setIsPaletteOpen(true);
  }, []);

  const closeCommandPalette = useCallback((restoreFocus = true) => {
    setIsPaletteOpen(false);
    if (restoreFocus) requestAnimationFrame(() => lastPaletteTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'k' || (!event.ctrlKey && !event.metaKey)) return;
      event.preventDefault();
      openCommandPalette(document.activeElement as HTMLElement | null);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openCommandPalette]);

  return (
    <PortfolioUIContext.Provider value={{ openByte, openCommandPalette }}>
      {children}
      <CodeCompanion isOpen={isByteOpen} onOpenChange={handleByteOpenChange} />
      {isPaletteOpen ? (
        <CommandPalette
          isOpen
          onClose={closeCommandPalette}
          onOpenByte={() => {
            closeCommandPalette(false);
            openByte(lastPaletteTriggerRef.current);
          }}
        />
      ) : null}
    </PortfolioUIContext.Provider>
  );
}

export function usePortfolioUI() {
  const context = useContext(PortfolioUIContext);
  if (!context) throw new Error('usePortfolioUI must be used inside PortfolioUIProvider.');
  return context;
}
