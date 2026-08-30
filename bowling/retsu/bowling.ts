export function frameCalc(frames: [number, number][]): number {
  const firstFrame = frames[0];
  if (firstFrame === undefined) {
    throw Error("Frame Not Found");
  }
  const result = firstFrame[0] + firstFrame[1];
  return result;
}
