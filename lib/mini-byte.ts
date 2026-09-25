export type MiniBytePoint = {
  x: number;
  y: number;
};

type RectLike = {
  height: number;
  left: number;
  top: number;
  width: number;
};

type SizeLike = {
  height: number;
  width: number;
};

export function getMiniByteTargetPosition(container: RectLike, target: RectLike, byte: SizeLike): MiniBytePoint {
  return {
    x: target.left - container.left + target.width / 2 - byte.width / 2,
    y: target.top - container.top - byte.height * 0.36,
  };
}

export function getNextByteTargetIndex(currentIndex: number, targetCount: number) {
  if (targetCount <= 0) return 0;
  return (currentIndex + 1) % targetCount;
}

function at(point: MiniBytePoint, scaleX = 1, scaleY = 1, rotation = 0) {
  return `translate3d(${point.x}px, ${point.y}px, 0) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
}

export function createMiniByteJumpKeyframes(from: MiniBytePoint, to: MiniBytePoint, reducedMotion: boolean): Keyframe[] {
  if (reducedMotion) {
    const fadeOut = { x: from.x, y: from.y - 4 };
    const fadeIn = { x: to.x, y: to.y + 4 };
    return [
      { offset: 0, opacity: 1, transform: at(from) },
      { offset: 0.45, opacity: 0, transform: at(fadeOut, 0.98, 0.98) },
      { offset: 0.55, opacity: 0, transform: at(fadeIn, 0.98, 0.98) },
      { offset: 1, opacity: 1, transform: at(to) },
    ];
  }

  const direction = Math.sign(to.x - from.x) || 1;
  const travel = Math.abs(to.x - from.x);
  const arcHeight = Math.min(68, Math.max(34, travel * 0.3));
  const anticipation = { x: from.x - direction * 2, y: from.y + 3 };
  const apex = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - arcHeight };
  const landing = { x: to.x, y: to.y + 2 };

  return [
    { offset: 0, transform: at(from) },
    { offset: 0.12, transform: at(anticipation, 1.08, 0.86, -direction * 2) },
    { offset: 0.56, transform: at(apex, 0.94, 1.08, direction * 4) },
    { offset: 0.87, transform: at(landing, 1.08, 0.86, -direction) },
    { offset: 1, transform: at(to) },
  ];
}
