'use client';

import { type MouseEvent, type PointerEvent, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

type HeroByteProps = {
  onOpen: (trigger: HTMLButtonElement) => void;
};

export function HeroByte({ onOpen }: HeroByteProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef(0);
  const wakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isWaking, setIsWaking] = useState(false);

  useEffect(() => () => {
    cancelAnimationFrame(frameRef.current);
    if (wakeTimerRef.current) clearTimeout(wakeTimerRef.current);
  }, []);

  function resetPointer() {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      trigger.style.setProperty('--byte-eye-x', '0px');
      trigger.style.setProperty('--byte-eye-y', '0px');
      trigger.style.setProperty('--byte-shift-x', '0px');
      trigger.style.setProperty('--byte-shift-y', '0px');
      trigger.style.setProperty('--byte-rotate', '0deg');
    });
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const { clientX, clientY, currentTarget } = event;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const bounds = currentTarget.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2)));
      const y = Math.max(-1, Math.min(1, (clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2)));

      currentTarget.style.setProperty('--byte-eye-x', `${(x * 4).toFixed(2)}px`);
      currentTarget.style.setProperty('--byte-eye-y', `${(y * 3).toFixed(2)}px`);
      currentTarget.style.setProperty('--byte-shift-x', `${(x * 3).toFixed(2)}px`);
      currentTarget.style.setProperty('--byte-shift-y', `${(y * 2).toFixed(2)}px`);
      currentTarget.style.setProperty('--byte-rotate', `${(x * 1.8).toFixed(2)}deg`);
    });
  }

  function handleOpen(event: MouseEvent<HTMLButtonElement>) {
    setIsWaking(true);
    if (wakeTimerRef.current) clearTimeout(wakeTimerRef.current);
    wakeTimerRef.current = setTimeout(() => setIsWaking(false), 460);
    onOpen(event.currentTarget);
  }

  return (
    <div className="hero-byte-slot">
      <button
        ref={triggerRef}
        type="button"
        className={`hero-byte-trigger ${isWaking ? 'is-waking' : ''}`}
        onClick={handleOpen}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        aria-label="Open BYTE, Asim's interactive portfolio guide"
        aria-haspopup="dialog"
        data-sound="success"
      >
        <span className="hero-byte-float" aria-hidden="true">
          <span className="hero-byte-visual">
            <span className="hero-byte-halo" />
            <span className="hero-byte-orbit hero-byte-orbit-one" />
            <span className="hero-byte-orbit hero-byte-orbit-two" />
            <span className="hero-byte-parallax">
              <span className="hero-byte-shell">
                <span className="hero-byte-signal"><i /></span>
                <span className="hero-byte-face">
                  <span className="hero-byte-eye"><i /></span>
                  <span className="hero-byte-eye"><i /></span>
                  <b />
                </span>
                <span className="hero-byte-mark">BYTE</span>
              </span>
            </span>
          </span>
        </span>

        <span className="hero-byte-copy">
          <span className="hero-byte-heading"><strong>BYTE</strong><small>Portfolio guide</small></span>
          <span className="hero-byte-prompt">Ask me about Asim&apos;s work</span>
          <span className="hero-byte-start">Start <ArrowRight aria-hidden="true" /></span>
        </span>
      </button>
    </div>
  );
}
