import { describe, it, expect } from "vitest";
import { calcAllFrame, type AllFrame, frameCalc } from "./bowling";

const open = (first: number, second: number) => ({ type: "open" as const, first, second });
const spare = (first: number, second: number) => ({ type: "spare" as const, first, second });
const strike = () => ({ type: "strike" as const });
const notRolled = () => ({ type: "notRolled" as const });
const inProgress = (first: number) => ({ type: "inProgress" as const, first });

describe("calcAllFrame", () => {
  describe("1フレーム目まで終わっている", () => {
    it("[[3,4]]のときは[7,pending,...", () => {
      // arrange
      const allFrames: AllFrame = [
        [3, 4],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null, null],
      ];

      // act
      const result = calcAllFrame(allFrames);

      // assert
      expect(result).toStrictEqual([
        7,
        "pending",
        "pending",
        "pending",
        "pending",
        "pending",
        "pending",
        "pending",
        "pending",
        "pending",
      ]);
    });
    it("[[3,4],[10,null],]のときは[7,8,pending,...", () => {
      // arrange
      const allFrames: AllFrame = [
        [3, 4],
        [10,null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null, null],
      ];

      // act
      const result = calcAllFrame(allFrames);

      // assert
      expect(result).toStrictEqual([
        7,
        "pending",
        "pending",
        "pending",
        "pending",
        "pending",
        "pending",
        "pending",
        "pending",
        "pending",
      ]);
    });
  });
});

describe("frameCalc", () => {
  describe("役なしのとき", () => {
    it("[1,2]のときは3", () => {
      const result = frameCalc(open(1, 2), null, null);
      expect(result).toBe(3);
    });
    it("[1,5]で次が3のときは6", () => {
      const result = frameCalc(open(1, 5), 3, null);
      expect(result).toBe(6);
    });
  });
  describe("スペアのとき", () => {
    it("[1,9]で次が7のときは17", () => {
      const result = frameCalc(spare(1, 9), 7, null);
      expect(result).toBe(17);
    });
    it("[2,8]で次が5のときは15", () => {
      const result = frameCalc(spare(2, 8), 5, null);
      expect(result).toBe(15);
    });
  });
  describe("ストライクのとき", () => {
    it("[10,null]で次が2,7のときは19", () => {
      const result = frameCalc(strike(), 2, 7);
      expect(result).toBe(19);
    });
    it("[10,null]で次が5,5のときは20", () => {
      const result = frameCalc(strike(), 5, 5);
      expect(result).toBe(20);
    });
    it("[10,null]で次が10,10のときは30", () => {
      const result = frameCalc(strike(), 10, 10);
      expect(result).toBe(30);
    });
    it("[10,null]で次が10,3のときは23", () => {
      const result = frameCalc(strike(), 10, 3);
      expect(result).toBe(23);
    });
  });
  describe("計算できない時", () => {
    it("[null,null]のときはpending", () => {
      const result = frameCalc(notRolled(), null, null);
      expect(result).toBe("pending");
    });
    it("[1,null]のときはpending", () => {
      const result = frameCalc(inProgress(1), null, null);
      expect(result).toBe("pending");
    });
    describe("スペア", () => {
      it("[1,9]で次が未投球のときはpending", () => {
        const result = frameCalc(spare(1, 9), null, null);
        expect(result).toBe("pending");
      });
      it("[5,5]で次が未投球のときはpending", () => {
        const result = frameCalc(spare(5, 5), null, null);
        expect(result).toBe("pending");
      });
    });
    describe("ストライク", () => {
      it("[10,null]で次が未投球のときはpending", () => {
        const result = frameCalc(strike(), null, null);
        expect(result).toBe("pending");
      });
      it("[10,null]で次が10で、その次が未投球のときはpending", () => {
        const result = frameCalc(strike(), 10, null);
        expect(result).toBe("pending");
      });
    });
  });
});
