import { byteKnowledge } from './knowledge.ts';
import { routeByteQuestion } from './question-router.ts';
import type { ByteAnswer, ByteKnowledge } from './types.ts';

export function getScriptedByteAnswer(
  question: string,
  knowledge: ByteKnowledge = byteKnowledge,
): ByteAnswer {
  const topic = routeByteQuestion(question);
  return topic ? knowledge.answers[topic] : knowledge.fallback;
}
