import { describe, it, expect } from "vitest"
import { bowling } from "./bowling"

describe("bowling", () => {
  it("1フレーム2回投げる場合、合計スコアを返す", () => {
    expect(bowling(0,0)).toBe("0"),
    expect(bowling(4,5)).toBe("9")
  })
})