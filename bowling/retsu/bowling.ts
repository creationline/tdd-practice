type Frame = [number, number | null];

type CalcResult = number | "pending";
export function frameCalc(frames: Frame[]): CalcResult {
  const firstFrame = determineFrameState(frames[0]);

  switch (firstFrame.type) {
    case "notRolled":
      return "pending";
    case "inProgress":
      return "pending";
    case "open":
      return firstFrame.first + firstFrame.second;
    case "spare": {
      const secondFrame = determineFrameState(frames[1]);
      if (secondFrame.type === "notRolled") {
        return "pending";
      }
      if (secondFrame.type === "strike") {
        return 10 + 10;
      }
      return 10 + secondFrame.first;
    }
    case "strike": {
      const secondFrame = determineFrameState(frames[1]);
      if (secondFrame.type === "open" || secondFrame.type === "spare") {
        return 10 + secondFrame.first + secondFrame.second;
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
  if (frame === undefined) {
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
