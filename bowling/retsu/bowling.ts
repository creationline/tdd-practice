type Pins = number | null;
type Frame = [Pins, Pins];
type LastFrame = [Pins, Pins, Pins];
export type AllFrame = [Frame, Frame, Frame, Frame, Frame, Frame, Frame, Frame, Frame, LastFrame];

export type FrameState =
  | { type: "notRolled" }
  | { type: "inProgress"; first: number }
  | { type: "open"; first: number; second: number }
  | { type: "spare"; first: number; second: number }
  | { type: "strike" };

export function determineFrameState(frame: Frame | undefined): FrameState {
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

type CalcResult = number | "pending";
export function frameCalc(frameState: FrameState, next: Pins, afterNext: Pins): CalcResult {
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

// フレーム区切りを無視した投球の並びと、各フレームがその並びの何投目から始まるかを一度のループで求める。
function buildThrowSequence(frames: AllFrame): { throws: Pins[]; frameStarts: number[] } {
  const throws: Pins[] = [];
  const frameStarts: number[] = [];

  for (const [i, frame] of frames.entries()) {
    frameStarts.push(throws.length);

    const isLastFrame = i === frames.length - 1;
    if (frame[0] === null) {
      break;
    }
    throws.push(frame[0]);

    const isStrike = frame[0] === 10;
    if (isStrike && !isLastFrame) {
      continue;
    }
    if (frame[1] === null) {
      break;
    }
    throws.push(frame[1]);

    if (isLastFrame) {
      const thirdThrow = (frame as LastFrame)[2];
      if (thirdThrow !== null) {
        throws.push(thirdThrow);
      }
    }
  }

  while (frameStarts.length < frames.length) {
    frameStarts.push(throws.length);
  }

  return { throws, frameStarts };
}

export function calcAllFrame(frames: AllFrame): CalcResult[] {
  const { throws, frameStarts } = buildThrowSequence(frames);
  const pinsAt = (i: number): Pins => throws[i] ?? null;

  return frames.map((frame, index) => {
    const ownThrowCount = frame[0] === 10 ? 1 : 2;
    const bonusStart = (frameStarts[index] ?? throws.length) + ownThrowCount;
    const frameState = determineFrameState([frame[0], frame[1]]);
    return frameCalc(frameState, pinsAt(bonusStart), pinsAt(bonusStart + 1));
  });
}
