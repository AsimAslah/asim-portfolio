import type { ByteTopic } from './types.ts';

export function normalizeByteQuestion(question: string) {
  return question
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[–—-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function routeByteQuestion(question: string): ByteTopic | null {
  const query = normalizeByteQuestion(question);

  if (/dataveil|privacy|anonym/.test(query)) return 'dataveil';
  if (/image\s*to\s*3d|3d|ar studio|triposr|furniture image/.test(query)) return 'imageTo3d';
  if (/velora/.test(query)) return 'velora';
  if (/virtual keyboard|gesture|hand track|touch free/.test(query)) return 'virtualKeyboard';
  if (/contact|email|reach|linkedin|whatsapp|hire/.test(query)) return 'contact';
  if (/experience|intern|brickrat|realviz|work history/.test(query)) return 'experience';
  if (/education|college|degree|study|m\.?(tech| tech)|b\.?(tech| tech)/.test(query)) return 'education';
  if (/skill|stack|technolog|language|tool/.test(query)) return 'skills';
  if (/resume|cv/.test(query)) return 'resume';
  if (/project|build|built|work|portfolio|asim/.test(query)) return 'overview';
  return null;
}
