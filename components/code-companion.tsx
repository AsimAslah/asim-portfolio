'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import { BYTE_SUGGESTIONS, getByteAnswer, type ByteAnswer } from '@/lib/byte';

type CodeCompanionProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean, trigger?: HTMLButtonElement | null) => void;
};

export function CodeCompanion({ isOpen, onOpenChange }: CodeCompanionProps) {
  const [answer, setAnswer] = useState<ByteAnswer | null>(null);
  const [answeredQuestion, setAnsweredQuestion] = useState('');
  const [query, setQuery] = useState('');
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      onOpenChange(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!answer) return;

    const frame = requestAnimationFrame(() => {
      const conversation = conversationRef.current;
      if (!conversation) return;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      conversation.scrollTo({
        top: conversation.scrollHeight,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [answer]);

  function askByte(question: string) {
    setAnsweredQuestion(question);
    setAnswer({ ...getByteAnswer(question) });
    setQuery('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = query.trim();
    if (question) askByte(question);
  }

  function closeByte() {
    onOpenChange(false);
  }

  return (
    <div className={`code-companion ${isOpen ? 'is-open' : ''}`}>
      {isOpen ? (
        <section className="byte-panel" id="byte-panel" role="dialog" aria-modal="false" aria-label="BYTE portfolio assistant">
          <header className="byte-panel-header">
            <span><strong>BYTE</strong><small>Portfolio guide</small></span>
            <button type="button" onClick={closeByte} aria-label="Close BYTE" data-sound="navigation">
              <X aria-hidden="true" />
            </button>
          </header>

          <div ref={conversationRef} className="byte-conversation" role="log" aria-live="polite" aria-relevant="additions text">
            <p><span>BYTE</span> Hi — I can help you explore Asim&apos;s work using verified content from this portfolio.</p>
            {answer ? (
              <div className="byte-answer">
                <p className="byte-asked"><span>You asked</span>{answeredQuestion}</p>
                <p className="byte-answer-copy"><span>BYTE</span> {answer.text}</p>
                <div className="byte-answer-links">
                  {answer.links.map((link) => {
                    const isExternal = link.href.startsWith('http');
                    return (
                      <a
                        href={link.href}
                        key={`${link.href}-${link.label}`}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        data-sound="navigation"
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div className="byte-suggestion-wrap">
            <p>Try a verified question</p>
            <div className="byte-suggestions" aria-label="Suggested questions">
              {BYTE_SUGGESTIONS.map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => askByte(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <form className="byte-question" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="byte-question">Ask BYTE about Asim&apos;s portfolio</label>
            <input
              ref={inputRef}
              id="byte-question"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ask about projects, skills, or contact…"
              autoComplete="off"
            />
            <button type="submit" aria-label="Ask BYTE" disabled={!query.trim()}>
              <Send aria-hidden="true" />
            </button>
          </form>
          <p className="byte-disclosure">Scripted from verified portfolio content — no live AI service.</p>
        </section>
      ) : (
        <p className="code-companion-note" id="code-companion-note">Ask BYTE about this portfolio.</p>
      )}
      <button
        ref={launcherRef}
        type="button"
        className="code-companion-button"
        onClick={() => onOpenChange(!isOpen, launcherRef.current)}
        aria-expanded={isOpen}
        aria-controls="byte-panel"
        aria-describedby={isOpen ? undefined : 'code-companion-note'}
        aria-label={isOpen ? 'Close BYTE portfolio guide' : 'Open BYTE portfolio guide'}
        data-sound="success"
      >
        <span className="bot-antenna" aria-hidden="true"><i /></span>
        <span className="bot-face" aria-hidden="true"><i /><i /><b /></span>
        <span className="bot-body" aria-hidden="true">{'</>'}</span>
        <span className="bot-name" aria-hidden="true">BYTE / GUIDE</span>
      </button>
    </div>
  );
}
