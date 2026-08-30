type Point = number | null
type CalcResult = number | "pending"


export function frameCalc(frames: [Point, Point][]): CalcResult {
  const firstFrame = frames[0];
  if (firstFrame === undefined) {
    throw Error("Frame Not Found");
  }
  // まだ未投入のとき
  if (firstFrame[0] === null || firstFrame[1] === null) {
    return "pending"
  }
  const result = firstFrame[0] + firstFrame[1];
  if (result === 10) {
    const secondFrame = frames[1];

    // 次のフレームが始まっていないとき
    if (secondFrame === undefined || secondFrame[0] === null) {
      return "pending"
    }
    return result + secondFrame[0];
  }

  return result;
}
