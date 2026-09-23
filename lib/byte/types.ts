export type ByteLink = {
  href: string;
  label: string;
};

export type ByteAnswer = {
  links: ByteLink[];
  text: string;
};

export type ByteTopic =
  | 'contact'
  | 'dataveil'
  | 'education'
  | 'experience'
  | 'imageTo3d'
  | 'overview'
  | 'resume'
  | 'skills'
  | 'velora'
  | 'virtualKeyboard';

export type ByteKnowledge = {
  answers: Record<ByteTopic, ByteAnswer>;
  fallback: ByteAnswer;
};

export interface ByteAnswerProvider {
  readonly kind: 'scripted' | 'server';
  answer(question: string): Promise<ByteAnswer>;
}
