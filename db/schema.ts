import { sql } from 'drizzle-orm';
import { check, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const portfolioFeedback = sqliteTable(
  'portfolio_feedback',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    rating: integer('rating').notNull(),
    feedback: text('feedback'),
    browserHash: text('browser_hash').notNull().unique(),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    check('portfolio_feedback_rating_check', sql`${table.rating} BETWEEN 1 AND 5`),
    check(
      'portfolio_feedback_length_check',
      sql`${table.feedback} IS NULL OR length(${table.feedback}) <= 300`,
    ),
  ],
);

export const portfolioFeedbackRateLimits = sqliteTable('portfolio_feedback_rate_limits', {
  rateKey: text('rate_key').primaryKey(),
  windowStartedAt: integer('window_started_at').notNull(),
  requestCount: integer('request_count').notNull().default(1),
  expiresAt: integer('expires_at').notNull(),
});
