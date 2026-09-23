import { getScriptedByteAnswer } from './scripted-answer.ts';
import type { ByteAnswerProvider } from './types.ts';

export const scriptedByteProvider: ByteAnswerProvider = {
  kind: 'scripted',
  async answer(question) {
    return getScriptedByteAnswer(question);
  },
};

export async function answerByteQuestion(
  question: string,
  provider: ByteAnswerProvider = scriptedByteProvider,
) {
  return provider.answer(question);
}
