import { describe, it, expect } from "vitest";
import { frameCalc } from "./bowling";

describe("frameCalc", () => {
  describe("役なしのとき", () => {
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
  });
  describe("スペアのとき", () => {
    it("[[1,9],[7,1]]のときは17", () => {
      const result = frameCalc([
        [1, 9],
        [7, 1],
      ]);
      expect(result).toBe(17);
    });
    it("[[2,8],[5,1]]のときは15", () => {
      const result = frameCalc([
        [2, 8],
        [5, 1],
      ]);
      expect(result).toBe(15);
    });
  });
  describe("ストライクのとき", () => {
    it("[[10,null],[2,7]]のときは19", () => {
      const result = frameCalc([
        [10, null],
        [2, 7],
      ]);
      expect(result).toBe(19);
    });
    it("[[10,null],[5,5]]のときは20", () => {
      const result = frameCalc([
        [10, null],
        [5, 5],
      ]);
      expect(result).toBe(20);
    });
    it("[[10,null],[10,null],[10,null]のときは30", () => {
      const result = frameCalc([
        [10, null],
        [10, null],
        [10, null],
      ]);
      expect(result).toBe(30);
    });
    it("[[10,null],[10,null],[3,1]のときは23", () => {
      const result = frameCalc([
        [10, null],
        [10, null],
        [3, 1],
      ]);
      expect(result).toBe(23);
    });
  });
  describe("計算できない時", () => {
    it("[[null,null]]のときはpending", () => {
      const result = frameCalc([
        [null, null],
      ]);
      expect(result).toBe('pending');
    });
    it("[[1,null]]のときはpending", () => {
      const result = frameCalc([
        [1, null],
      ]);
      expect(result).toBe('pending');
    });
    describe('スペア', () => {
      it("[[1,9]]のときはpending", () => {
        const result = frameCalc([
          [1, 9],
        ]);
        expect(result).toBe('pending');
      });
      it("[[5,5]]のときはpending", () => {
        const result = frameCalc([
          [5, 5],
        ]);
        expect(result).toBe('pending');
      });
    })
    describe('ストライク', () => {
      it("[[10,null],[10,null]]のときはpending", () => {
        const result = frameCalc([
          [10, null],
          [10, null],
        ]);
        expect(result).toBe('pending');
      });
      it("[[10,null],[5,null]]のときはpending", () => {
        const result = frameCalc([
          [10, null],
          [5, null],
        ]);
        expect(result).toBe('pending');
      });
    })
  })
});


