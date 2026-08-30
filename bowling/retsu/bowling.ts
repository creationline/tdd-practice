type Point = number | null;
type CalcResult = number | "pending";
type Frame = [Point, Point];

export function frameCalc(frames: Frame[]): CalcResult {
  const firstFrame = frames[0];
  // まだ未投入のとき
  if (isFrameFinished(firstFrame) === false) {
    return "pending";
  }
  const result = firstFrame[0] + firstFrame[1];

  // スペアの時
  if (result === 10) {
    const secondFrame = frames[1];
    // 次のフレームが始まっていないときか、次のフレームの1投目が終わっていないときはpending
    if (isFrameFinished(secondFrame) === false) {
      return "pending";
    }
    return result + secondFrame[0];
  }

  return result;
}

function isFrameFinished(frame: Frame | undefined): frame is [number, number] {
  if (frame === undefined) return false;
  if (frame[0] === null) return false;
  if (frame[1] === null) return false;
  return true;
}
