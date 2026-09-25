import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createMiniByteJumpKeyframes,
  getMiniByteTargetPosition,
  getNextByteTargetIndex,
} from '../lib/mini-byte.ts';

test('mini Byte centers itself over a measured letter target', () => {
  const position = getMiniByteTargetPosition(
    { left: 100, top: 200, width: 500, height: 180 },
    { left: 140, top: 230, width: 80, height: 90 },
    { width: 48, height: 46 },
  );

  assert.equal(position.x, 56);
  assert.equal(position.y, -18);
});

test('mini Byte loops through four letter targets', () => {
  assert.equal(getNextByteTargetIndex(0, 4), 1);
  assert.equal(getNextByteTargetIndex(1, 4), 2);
  assert.equal(getNextByteTargetIndex(2, 4), 3);
  assert.equal(getNextByteTargetIndex(3, 4), 0);
});

test('mini Byte uses an arc normally and a compact fade for reduced motion', () => {
  const from = { x: 10, y: 20 };
  const to = { x: 110, y: 20 };
  const jump = createMiniByteJumpKeyframes(from, to, false);
  const reduced = createMiniByteJumpKeyframes(from, to, true);

  assert.equal(jump.length, 5);
  assert.match(String(jump[2].transform), /translate3d\(60px, -14px/);
  assert.equal(reduced.length, 4);
  assert.equal(reduced[1].opacity, 0);
});
