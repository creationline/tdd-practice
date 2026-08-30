type Frame = [number, number | null];

type CalcResult = number | "pending";
export function frameCalc(frames: Frame[]): CalcResult {
  if (frames[0] === undefined) return "pending"
  const firstFrame = determineFrameState(frames[0]);

  if (firstFrame.type === 'notRolled') {
    return 'pending'
  }

  // ストライクの時
  if (firstFrame.type === 'strike') {
    if (frames[1] === undefined) return "pending"
    const secondFrame = determineFrameState(frames[1]);
    if (secondFrame.type === 'open' || secondFrame.type === 'spare') {
      return 10 + secondFrame.first + secondFrame.second
    }
    return "pending";
  }
  // まだ未投入のとき
  if (firstFrame.type === 'inProgress') {
    return "pending";
  }
  if (firstFrame.type === 'open') {
    return firstFrame.first + firstFrame.second
  }

  // スペアの時
  if (firstFrame.type === 'spare') {
    if (frames[1] === undefined) return "pending"
    const secondFrame = determineFrameState(frames[1]);
    if (secondFrame.type === 'strike') {
      return 10 + 10
    }
    if (secondFrame.type === 'notRolled') {
      return 'pending'
    }
    return 10 + secondFrame.first
  }

  return 'pending';
}


type FrameState =
  | { type: 'notRolled'}
  | { type: 'inProgress'; first: number }
  | { type: 'open'; first: number; second: number }
  | { type: 'spare'; first: number; second: number }
  | { type: 'strike' };

function determineFrameState(frame: Frame): FrameState {
  if (frame[0] === 10) {
    return { type: 'strike' };
  };
  if (frame[1] === null) {
    return { type: 'inProgress', first: frame[0] }
  };
  if (typeof frame[1] === 'number') {
    const isSpare = frame[0] + frame[1] === 10;
    if (isSpare === true) {
      return {
        type: 'spare', first: frame[0], second: frame[1]
      }
    }
    return {
      type: 'open', first: frame[0], second: frame[1]
    }

  }
  return { type: 'notRolled' }
}
