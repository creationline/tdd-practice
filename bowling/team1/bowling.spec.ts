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
  it("2と8だったら次の1投目が1のとき11を返す", () => {
    expect(sum([2,8])).toBe(11);
  });
});