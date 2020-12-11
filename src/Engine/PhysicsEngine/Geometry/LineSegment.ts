import { Point } from "./Point";
import { Line } from "./Line";

export class LineSegment {
  public line: Line;
  constructor(public p1: Point, public p2: Point) {
    this.line = Line.fromTwoPoints(p1, p2);
  }

  isPointInPointsRectangle(p: Point) {
    const xMin = this.p1.x > this.p2.x ? this.p2.x : this.p1.x;
    const xMax = this.p1.x < this.p2.x ? this.p2.x : this.p1.x;
    const yMin = this.p1.y > this.p2.y ? this.p2.y : this.p1.y;
    const yMax = this.p1.y < this.p2.y ? this.p2.y : this.p1.y;
    const x = p.x;
    const y = p.y;
    return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
  }

  getCenter() {
    return new Point((this.p1.x + this.p2.x) / 2, (this.p1.y + this.p2.y) / 2);
  }
}
