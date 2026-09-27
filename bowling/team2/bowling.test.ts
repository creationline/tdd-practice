import { describe, it, expect } from "vitest"
import { bowling } from "./bowling"

describe("bowling", () => {
  it("1フレーム2回投げる場合、合計スコアを返す", () => {
    expect(bowling([[0,0]])).toBe(0),
    expect(bowling([[4,5]])).toBe(9)
  })

  it("2フレーム分、入力できる", () => {
    expect(bowling([[0,0],[0,1]])).toBe(1)
  })
  
  it("スペアの場合、次の1投のスコアを加算する",() => {
    expect(bowling([[5,5],[3,5]])).toBe(21)
  })

  it("フレーム中の1投目が10の場合、2投目は投げない。",() => {
    expect(bowling([[10]])).toBe(10)
  })

})