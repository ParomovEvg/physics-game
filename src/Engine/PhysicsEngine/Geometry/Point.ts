export class Point {
  constructor(public x: number, public y: number) {}

  getDistance(p: Point) {
    return Math.sqrt((p.x - this.x) ** 2 + (p.y - this.y) ** 2);
  }
}
