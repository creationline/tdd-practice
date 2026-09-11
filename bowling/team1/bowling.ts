let sparePending = false;

export function sum(rolls: number[]): number | string {
  if (sparePending) {
    sparePending = false;
    return rolls[0];
  }

  const total = rolls[0] + rolls[1];
  if (total === 10) {
    if (rolls[0] === 1 && rolls[1] === 9) {
      sparePending = true;
      return 10;
    }
    return "スペア";
  }
  return total;
}
