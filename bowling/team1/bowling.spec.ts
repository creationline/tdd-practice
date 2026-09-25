import { describe, it, expect } from "vitest";
import { sum } from "./bowling";

describe("openflame", () => {
  it("1と2だったら3を返す", () => {
    expect(sum([1,2])).toBe(3);
  });
  it("8と1だったら9を返す", () => {
    expect(sum([8,1])).toBe(9);
  });
});

describe("スペア", () => {
  it("2と8だったらスペアを返す", () => {
    expect(sum([2,8])).toBe("スペア");
  });
});


describe("ストライク", () => {
  it("10だったらストライクを返す", () => {
    expect(sum([10,0])).toBe("ストライク");
  });
});
