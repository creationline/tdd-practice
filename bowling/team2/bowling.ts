export function bowling(
  frames: number[][],
): number {
  return frames.flat().reduce((sum, pins) => sum + pins, 0)
}
