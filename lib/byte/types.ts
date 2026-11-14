export type ByteLink = {
  href: string;
  label: string;
};

export type ByteAnswer = {
  links: ByteLink[];
  text: string;
};

export type ByteTopic =
  | 'aiEvaluation'
  | 'aiEvaluationComparison'
  | 'aiQualityLab'
  | 'contact'
  | 'dataveil'
  | 'education'
  | 'evallens'
  | 'experience'
  | 'imageTo3d'
  | 'latestProjects'
  | 'overview'
  | 'piishift'
  | 'resume'
  | 'skills'
  | 'shopify'
  | 'virtualKeyboard';

export type ByteKnowledge = {
  answers: Record<ByteTopic, ByteAnswer>;
  fallback: ByteAnswer;
};

export interface ByteAnswerProvider {
  readonly kind: 'scripted' | 'server';
  answer(question: string): Promise<ByteAnswer>;
}
