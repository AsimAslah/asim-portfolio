import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { join } from 'node:path';
import { projects, skillGroups } from '../data/profile.ts';

test('AI evaluation projects lead the portfolio in the verified order', () => {
  assert.deepEqual(
    projects.map((project) => project.slug),
    ['evallens', 'ai-quality-lab', 'image-to-3d-ar', 'dataveil', 'shopify-fashion-store', 'ai-virtual-keyboard'],
  );

  const evalLens = projects[0];
  assert.equal(evalLens.featured, true);
  assert.equal(evalLens.demoUrl, 'https://evallens.asimaslu7.workers.dev/');
  assert.equal(evalLens.releaseUrl, 'https://github.com/AsimAslah/evallens/releases/tag/v1.0.0');
  assert.equal(evalLens.testing?.length, 3);
  assert.equal(evalLens.evidence?.length, 6);
  for (const evidence of evalLens.evidence ?? []) {
    assert.equal(existsSync(join(process.cwd(), 'public', evidence.src)), true, `Missing evidence asset: ${evidence.src}`);
  }

  const qualityLab = projects[1];
  assert.equal(qualityLab.featured, true);
  assert.equal(qualityLab.demoUrl, null);
  assert.match(qualityLab.status ?? '', /Public deployment pending/);
  assert.ok(qualityLab.limitations?.some((item) => /No verified public Replit URL/.test(item)));
});

test('project visuals and discovery remain data-driven', () => {
  assert.equal(new Set(projects.map((project) => project.visualKind)).size, projects.length);

  const commandPalette = readFileSync(join(process.cwd(), 'components', 'command-palette.tsx'), 'utf8');
  assert.match(commandPalette, /projects\.map/);

  const sitemap = readFileSync(join(process.cwd(), 'app', 'sitemap.ts'), 'utf8');
  assert.match(sitemap, /projects\.map/);
});

test('professional skills include the verified AI evaluation toolkit', () => {
  const skills = skillGroups.flatMap((group) => group.skills);
  for (const expected of ['LLM Evaluation', 'AI Quality Assurance', 'Rubric Design', 'Server-Sent Events', 'Execution Observability', 'Playwright', 'Vitest', 'PostgreSQL', 'React Flow']) {
    assert.ok(skills.includes(expected), `Missing skill: ${expected}`);
  }
});
