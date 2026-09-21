'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';

const SOUND_PREFERENCE_KEY = 'asim-portfolio-sound';
const soundKinds = ['primary', 'navigation', 'project', 'theme', 'menu'] as const;
type SoundKind = (typeof soundKinds)[number] | 'toggle-on' | 'toggle-off';

const toneSettings: Record<SoundKind, { frequency: number; endFrequency: number; duration: number; volume: number }> = {
  primary: { frequency: 310, endFrequency: 410, duration: 0.1, volume: 0.04 },
  navigation: { frequency: 440, endFrequency: 540, duration: 0.07, volume: 0.025 },
  project: { frequency: 270, endFrequency: 380, duration: 0.12, volume: 0.038 },
  theme: { frequency: 560, endFrequency: 410, duration: 0.1, volume: 0.03 },
  menu: { frequency: 390, endFrequency: 490, duration: 0.08, volume: 0.027 },
  'toggle-on': { frequency: 520, endFrequency: 780, duration: 0.14, volume: 0.05 },
  'toggle-off': { frequency: 430, endFrequency: 280, duration: 0.12, volume: 0.038 },
};

type AudioWindow = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };

async function playInterfaceTone(kind: SoundKind, contextRef: MutableRefObject<AudioContext | null>) {
  try {
    const AudioContextConstructor = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!AudioContextConstructor) return;

    const context = contextRef.current?.state === 'closed'
      ? new AudioContextConstructor()
      : contextRef.current ?? new AudioContextConstructor();
    contextRef.current = context;
    if (context.state === 'suspended') await context.resume();
    if (context.state !== 'running') return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    const settings = toneSettings[kind];

    oscillator.type = kind === 'primary' || kind === 'project' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(settings.frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(settings.endFrequency, now + settings.duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(settings.volume, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + settings.duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.addEventListener('ended', () => {
      oscillator.disconnect();
      gain.disconnect();
    }, { once: true });
    oscillator.start(now);
    oscillator.stop(now + settings.duration + 0.02);
  } catch {
    // Audio is an optional enhancement; unsupported browsers stay silent.
  }
}

function isScopedSound(value: string | undefined): value is (typeof soundKinds)[number] {
  return soundKinds.some((kind) => kind === value);
}

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        setEnabled(localStorage.getItem(SOUND_PREFERENCE_KEY) === 'on');
      } catch {
        // Default to silent when storage is unavailable.
      } finally {
        setReady(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const play = useCallback((kind: SoundKind) => {
    void playInterfaceTone(kind, contextRef);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>('[data-sound]');
      if (!target || target.hasAttribute('data-sound-ignore')) return;
      const kind = target.dataset.sound;
      if (isScopedSound(kind)) play(kind);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [enabled, play]);

  function toggleSound() {
    const next = !enabled;
    play(next ? 'toggle-on' : 'toggle-off');
    setEnabled(next);
    try {
      localStorage.setItem(SOUND_PREFERENCE_KEY, next ? 'on' : 'off');
    } catch {
      // The preference is non-essential when storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      className={`icon-button sound-toggle ${enabled ? 'is-sound-on' : ''}`}
      onClick={toggleSound}
      aria-label={enabled ? 'Turn interface sound off' : 'Turn interface sound on'}
      aria-pressed={enabled}
      title={enabled ? 'Sound on' : 'Sound off'}
      data-sound-ignore
      suppressHydrationWarning
    >
      {ready && enabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
      <span className="sound-state" aria-hidden="true">{enabled ? 'ON' : 'OFF'}</span>
      <span className="sr-only" aria-live="polite">Interface sounds {enabled ? 'enabled' : 'disabled'}</span>
    </button>
  );
}
