import assert from 'node:assert/strict';
import test from 'node:test';
import { projects } from '../data/profile.ts';
import { searchProjects } from '../lib/project-search.ts';

test('project search returns all projects for an empty query', () => {
  assert.deepEqual(searchProjects(projects, '  '), projects);
});

test('project search matches names, categories, summaries, and technologies', () => {
  assert.deepEqual(searchProjects(projects, 'DataVeil').map((project) => project.slug), ['dataveil']);
  assert.deepEqual(searchProjects(projects, 'computer vision').map((project) => project.slug), ['ai-virtual-keyboard']);
  assert.deepEqual(searchProjects(projects, 'Supabase').map((project) => project.slug), ['image-to-3d-ar']);
  assert.deepEqual(searchProjects(projects, 'premium product').map((project) => project.slug), ['velora']);
});

test('project search is case-insensitive and returns an empty list for no match', () => {
  assert.deepEqual(searchProjects(projects, 'PYTORCH').map((project) => project.slug), ['image-to-3d-ar']);
  assert.deepEqual(searchProjects(projects, 'kubernetes'), []);
});
