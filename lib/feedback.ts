export const FEEDBACK_MAX_LENGTH = 300;

export type FeedbackSubmission = {
  rating: number;
  feedback: string | null;
};

export type FeedbackSummary = {
  average: number | null;
  total: number;
};

export type FeedbackState = {
  summary: FeedbackSummary;
  submission: { rating: number } | null;
};

type ValidationResult =
  | { ok: true; value: FeedbackSubmission }
  | { ok: false; error: string };

const disallowedControlCharacters = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

export function sanitizeFeedback(value: string) {
  return value
    .normalize('NFKC')
    .replace(/\r\n?/g, '\n')
    .replace(disallowedControlCharacters, '')
    .trim();
}

export function validateFeedbackSubmission(payload: unknown): ValidationResult {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, error: 'A rating from 1 to 5 is required.' };
  }

  const { rating, feedback } = payload as { rating?: unknown; feedback?: unknown };
  if (!Number.isInteger(rating) || Number(rating) < 1 || Number(rating) > 5) {
    return { ok: false, error: 'A rating from 1 to 5 is required.' };
  }

  if (feedback !== undefined && feedback !== null && typeof feedback !== 'string') {
    return { ok: false, error: 'Feedback must be plain text.' };
  }

  const sanitized = sanitizeFeedback(typeof feedback === 'string' ? feedback : '');
  if (sanitized.length > FEEDBACK_MAX_LENGTH) {
    return {
      ok: false,
      error: `Feedback must be ${FEEDBACK_MAX_LENGTH} characters or fewer.`,
    };
  }

  return {
    ok: true,
    value: {
      rating: Number(rating),
      feedback: sanitized || null,
    },
  };
}

export function toFeedbackSummary(totalValue: unknown, ratingSumValue: unknown): FeedbackSummary {
  const total = Math.max(0, Math.trunc(Number(totalValue) || 0));
  const ratingSum = Math.max(0, Number(ratingSumValue) || 0);

  return {
    average: total === 0 ? null : Math.round((ratingSum / total) * 10) / 10,
    total,
  };
}
