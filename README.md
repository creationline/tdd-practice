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

### devcontainer（推奨）

devcontainer を使うと、Node.js・pnpm などの依存関係をローカル環境に一切インストールせずに開発を始められる。

#### 1. Docker Engine をインストールする

公式ドキュメントの手順に従ってインストールする: [Ubuntu](https://docs.docker.com/engine/install/ubuntu/) / [Debian](https://docs.docker.com/engine/install/debian/) / [Fedora](https://docs.docker.com/engine/install/fedora/) / [RHEL](https://docs.docker.com/engine/install/rhel/)

インストール後、一般ユーザーで `docker` コマンドを使えるよう [post-install の手順](https://docs.docker.com/engine/install/linux-postinstall/) も済ませておく。

```bash
sudo usermod -aG docker $USER
# ログアウトして再ログインすると反映される
```

> **注意:** コンテナが動かせる環境であれば Docker Engine 以外でも動作する。OrbStack・Rancher Desktop・Podman Desktop など、好みのコンテナ基盤を使って構わない。

#### 2. VS Code と Dev Containers 拡張機能をインストールする

- [Visual Studio Code](https://code.visualstudio.com/) をインストール
- VS Code の拡張機能タブで **Dev Containers**（`ms-vscode-remote.remote-containers`）を検索してインストール

#### 3. コンテナを起動する

1. VS Code でこのリポジトリを開く
2. 右下に「Reopen in Container」の通知が出たらクリック（出ない場合はコマンドパレット `Ctrl+Shift+P` → `Dev Containers: Reopen in Container`）
3. 初回はイメージのビルドに数分かかる。完了すると `mise install` と `pnpm install` が自動実行され、すぐに開発を始められる

### ローカル（mise）

[mise](https://mise.jdx.dev) をインストールしてから以下を実行する。

```bash
# mise のインストール（未インストールの場合）
curl https://mise.run | sh

# Node.js・pnpm などのツールをインストール
mise install

# パッケージをインストール
pnpm install
```

## 練習課題

- [`fizzbuzz/`](./fizzbuzz/) — FizzBuzz
