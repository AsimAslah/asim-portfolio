'use client';

import { useEffect, useRef } from 'react';

export function InteractionLayer() {
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!ring || !glow) return;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ring.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        ring.dataset.visible = 'true';
        glow.dataset.visible = 'true';
      });
    };
    const onPointerOver = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest('a, button, [data-cursor="focus"]')) ring.dataset.active = 'true';
    };
    const onPointerOut = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest('a, button, [data-cursor="focus"]')) ring.dataset.active = 'false';
    };
    const onPointerLeave = () => {
      ring.dataset.visible = 'false';
      glow.dataset.visible = 'false';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  return (
    <div className="interaction-layer" aria-hidden="true">
      <div ref={glowRef} className="pointer-glow" />
      <div ref={ringRef} className="pointer-ring" />
    </div>
  );
}
