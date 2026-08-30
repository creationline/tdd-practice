import { describe, it, expect } from "vitest";
import { frameCalc } from "./bowling";


describe("frameCalc", () => {
  it("[[1,2]]のときは3", () => {
    const result = frameCalc([[1,2]])
    expect(result).toBe(3);
  });
});
