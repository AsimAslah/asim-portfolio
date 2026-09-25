'use client';

import {
  type CSSProperties,
  type MouseEvent,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  createMiniByteJumpKeyframes,
  getMiniByteTargetPosition,
  getNextByteTargetIndex,
  type MiniBytePoint,
} from '@/lib/mini-byte';
import { togglePortfolioTheme } from '@/lib/theme';

const BYTE_TARGETS = ['A', 'S', 'I', 'M'] as const;

type MiniByteHeroProps = {
  containerRef: RefObject<HTMLElement | null>;
};

type ByteStyle = CSSProperties & {
  transform: string;
};

export function MiniByteHero({ containerRef }: MiniByteHeroProps) {
  const byteRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const frameRef = useRef(0);
  const isJumpingRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [positions, setPositions] = useState<MiniBytePoint[]>([]);

  const measureTargets = useCallback(() => {
    const container = containerRef.current;
    const byte = byteRef.current;
    if (!container || !byte || isJumpingRef.current) return;

    const targets = Array.from(container.querySelectorAll<HTMLElement>('[data-byte-target]'));
    if (targets.length !== BYTE_TARGETS.length) return;

    const containerBounds = container.getBoundingClientRect();
    const byteSize = { width: byte.offsetWidth, height: byte.offsetHeight };
    const nextPositions = targets.map((target) => (
      getMiniByteTargetPosition(containerBounds, target.getBoundingClientRect(), byteSize)
    ));

    setPositions(nextPositions);
    setIsReady(true);
  }, [containerRef]);

  const scheduleMeasure = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(measureTargets);
  }, [measureTargets]);

  useLayoutEffect(() => {
    scheduleMeasure();

    const container = containerRef.current;
    const byte = byteRef.current;
    const resizeObserver = container && 'ResizeObserver' in window
      ? new ResizeObserver(scheduleMeasure)
      : null;

    if (container) resizeObserver?.observe(container);
    if (byte) resizeObserver?.observe(byte);
    container?.querySelectorAll<HTMLElement>('[data-byte-target]').forEach((target) => resizeObserver?.observe(target));
    window.addEventListener('resize', scheduleMeasure);
    void document.fonts?.ready.then(scheduleMeasure);

    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [containerRef, scheduleMeasure]);

  useEffect(() => () => animationRef.current?.cancel(), []);

  async function jumpToNextLetter(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (isJumpingRef.current || positions.length !== BYTE_TARGETS.length || !byteRef.current) return;

    const nextIndex = getNextByteTargetIndex(currentIndex, positions.length);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const byte = byteRef.current;

    isJumpingRef.current = true;
    setHasInteracted(true);
    togglePortfolioTheme();

    animationRef.current?.cancel();
    const animation = byte.animate(
      createMiniByteJumpKeyframes(positions[currentIndex], positions[nextIndex], reducedMotion),
      {
        duration: reducedMotion ? 240 : 680,
        easing: reducedMotion ? 'ease-out' : 'linear',
        fill: 'forwards',
      },
    );
    animationRef.current = animation;

    try {
      await animation.finished;
    } catch {
      // A resize or unmount can safely cancel the in-flight animation.
    }

    setCurrentIndex(nextIndex);
    isJumpingRef.current = false;
    animationRef.current = null;
    scheduleMeasure();
  }

  const position = positions[currentIndex] ?? { x: 0, y: 0 };
  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  } as ByteStyle;

  return (
    <button
      ref={byteRef}
      type="button"
      className="mini-byte-hero"
      style={style}
      data-ready={isReady ? 'true' : 'false'}
      data-current-letter={BYTE_TARGETS[currentIndex]}
      onClick={jumpToNextLetter}
      onPointerDown={(event) => event.stopPropagation()}
      aria-label="Move Byte to the next letter and switch theme"
      title={`Byte is on ${BYTE_TARGETS[currentIndex]}. Move to ${BYTE_TARGETS[getNextByteTargetIndex(currentIndex, BYTE_TARGETS.length)]}.`}
      data-sound="theme"
    >
      {!hasInteracted ? <span className="mini-byte-hint">Tap me <span aria-hidden="true">👋</span></span> : null}
      <span className="mini-byte-idle" aria-hidden="true">
        <span className="mini-byte-glow" />
        <span className="mini-byte-shell">
          <span className="mini-byte-signal"><i /></span>
          <span className="mini-byte-face">
            <span className="mini-byte-eye"><i /></span>
            <span className="mini-byte-eye"><i /></span>
            <b />
          </span>
          <span className="mini-byte-mark">BYTE</span>
        </span>
      </span>
    </button>
  );
}
