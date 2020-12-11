export function squareComparison(a: number, b: number, c: number): number[] {
  const D = b ** 2 - 4 * a * c;

  if (D < 0) {
    return [];
  }
  if (D === 0) {
    return [(-1 * b) / (2 * a)];
  }

  const sD = Math.sqrt(D);

  const x1 = (-1 * b - sD) / (2 * a);
  const x2 = (-1 * b + sD) / (2 * a);

  return [x1, x2];
}
