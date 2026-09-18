export function flame(...frames: number[][]): number {
  let score = 0;

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const isStrike = frame[0] === 10;
    const pins = isStrike ? 10 : frame[0] + (frame[1] ?? 0);
    const isSpare = !isStrike && pins === 10;
    const next = frames[i + 1];
    const bonus = isStrike
      ? (next?.[0] ?? 0) + (next?.[1] ?? 0)
      : isSpare
        ? (next?.[0] ?? 0)
        : 0;
    score += pins + bonus;
  }

  return score;
}
