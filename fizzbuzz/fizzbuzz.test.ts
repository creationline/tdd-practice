import { describe, it, expect } from "vitest";
import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  it("数値をそのまま文字列で返す", () => {
    expect(fizzbuzz(1)).toBe("1");
  });

  it.skip("3の倍数はFizzを返す", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
  });

  it.skip("5の倍数はBuzzを返す", () => {
    expect(fizzbuzz(5)).toBe("Buzz");
  });

  it.skip("15の倍数はFizzBuzzを返す", () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
  });
});
