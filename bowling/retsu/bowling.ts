type Point = number | null;
type Frame = [Point, Point];
type FinishedFrame = [number, number] | [10, null];

type CalcResult = number | "pending";
export function frameCalc(frames: Frame[]): CalcResult {
  const firstFrame = frames[0];

  // ストライクの時
  if (firstFrame !== undefined && firstFrame[0] === 10) {
    const secondFrame = frames[1];
    if (isFrameFinished(secondFrame) === false) {
      return "pending";
    }
    return 10 + secondFrame[0] + secondFrame[1];
  }
  // まだ未投入のとき
  if (isFrameFinished(firstFrame) === false) {
    return "pending";
  }
  const result = firstFrame[0] + firstFrame[1];

  // スペアの時
  if (result === 10) {
    const secondFrame = frames[1];
    // 次のフレームが確定していないとき
    if (isFrameFinished(secondFrame) === false) {
      return "pending";
    }
    return result + secondFrame[0];
  }

  return result;
}

function isFrameFinished(frame: Frame | undefined): frame is FinishedFrame {
  if (frame === undefined) return false;
  if (frame[0] === null) return false;
  if (frame[0] === 10) return true;
  if (frame[1] === null) return false;
  return true;
}
