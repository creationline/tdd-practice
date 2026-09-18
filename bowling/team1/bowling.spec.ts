import { describe, it, expect } from "vitest";
import { flame } from "./bowling";

describe("フレーム", () => {
  it("1と2だったら3を返す", () => {
    expect(flame([1,2])).toBe(3);
  });
  it("8と1だったら9を返す", () => {
    expect(flame([8,1])).toBe(9);
  })
  it("8と2の後、2と4だったら18を返す",() => {
    expect(flame([8,2],[2,4])).toBe(18);
  })
  it("8と2の後、0と0だったら10を返す",() => {
    expect(flame([8,2],[0,0])).toBe(10);
  })
  it("ストライクの後、2と4だったらを返す",() => {
    expect(flame([10,0],[2,4])).toBe(22);
  })
  it("0と0のフレームの後、8と2のフレームの後、5と3だったら23を返す",() => {
    expect(flame([0,0],[8,2],[5,3])).toBe(23);
  })
  it("0と0のフレームの後、ストライクのフレームの後、5と3だったら26を返す",() => {
    expect(flame([0,0],[10,0],[5,3])).toBe(26);
  })
  it("",() => {
    expect(flame([0,0],[10,0],[5,3])).toBe(26);
  })
});
