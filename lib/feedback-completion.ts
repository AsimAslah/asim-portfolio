export const FEEDBACK_COMPLETION_STORAGE_KEY = 'asim-portfolio-feedback-complete-v1';

type ReadableStorage = Pick<Storage, 'getItem'>;
type WritableStorage = Pick<Storage, 'setItem'>;

export function hasCompletedFeedback(storage: ReadableStorage | null | undefined) {
  if (!storage) return false;
  try {
    return storage.getItem(FEEDBACK_COMPLETION_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function rememberCompletedFeedback(storage: WritableStorage | null | undefined) {
  if (!storage) return false;
  try {
    storage.setItem(FEEDBACK_COMPLETION_STORAGE_KEY, 'true');
    return true;
  } catch {
    return false;
  }
}
