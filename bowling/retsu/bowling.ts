type Pins = number | null;
type Frame = [Pins, Pins];
type LastFrame = [Pins, Pins, Pins];
export type AllFrame = [Frame, Frame, Frame, Frame, Frame, Frame, Frame, Frame, Frame, LastFrame];

export function calcAllFrame(frames: AllFrame): CalcResult[] {
  return frames.map((frame) => frameCalc([frame[0], frame[1]], 0, 0));
}

type CalcResult = number | "pending";
export function frameCalc(frame: Frame, next: Pins, afterNext: Pins): CalcResult {
  const frameState = determineFrameState(frame);

  switch (frameState.type) {
    case "notRolled":
      return "pending";
    case "inProgress":
      return "pending";
    case "open":
      return frameState.first + frameState.second;
    case "spare": {
      if (next !== null) {
        return 10 + next;
      }
      return "pending";
    }
    case "strike": {
      if (next !== null && afterNext !== null) {
        return 10 + next + afterNext;
      }
      return "pending";
    }
  }
}

type FrameState =
  | { type: "notRolled" }
  | { type: "inProgress"; first: number }
  | { type: "open"; first: number; second: number }
  | { type: "spare"; first: number; second: number }
  | { type: "strike" };

function determineFrameState(frame: Frame | undefined): FrameState {
  if (frame === undefined || frame[0] === null) {
    return { type: "notRolled" };
  }
  if (frame[0] === 10) {
    return { type: "strike" };
  }
  if (frame[1] === null) {
    return { type: "inProgress", first: frame[0] };
  }
  if (typeof frame[1] === "number") {
    const isSpare = frame[0] + frame[1] === 10;
    if (isSpare === true) {
      return {
        type: "spare",
        first: frame[0],
        second: frame[1],
      };
    }
    return {
      type: "open",
      first: frame[0],
      second: frame[1],
    };
  }
  return { type: "notRolled" };
}
