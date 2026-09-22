'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';

const SOUND_PREFERENCE_KEY = 'asim-portfolio-sound';
const soundKinds = ['primary', 'navigation', 'project', 'theme', 'menu', 'success'] as const;
type SoundKind = (typeof soundKinds)[number] | 'toggle-on' | 'toggle-off';

const toneSettings: Record<SoundKind, { frequency: number; endFrequency: number; duration: number; volume: number }> = {
  primary: { frequency: 250, endFrequency: 390, duration: 0.075, volume: 0.42 },
  navigation: { frequency: 520, endFrequency: 610, duration: 0.045, volume: 0.35 },
  project: { frequency: 220, endFrequency: 360, duration: 0.085, volume: 0.44 },
  theme: { frequency: 630, endFrequency: 430, duration: 0.08, volume: 0.38 },
  menu: { frequency: 380, endFrequency: 510, duration: 0.06, volume: 0.37 },
  success: { frequency: 520, endFrequency: 820, duration: 0.11, volume: 0.4 },
  'toggle-on': { frequency: 480, endFrequency: 760, duration: 0.1, volume: 0.46 },
  'toggle-off': { frequency: 440, endFrequency: 260, duration: 0.085, volume: 0.4 },
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
    const overtone = context.createOscillator();
    const gain = context.createGain();
    const overtoneGain = context.createGain();
    const filter = context.createBiquadFilter();
    const master = context.createGain();
    const now = context.currentTime;
    const settings = toneSettings[kind];

    oscillator.type = kind === 'primary' || kind === 'project' ? 'triangle' : 'sine';
    overtone.type = 'sine';
    oscillator.frequency.setValueAtTime(settings.frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(settings.endFrequency, now + settings.duration);
    overtone.frequency.setValueAtTime(settings.frequency * 1.5, now);
    overtone.frequency.exponentialRampToValueAtTime(settings.endFrequency * 1.35, now + settings.duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(settings.volume, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + settings.duration);
    overtoneGain.gain.setValueAtTime(0.0001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(settings.volume * 0.16, now + 0.003);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + settings.duration * 0.72);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.Q.value = 0.7;
    master.gain.value = 0.46;
    oscillator.connect(gain);
    overtone.connect(overtoneGain);
    gain.connect(filter);
    overtoneGain.connect(filter);
    filter.connect(master);
    master.connect(context.destination);
    oscillator.addEventListener('ended', () => {
      oscillator.disconnect();
      overtone.disconnect();
      gain.disconnect();
      overtoneGain.disconnect();
      filter.disconnect();
      master.disconnect();
    }, { once: true });
    oscillator.start(now);
    overtone.start(now);
    oscillator.stop(now + settings.duration + 0.02);
    overtone.stop(now + settings.duration + 0.02);
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
      <span className="sound-waves" aria-hidden="true"><i /><i /><i /></span>
      <span className="sr-only" aria-live="polite">Interface sounds {enabled ? 'enabled' : 'disabled'}</span>
    </button>
  );
}
