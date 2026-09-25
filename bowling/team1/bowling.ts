type Rolls = [number, number]
// sum関数の名前をjudge-flameみたいな名前に変更する
export function sum(rolls: Rolls): number | string {
  const first = rolls[0];
  const second = rolls[1];
  const total = first + second;
  if (total === 10) {
    return "スペア";
  }
  return total;
}
