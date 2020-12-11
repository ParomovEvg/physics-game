import { Vector } from "./Vector";
import { Point } from "./Point";

export class Line {
  A: number;
  B: number;
  C: number;
  normal: Vector;

  constructor(readonly directionVector: Vector, readonly point: Point) {
    this.normal = directionVector.getLeftNormal();
    this.A = this.normal.i;
    this.B = this.normal.j;
    this.C = -1 * (this.A * point.x + this.B * point.y);
  }

  static fromTwoPoints(p1: Point, p2: Point) {
    return new Line(Vector.fromPoints(p1, p2), p1);
  }

  get isParallelX() {
    return this.directionVector.j === 0;
  }

  get isParallelY() {
    return this.directionVector.i === 0;
  }

  getXByY(y: number) {
    return (
      (y - this.point.y) * (this.directionVector.i / this.directionVector.j) +
      this.point.x
    );
  }

  getYByX(x: number) {
    return (
      (x - this.point.x) * (this.directionVector.j / this.directionVector.i) +
      this.point.y
    );
  }
}
