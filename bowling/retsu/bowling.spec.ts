import { describe, it, expect } from "vitest";
import { frameCalc } from "./bowling";

describe("frameCalc", () => {
  it("[[1,2]]のときは3", () => {
    const result = frameCalc([[1, 2]]);
    expect(result).toBe(3);
  });
  it("[[1,5],[3,4]]のときは6", () => {
    const result = frameCalc([
      [1, 5],
      [3, 4],
    ]);
    expect(result).toBe(6);
  });
  describe("スペアのとき", () => {
    it("[[1,9],[7,null]]のときは17", ()=>{
      const result = frameCalc([[1,9],[7,null]])
      expect(result).toBe(17)
    });
  })
});
