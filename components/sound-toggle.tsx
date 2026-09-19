'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';

const SOUND_PREFERENCE_KEY = 'asim-portfolio-sound';

function playInterfaceTone(kind: 'hover' | 'click' | 'enabled', contextRef: MutableRefObject<AudioContext | null>) {
  try {
    const context = contextRef.current ?? new AudioContext();
    contextRef.current = context;
    if (context.state === 'suspended') void context.resume();

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    const settings = {
      hover: { frequency: 520, duration: 0.035, volume: 0.012 },
      click: { frequency: 310, duration: 0.07, volume: 0.025 },
      enabled: { frequency: 660, duration: 0.12, volume: 0.035 },
    }[kind];

    oscillator.type = kind === 'click' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(settings.frequency, now);
    if (kind === 'enabled') oscillator.frequency.exponentialRampToValueAtTime(880, now + settings.duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(settings.volume, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + settings.duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + settings.duration + 0.02);
  } catch {
    // Audio is an enhancement; unsupported browsers keep the interface silent.
  }
}

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setEnabled(localStorage.getItem(SOUND_PREFERENCE_KEY) === 'on');
    setReady(true);
    return () => {
      if (contextRef.current) void contextRef.current.close();
    };
  }, []);

  const play = useCallback((kind: 'hover' | 'click' | 'enabled') => {
    playInterfaceTone(kind, contextRef);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lastHoverTarget: Element | null = null;

    const onPointerOver = (event: PointerEvent) => {
      if (!finePointer || reduceMotion) return;
      const target = (event.target as Element | null)?.closest('a, button');
      if (!target || target === lastHoverTarget || target.hasAttribute('data-sound-ignore')) return;
      lastHoverTarget = target;
      play('hover');
    };
    const onPointerOut = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest('a, button');
      if (target === lastHoverTarget) lastHoverTarget = null;
    };
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest('a, button');
      if (target && !target.hasAttribute('data-sound-ignore')) play('click');
    };

    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('click', onClick);
    };
  }, [enabled, play]);

  function toggleSound() {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(SOUND_PREFERENCE_KEY, next ? 'on' : 'off');
    if (next) play('enabled');
  }

  return (
    <button
      type="button"
      className="icon-button sound-toggle"
      onClick={toggleSound}
      aria-label={enabled ? 'Turn interface sound off' : 'Turn interface sound on'}
      aria-pressed={enabled}
      title={enabled ? 'Sound on' : 'Sound off'}
      data-sound-ignore
      suppressHydrationWarning
    >
      {ready && enabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
      <span className="sound-state" aria-hidden="true">{enabled ? 'ON' : 'OFF'}</span>
    </button>
  );
}
