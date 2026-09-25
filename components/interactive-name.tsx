'use client';

import { type CSSProperties, useRef, useState } from 'react';
import { MiniByteHero } from './mini-byte-hero';

type LetterStyle = CSSProperties & {
  '--bump-delay': string;
  '--bump-rotate': string;
  '--bump-x': string;
  '--bump-y': string;
};

const letterMotion: Array<Omit<LetterStyle, '--bump-delay'>> = [
  { '--bump-x': '-0.08em', '--bump-y': '-0.12em', '--bump-rotate': '-4deg' },
  { '--bump-x': '0.04em', '--bump-y': '0.09em', '--bump-rotate': '3deg' },
  { '--bump-x': '-0.03em', '--bump-y': '-0.07em', '--bump-rotate': '-2deg' },
  { '--bump-x': '0.07em', '--bump-y': '-0.03em', '--bump-rotate': '4deg' },
  { '--bump-x': '-0.05em', '--bump-y': '0.08em', '--bump-rotate': '-3deg' },
  { '--bump-x': '0.06em', '--bump-y': '-0.1em', '--bump-rotate': '3deg' },
  { '--bump-x': '-0.04em', '--bump-y': '0.05em', '--bump-rotate': '-2deg' },
  { '--bump-x': '0.05em', '--bump-y': '-0.06em', '--bump-rotate': '2deg' },
  { '--bump-x': '-0.02em', '--bump-y': '0.07em', '--bump-rotate': '-3deg' },
];

function NameWord({
  children,
  offset = 0,
  className = '',
  isBytePath = false,
}: {
  children: string;
  offset?: number;
  className?: string;
  isBytePath?: boolean;
}) {
  return (
    <span className={`name-word ${className}`} aria-hidden="true">
      {[...children].map((letter, index) => (
        <span
          className="name-letter"
          key={`${letter}-${index}`}
          data-byte-target={isBytePath ? letter : undefined}
          style={{
            ...letterMotion[offset + index],
            '--bump-delay': `${(offset + index) * 18}ms`,
          } as LetterStyle}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export function InteractiveName() {
  const [bumpVersion, setBumpVersion] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="interactive-name-stage" ref={stageRef}>
        <h1>
          <button
            type="button"
            className="interactive-name"
            aria-label="Asim Aslah"
            aria-describedby="interactive-name-hint"
            data-bumping={bumpVersion > 0 ? 'true' : 'false'}
            data-bump-version={bumpVersion}
            data-sound="success"
            onClick={() => setBumpVersion((version) => version + 1)}
          >
            <span className="interactive-name-letters" key={bumpVersion}>
              <NameWord isBytePath>ASIM</NameWord>
              <NameWord className="name-word-last" offset={4}>ASLAH</NameWord>
              <span className="name-dot" aria-hidden="true">.</span>
            </span>
          </button>
        </h1>
        <MiniByteHero containerRef={stageRef} />
      </div>
      <span className="sr-only" id="interactive-name-hint">
        Activate to gently move the letters. The name returns to its original position.
      </span>
    </>
  );
}
