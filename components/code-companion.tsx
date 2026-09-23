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

  if (!isOpen) return null;

  return (
    <div className="code-companion is-open">
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
    </div>
  );
}
