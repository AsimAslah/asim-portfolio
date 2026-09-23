'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { FEEDBACK_MAX_LENGTH, type FeedbackState } from '@/lib/feedback';
import { hasCompletedFeedback, rememberCompletedFeedback } from '@/lib/feedback-completion';
import { Reveal } from './reveal';

type RequestStatus = 'idle' | 'submitting' | 'success' | 'error';

function getBrowserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function FeedbackSection() {
  const [rating, setRating] = useState(0);
  const [previewRating, setPreviewRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [summary, setSummary] = useState<FeedbackState['summary'] | null>(null);
  const [summaryUnavailable, setSummaryUnavailable] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [completionChecked, setCompletionChecked] = useState(false);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [message, setMessage] = useState('');
  const pendingRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const storage = getBrowserStorage();
    const storedCompletion = hasCompletedFeedback(storage);
    window.queueMicrotask(() => {
      if (!active) return;
      if (storedCompletion) {
        setSubmitted(true);
        setStatus('success');
        setMessage('Thanks — your feedback has already been recorded.');
      }
      setCompletionChecked(true);
    });

    async function loadFeedback() {
      try {
        const response = await fetch('/api/feedback', {
          cache: 'no-store',
          credentials: 'same-origin',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Feedback service unavailable');

        const data = (await response.json()) as FeedbackState;
        setSummary(data.summary);
        if (data.submission) {
          setRating(data.submission.rating);
          setSubmitted(true);
          setStatus('success');
          setMessage('Thanks — your feedback has already been recorded.');
          rememberCompletedFeedback(storage);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setSummaryUnavailable(true);
      }
    }

    loadFeedback();
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRef.current || submitted) return;
    if (!rating) {
      setStatus('error');
      setMessage('Choose a rating before sending.');
      return;
    }

    pendingRef.current = true;
    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, feedback }),
      });
      const data = (await response.json()) as Partial<FeedbackState> & { error?: string };

      if (response.status === 409 && data.summary && data.submission) {
        setSummary(data.summary);
        setRating(data.submission.rating);
        setSubmitted(true);
        setStatus('success');
        setMessage('Thanks for your feedback!');
        rememberCompletedFeedback(getBrowserStorage());
        return;
      }
      if (!response.ok || !data.summary) {
        throw new Error(data.error || 'Feedback could not be sent right now. Please try again.');
      }

      setSummary(data.summary);
      setSubmitted(true);
      setFeedback('');
      setStatus('success');
      setMessage('Thanks for your feedback!');
      rememberCompletedFeedback(getBrowserStorage());
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Feedback could not be sent right now. Please try again.',
      );
    } finally {
      pendingRef.current = false;
    }
  }

  const visibleRating = previewRating || rating;
  const isBusy = status === 'submitting';

  return (
    <section className="section shell feedback-section" aria-labelledby="feedback-heading">
      <Reveal className="feedback-card">
        <div className="feedback-heading">
          <p className="micro-label">Feedback / 06</p>
          <h2 id="feedback-heading">How was your experience?</h2>
          <p className="feedback-summary" aria-live="polite">
            {summary
              ? summary.total > 0 && summary.average !== null
                ? `${summary.average.toFixed(1)} / 5 · ${summary.total} ${summary.total === 1 ? 'rating' : 'ratings'}`
                : 'No ratings yet'
              : summaryUnavailable
                ? 'Ratings are temporarily unavailable'
                : 'Loading rating…'}
          </p>
        </div>

        {submitted ? (
          <div className="feedback-thanks" role="status">
            <span aria-hidden="true">✓</span>
            <div>
              <strong>Thank you for the feedback.</strong>
              <p>{message || 'Your response has been recorded for this browser.'}</p>
            </div>
          </div>
        ) : completionChecked ? (
          <form className="feedback-form" onSubmit={handleSubmit} noValidate>
            <fieldset disabled={isBusy || submitted}>
            <legend className="sr-only">Rate this portfolio from 1 to 5 stars</legend>
            <div
              className="feedback-stars"
              onMouseLeave={() => setPreviewRating(0)}
              aria-label="Portfolio rating"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <label
                  className={value <= visibleRating ? 'is-active' : undefined}
                  key={value}
                  onMouseEnter={() => setPreviewRating(value)}
                >
                  <input
                    type="radio"
                    name="portfolio-rating"
                    value={value}
                    checked={rating === value}
                    onChange={() => {
                      setRating(value);
                      setStatus('idle');
                      setMessage('');
                    }}
                    onFocus={() => setPreviewRating(value)}
                    onBlur={() => setPreviewRating(0)}
                    aria-label={`${value} ${value === 1 ? 'star' : 'stars'}`}
                    required
                  />
                  <span aria-hidden="true">{value <= visibleRating ? '★' : '☆'}</span>
                </label>
              ))}
            </div>

            <div className="feedback-field">
              <label className="sr-only" htmlFor="portfolio-feedback">
                Share a quick thought (optional)
              </label>
              <textarea
                id="portfolio-feedback"
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                maxLength={FEEDBACK_MAX_LENGTH}
                rows={3}
                placeholder="Share a quick thought (optional)"
              />
              <output className="feedback-counter" htmlFor="portfolio-feedback" aria-live="polite">
                {feedback.length} / {FEEDBACK_MAX_LENGTH}
              </output>
            </div>
            </fieldset>

            <div className="feedback-actions">
              <button className="feedback-submit" type="submit" disabled={isBusy || submitted}>
                {isBusy ? 'Sending…' : submitted ? 'Feedback sent' : 'Send feedback'}
              </button>
              {message ? (
                <p
                  className={`feedback-message ${status === 'error' ? 'is-error' : 'is-success'}`}
                  role={status === 'error' ? 'alert' : 'status'}
                >
                  {message}
                </p>
              ) : null}
            </div>
          </form>
        ) : (
          <p className="feedback-checking" role="status">Checking feedback status…</p>
        )}
      </Reveal>
    </section>
  );
}
