import {
  toFeedbackSummary,
  validateFeedbackSubmission,
  type FeedbackState,
  type FeedbackSubmission,
} from './feedback.ts';

export const FEEDBACK_RATE_LIMIT = 5;
export const FEEDBACK_RATE_WINDOW_MS = 60 * 60 * 1000;

export type StoredFeedback = FeedbackSubmission & {
  browserHash: string;
  createdAt: string;
};

export interface FeedbackRepository {
  getAggregate(): Promise<{ total: unknown; ratingSum: unknown }>;
  getRatingForBrowser(browserHash: string): Promise<number | null>;
  consumeRateLimit(rateKey: string, now: number, windowMs: number): Promise<number>;
  deleteExpiredRateLimits(now: number): Promise<void>;
  insertFeedback(feedback: StoredFeedback): Promise<void>;
}

export class FeedbackValidationError extends Error {}
export class DuplicateFeedbackError extends Error {
  readonly state: FeedbackState;

  constructor(state: FeedbackState) {
    super('Feedback has already been submitted from this browser.');
    this.state = state;
  }
}
export class FeedbackRateLimitError extends Error {}

export async function loadFeedbackState(
  repository: FeedbackRepository,
  browserHash: string,
): Promise<FeedbackState> {
  const [aggregate, rating] = await Promise.all([
    repository.getAggregate(),
    repository.getRatingForBrowser(browserHash),
  ]);

  return {
    summary: toFeedbackSummary(aggregate.total, aggregate.ratingSum),
    submission: rating === null ? null : { rating },
  };
}

export async function submitFeedback(
  repository: FeedbackRepository,
  input: {
    payload: unknown;
    browserHash: string;
    rateKey: string;
    now?: number;
  },
): Promise<FeedbackState> {
  const validation = validateFeedbackSubmission(input.payload);
  if (!validation.ok) throw new FeedbackValidationError(validation.error);

  const existingRating = await repository.getRatingForBrowser(input.browserHash);
  if (existingRating !== null) {
    const state = await loadFeedbackState(repository, input.browserHash);
    throw new DuplicateFeedbackError(state);
  }

  const now = input.now ?? Date.now();
  await repository.deleteExpiredRateLimits(now);
  const attempts = await repository.consumeRateLimit(
    input.rateKey,
    now,
    FEEDBACK_RATE_WINDOW_MS,
  );
  if (attempts > FEEDBACK_RATE_LIMIT) {
    throw new FeedbackRateLimitError('Too many feedback attempts. Please try again later.');
  }

  try {
    await repository.insertFeedback({
      ...validation.value,
      browserHash: input.browserHash,
      createdAt: new Date(now).toISOString(),
    });
  } catch (error) {
    if (error instanceof DuplicateFeedbackError) throw error;
    if (error instanceof Error && /unique|browser_hash/i.test(error.message)) {
      const state = await loadFeedbackState(repository, input.browserHash);
      throw new DuplicateFeedbackError(state);
    }
    throw error;
  }

  return loadFeedbackState(repository, input.browserHash);
}
