import { getFeedbackRuntime } from '@/db/feedback';
import { createHmac, isValidDeviceToken, readCookie } from '@/lib/feedback-security';
import {
  DuplicateFeedbackError,
  FeedbackRateLimitError,
  FeedbackValidationError,
  loadFeedbackState,
  submitFeedback,
} from '@/lib/feedback-service';

export const dynamic = 'force-dynamic';

const DEVICE_COOKIE = 'portfolio_feedback_device';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function getDevice(request: Request) {
  const existing = readCookie(request.headers.get('cookie'), DEVICE_COOKIE);
  if (isValidDeviceToken(existing)) return { token: existing as string, cookie: null };

  const token = crypto.randomUUID().replaceAll('-', '');
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return {
    token,
    cookie: `${DEVICE_COOKIE}=${token}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax${secure}`,
  };
}

function json(body: unknown, status = 200, cookie?: string | null) {
  const headers = new Headers({
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    Vary: 'Cookie',
  });
  if (cookie) headers.set('Set-Cookie', cookie);
  return new Response(JSON.stringify(body), { status, headers });
}

function requestIp(request: Request) {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'local-preview'
  );
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}

export async function GET(request: Request) {
  const device = getDevice(request);

  try {
    const { repository, hashSecret } = getFeedbackRuntime();
    const browserHash = await createHmac(hashSecret, `browser:${device.token}`);
    const state = await loadFeedbackState(repository, browserHash);
    return json(state, 200, device.cookie);
  } catch (error) {
    console.error('[feedback] Unable to load rating summary.', error);
    return json({ error: 'Ratings are temporarily unavailable.' }, 503, device.cookie);
  }
}

export async function POST(request: Request) {
  const device = getDevice(request);

  if (!isSameOrigin(request)) {
    return json({ error: 'This feedback request was not accepted.' }, 403, device.cookie);
  }
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    return json({ error: 'Feedback must be sent as JSON.' }, 415, device.cookie);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'The feedback request was invalid.' }, 400, device.cookie);
  }

  try {
    const { repository, hashSecret } = getFeedbackRuntime();
    const [browserHash, rateKey] = await Promise.all([
      createHmac(hashSecret, `browser:${device.token}`),
      createHmac(hashSecret, `rate:${requestIp(request)}`),
    ]);
    const state = await submitFeedback(repository, { payload, browserHash, rateKey });
    return json({ ...state, message: 'Thanks for your feedback!' }, 201, device.cookie);
  } catch (error) {
    if (error instanceof FeedbackValidationError) {
      return json({ error: error.message }, 400, device.cookie);
    }
    if (error instanceof DuplicateFeedbackError) {
      return json({ ...error.state, error: error.message }, 409, device.cookie);
    }
    if (error instanceof FeedbackRateLimitError) {
      return json({ error: error.message }, 429, device.cookie);
    }

    console.error('[feedback] Unable to save feedback.', error);
    return json(
      { error: 'Feedback could not be sent right now. Your message is still here—please try again.' },
      503,
      device.cookie,
    );
  }
}
