import assert from 'node:assert/strict';
import test from 'node:test';
import { getByteAnswer } from '../lib/byte.ts';

test('BYTE routes suggested project and contact questions to verified answers', () => {
  const dataVeil = getByteAnswer('Tell me about DataVeil');
  assert.match(dataVeil.text, /Privacy-Preserving AI Middleware/);
  assert.ok(dataVeil.links.some((link) => link.href === '/projects/dataveil'));

  const imageTo3d = getByteAnswer('How does Image-to-3D work?');
  assert.match(imageTo3d.text, /TripoSR/);
  assert.ok(imageTo3d.links.some((link) => link.href === '/projects/image-to-3d-ar'));

  const contact = getByteAnswer('How can I contact him?');
  assert.match(contact.text, /asimaslu7@gmail\.com/);
  assert.ok(contact.links.some((link) => link.href.startsWith('mailto:')));

  const velora = getByteAnswer('What is Velora?');
  assert.match(velora.text, /in-progress frontend exploration/);
  assert.ok(velora.links.some((link) => link.href === '/projects/velora'));

  const virtualKeyboard = getByteAnswer('How does Virtual Keyboard work?');
  assert.match(virtualKeyboard.text, /hand tracking/);
  assert.ok(virtualKeyboard.links.some((link) => link.href === '/projects/ai-virtual-keyboard'));

  const resume = getByteAnswer('Can I view his résumé?');
  assert.match(resume.text, /resume/i);
  assert.ok(resume.links.some((link) => link.href === '/resume.pdf'));
});

test('BYTE is honest when a question is outside its scripted portfolio knowledge', () => {
  const answer = getByteAnswer('What is the weather on Mars?');
  assert.match(answer.text, /scripted portfolio guide/);
  assert.ok(answer.links.some((link) => link.href === '#contact'));
});
