import assert from 'node:assert/strict';
import test from 'node:test';
import {
  FEEDBACK_MAX_LENGTH,
  sanitizeFeedback,
  toFeedbackSummary,
  validateFeedbackSubmission,
} from '../lib/feedback.ts';
import { createHmac, isValidDeviceToken, readCookie } from '../lib/feedback-security.ts';
import {
  DuplicateFeedbackError,
  FEEDBACK_RATE_LIMIT,
  FeedbackRateLimitError,
  loadFeedbackState,
  submitFeedback,
  type FeedbackRepository,
  type StoredFeedback,
} from '../lib/feedback-service.ts';

class MemoryRepository implements FeedbackRepository {
  feedback: StoredFeedback[] = [];
  attempts = new Map<string, { count: number; startedAt: number; expiresAt: number }>();
  failReads = false;

  async getAggregate() {
    if (this.failReads) throw new Error('storage unavailable');
    return {
      total: this.feedback.length,
      ratingSum: this.feedback.reduce((sum, item) => sum + item.rating, 0),
    };
  }

  async getRatingForBrowser(browserHash: string) {
    if (this.failReads) throw new Error('storage unavailable');
    return this.feedback.find((item) => item.browserHash === browserHash)?.rating ?? null;
  }

  async deleteExpiredRateLimits(now: number) {
    for (const [key, value] of this.attempts) {
      if (value.expiresAt < now) this.attempts.delete(key);
    }
  }

  async consumeRateLimit(rateKey: string, now: number, windowMs: number) {
    const existing = this.attempts.get(rateKey);
    const count = !existing || existing.startedAt < now - windowMs ? 1 : existing.count + 1;
    this.attempts.set(rateKey, { count, startedAt: count === 1 ? now : existing!.startedAt, expiresAt: now + windowMs });
    return count;
  }

  async insertFeedback(feedback: StoredFeedback) {
    if (this.feedback.some((item) => item.browserHash === feedback.browserHash)) {
      throw new Error('UNIQUE constraint failed: portfolio_feedback.browser_hash');
    }
    this.feedback.push(feedback);
  }
}

test('accepts every rating from 1 through 5', () => {
  for (let rating = 1; rating <= 5; rating += 1) {
    assert.deepEqual(validateFeedbackSubmission({ rating }), {
      ok: true,
      value: { rating, feedback: null },
    });
  }
});

test('accepts optional feedback and normalizes plain text', () => {
  assert.deepEqual(validateFeedbackSubmission({ rating: 5, feedback: '  Great\r\nwork\u0000!  ' }), {
    ok: true,
    value: { rating: 5, feedback: 'Great\nwork!' },
  });
  assert.equal(sanitizeFeedback('<script>alert(1)</script>'), '<script>alert(1)</script>');
});

test('enforces the 300-character limit', () => {
  assert.equal(validateFeedbackSubmission({ rating: 4, feedback: 'a'.repeat(FEEDBACK_MAX_LENGTH) }).ok, true);
  const result = validateFeedbackSubmission({ rating: 4, feedback: 'a'.repeat(FEEDBACK_MAX_LENGTH + 1) });
  assert.equal(result.ok, false);
});

test('rejects empty and invalid ratings', () => {
  for (const rating of [undefined, null, 0, 6, 2.5, '5']) {
    assert.equal(validateFeedbackSubmission({ rating }).ok, false);
  }
});

test('calculates the real rounded average and total', () => {
  assert.deepEqual(toFeedbackSummary(27, 130), { average: 4.8, total: 27 });
  assert.deepEqual(toFeedbackSummary(0, 0), { average: null, total: 0 });
});

test('persists rating-only and written submissions without exposing feedback in state', async () => {
  const repository = new MemoryRepository();
  const first = await submitFeedback(repository, {
    payload: { rating: 1 },
    browserHash: 'browser-a',
    rateKey: 'network-a',
    now: 1_000,
  });
  const second = await submitFeedback(repository, {
    payload: { rating: 5, feedback: '<img src=x onerror=alert(1)>' },
    browserHash: 'browser-b',
    rateKey: 'network-a',
    now: 2_000,
  });

  assert.deepEqual(first, { summary: { average: 1, total: 1 }, submission: { rating: 1 } });
  assert.deepEqual(second, { summary: { average: 3, total: 2 }, submission: { rating: 5 } });
  assert.equal('feedback' in second.submission!, false);
  assert.equal(repository.feedback[1].feedback, '<img src=x onerror=alert(1)>');
});

test('prevents a second submission from the same browser', async () => {
  const repository = new MemoryRepository();
  await submitFeedback(repository, {
    payload: { rating: 4 },
    browserHash: 'same-browser',
    rateKey: 'network-a',
  });

  await assert.rejects(
    submitFeedback(repository, {
      payload: { rating: 2 },
      browserHash: 'same-browser',
      rateKey: 'network-a',
    }),
    DuplicateFeedbackError,
  );
  assert.equal(repository.feedback.length, 1);
});

test('rate-limits repeated submissions even when browser tokens change', async () => {
  const repository = new MemoryRepository();
  for (let index = 0; index < FEEDBACK_RATE_LIMIT; index += 1) {
    await submitFeedback(repository, {
      payload: { rating: 3 },
      browserHash: `browser-${index}`,
      rateKey: 'same-network',
      now: 5_000 + index,
    });
  }

  await assert.rejects(
    submitFeedback(repository, {
      payload: { rating: 3 },
      browserHash: 'browser-over-limit',
      rateKey: 'same-network',
      now: 6_000,
    }),
    FeedbackRateLimitError,
  );
});

test('surfaces storage failures without manufacturing aggregate data', async () => {
  const repository = new MemoryRepository();
  repository.failReads = true;
  await assert.rejects(loadFeedbackState(repository, 'browser-a'), /storage unavailable/);
});

test('device cookies and server-side HMACs are parsed and generated safely', async () => {
  assert.equal(readCookie('theme=dark; portfolio_feedback_device=abc123', 'portfolio_feedback_device'), 'abc123');
  assert.equal(isValidDeviceToken('a'.repeat(32)), true);
  assert.equal(isValidDeviceToken('not-valid'), false);
  assert.equal(await createHmac('secret-a', 'value'), await createHmac('secret-a', 'value'));
  assert.notEqual(await createHmac('secret-a', 'value'), await createHmac('secret-b', 'value'));
});
