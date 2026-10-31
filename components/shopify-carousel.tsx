'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const slides = [
  {
    src: '/images/projects/asimon-charcoal-utility-overshirt.png',
    alt: 'Asim Aslah modelling the ASIMON Charcoal Utility Overshirt',
    eyebrow: 'ASIMON / Overshirt',
    title: 'Charcoal Utility Overshirt',
    detail: '$89.00 · Sizes S–XL',
    position: 'center 42%',
  },
  {
    src: '/images/projects/asimon-noir-crossbody-bag.png',
    alt: 'Asim Aslah modelling the ASIMON Noir Crossbody Bag',
    eyebrow: 'ASIMON / Accessories',
    title: 'Noir Crossbody Bag',
    detail: '$59.00 · One size',
    position: 'center 40%',
  },
  {
    src: '/images/projects/asimon-noir-tailored-blazer.png',
    alt: 'Asim Aslah modelling the ASIMON Noir Tailored Blazer',
    eyebrow: 'ASIMON / Tailoring',
    title: 'Noir Tailored Blazer',
    detail: '$129.00 · Sizes S–XL',
    position: 'center 42%',
  },
] as const;

export function ShopifyCarousel({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const select = (index: number) => {
    setActive((index + slides.length) % slides.length);
    setPaused(true);
  };

  return (
    <div
      className={`shopify-carousel ${compact ? 'is-compact' : ''}`}
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="ASIMON Shopify campaign gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!regionRef.current?.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="shopify-carousel-status">
        <span><i aria-hidden="true" /> Completed</span>
        <small>Shopify e-commerce project</small>
      </div>

      <div className="shopify-carousel-media" aria-live="polite">
        {slides.map((slide, index) => (
          <figure className={`shopify-carousel-slide ${active === index ? 'is-active' : ''}`} key={slide.src} aria-hidden={active !== index}>
            <Image
              src={slide.src}
              alt={active === index ? slide.alt : ''}
              fill
              sizes={compact ? '(max-width: 900px) calc(100vw - 48px), 570px' : '(max-width: 900px) 80vw, 370px'}
              style={{ objectPosition: slide.position }}
              priority={index === 0 && compact}
            />
            <figcaption>
              <small>{slide.eyebrow}</small>
              <strong>{slide.title}</strong>
              <span>{slide.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="shopify-carousel-title">
        <strong>ASIMON Fashion Studio</strong>
        <span>Shopify E-commerce Project</span>
      </div>

      <button className="shopify-carousel-arrow is-previous" type="button" onClick={() => select(active - 1)} aria-label="Previous campaign photo">
        <ChevronLeft aria-hidden="true" />
      </button>
      <button className="shopify-carousel-arrow is-next" type="button" onClick={() => select(active + 1)} aria-label="Next campaign photo">
        <ChevronRight aria-hidden="true" />
      </button>

      <div className="shopify-carousel-dots" aria-label="Choose campaign photo">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.src}
            className={active === index ? 'is-active' : ''}
            onClick={() => select(index)}
            aria-label={`Show photo ${index + 1}: ${slide.title}`}
            aria-current={active === index ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
