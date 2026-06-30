# tdd-practice

TDD練習用のリポジトリ。

## カノンTDD

1. **Red** — 失敗するテストを1つ書く
2. **Green** — そのテストだけを通す最小限の実装を書く
3. **Refactor** — テストを壊さずにコードを整理する

この3ステップを小さく繰り返す。一度に複数のテストを追加しない。

### AI との役割分担

| フェーズ | 担当 |
|----------|------|
| Red（テストを書く） | 人間 |
| Green（実装を書く） | AI でも可 |
| Refactor | どちらでも可 |

テストを書くのは人間の仕事。AIにはテストの書き方や構文について質問できるが、テスト自体は自分で書く。

### Todo リスト

実装前に「これを動かさなければならない」ことを紙やコメントに書き出す。ケントベックの _テスト駆動開発_ で中心的な役割を果たすプラクティス。

- これから書くべきテストケースを列挙する
- テストをパスしたらリストから消す
- 実装中に気づいた懸念・アイデアもその場でリストに追加する（今は実装しない）

Todo リストは「今やること」を1つに絞るための道具。リストが育ったり減ったりするのは正常。

## Vitest 基本構文

### テストの構造

```ts
import { describe, it, test, expect } from "vitest"

// describe: テストをグループ化する。ネスト可能
describe("fizzbuzz", () => {
  // it / test: 1つのテストケース（どちらでも同じ）
  it("1を渡すと'1'を返す", () => {
    expect(fizzbuzz(1)).toBe("1")
  })

  test("3を渡すと'Fizz'を返す", () => {
    expect(fizzbuzz(3)).toBe("Fizz")
  })
})
```

### expect のマッチャー

```ts
// 値の等値比較
expect(value).toBe(1)           // プリミティブの厳密等値 (===)
expect(value).toEqual({ a: 1 }) // オブジェクト・配列の深い等値比較
expect(value).not.toBe(1)       // 否定

// 真偽
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()
expect(value).toBeDefined()

// 数値
expect(value).toBeGreaterThan(0)
expect(value).toBeGreaterThanOrEqual(1)
expect(value).toBeLessThan(10)
expect(value).toBeCloseTo(0.3)  // 浮動小数点の比較

// 文字列
expect(str).toContain("Fizz")
expect(str).toMatch(/^Fizz/)

// 配列
expect(arr).toContain(3)
expect(arr).toHaveLength(4)

// 例外
expect(() => fn()).toThrow()
expect(() => fn()).toThrow("エラーメッセージ")
expect(() => fn()).toThrow(TypeError)
```

### スキップ・フォーカス

```ts
it.skip("まだ実装しない", () => { ... }) // スキップ
it.todo("あとで書く")                     // Todo（本文なし）
it.only("これだけ実行", () => { ... })   // このテストだけ実行
```

## テスト実行

```bash
# 1回だけ実行
pnpm test

# ウォッチモード（TDD中はこちら）
pnpm test:watch
```

## セットアップ

```bash
mise install
pnpm install
```

## 練習課題

- [`fizzbuzz/`](./fizzbuzz/) — FizzBuzz
