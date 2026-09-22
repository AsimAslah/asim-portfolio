import { env } from 'cloudflare:workers';
import type { FeedbackRepository, StoredFeedback } from '@/lib/feedback-service';

type AggregateRow = {
  total: number | string;
  rating_sum: number | string;
};

type RatingRow = {
  rating: number;
};

type RateLimitRow = {
  request_count: number;
};

export function getFeedbackRuntime() {
  if (!env.DB || !env.FEEDBACK_HASH_SECRET) {
    throw new Error('Feedback storage is not configured.');
  }

  return {
    repository: createFeedbackRepository(env.DB),
    hashSecret: env.FEEDBACK_HASH_SECRET,
  };
}

export function createFeedbackRepository(db: D1Database): FeedbackRepository {
  return {
    async getAggregate() {
      const row = await db
        .prepare(
          'SELECT COUNT(*) AS total, COALESCE(SUM(rating), 0) AS rating_sum FROM portfolio_feedback',
        )
        .first<AggregateRow>();
      return { total: row?.total ?? 0, ratingSum: row?.rating_sum ?? 0 };
    },

    async getRatingForBrowser(browserHash: string) {
      const row = await db
        .prepare('SELECT rating FROM portfolio_feedback WHERE browser_hash = ? LIMIT 1')
        .bind(browserHash)
        .first<RatingRow>();
      return row?.rating ?? null;
    },

    async deleteExpiredRateLimits(now: number) {
      await db
        .prepare('DELETE FROM portfolio_feedback_rate_limits WHERE expires_at < ?')
        .bind(now)
        .run();
    },

    async consumeRateLimit(rateKey: string, now: number, windowMs: number) {
      const cutoff = now - windowMs;
      const expiresAt = now + windowMs;
      const row = await db
        .prepare(
          `INSERT INTO portfolio_feedback_rate_limits
             (rate_key, window_started_at, request_count, expires_at)
           VALUES (?, ?, 1, ?)
           ON CONFLICT(rate_key) DO UPDATE SET
             request_count = CASE
               WHEN window_started_at < ? THEN 1
               ELSE request_count + 1
             END,
             window_started_at = CASE
               WHEN window_started_at < ? THEN excluded.window_started_at
               ELSE window_started_at
             END,
             expires_at = excluded.expires_at
           RETURNING request_count`,
        )
        .bind(rateKey, now, expiresAt, cutoff, cutoff)
        .first<RateLimitRow>();
      return row?.request_count ?? 1;
    },

    async insertFeedback(feedback: StoredFeedback) {
      await db
        .prepare(
          `INSERT INTO portfolio_feedback
             (rating, feedback, browser_hash, created_at)
           VALUES (?, ?, ?, ?)`,
        )
        .bind(feedback.rating, feedback.feedback, feedback.browserHash, feedback.createdAt)
        .run();
    },
  };
}
