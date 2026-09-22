'use client';

import { useState } from 'react';

export function CodeCompanion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`code-companion ${isOpen ? 'is-open' : ''}`}>
      <p className="code-companion-note" id="code-companion-note" aria-live="polite">
        {isOpen ? 'Yep, I built this. Now I’m probably debugging. 👀' : 'Byte is checking the edge cases.'}
      </p>
      <button
        type="button"
        className="code-companion-button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-describedby="code-companion-note"
        aria-label={isOpen ? 'Hide Byte the edge-case bot message' : 'Meet Byte, the edge-case bot'}
        data-sound="success"
      >
        <span className="bot-antenna" aria-hidden="true"><i /></span>
        <span className="bot-face" aria-hidden="true"><i /><i /><b /></span>
        <span className="bot-body" aria-hidden="true">{'</>'}</span>
        <span className="bot-name" aria-hidden="true">BYTE / QA</span>
      </button>
    </div>
  );
}
