type Frame = [first: number, second?: number]

export function bowling(frames: Frame[]): number {
  let score = 0
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i]
    if (frame === undefined || frame[1] === undefined) {
      continue
    }
    const first = frame[0]
    const second = frame[1]
    score += first + second

    if (first + second === 10) {
      const nextFrame = frames[i + 1]
      if(nextFrame !== undefined){
        score += nextFrame[0]
      }
    }
  }
  return score
}
 