import { Point } from "./Point";
import { Vector } from "./Vector";
import { LineSegment } from "./LineSegment";

export class RotateService {
  static rotatePoint(p: Point, angular: number, p0: Point = new Point(0, 0)) {
    const cos = Math.cos(angular);
    const sin = Math.sin(angular);
    const x = (p.x - p0.x) * cos - (p.y - p0.y) * sin + p0.x;
    const y = (p.x - p0.x) * sin + (p.y - p0.y) * cos + p0.y;
    return new Point(x, y);
  }

  static rotateVector(vec: Vector, angular: number) {
    const cos = Math.cos(angular);
    const sin = Math.sin(angular);
    return new Vector(vec.i * cos - vec.j * sin, vec.i * sin + vec.j * cos);
  }

  static rotateLineSegment(
    line: LineSegment,
    angular: number,
    p0: Point = new Point(0, 0)
  ) {
    return new LineSegment(
      RotateService.rotatePoint(line.p1, angular, p0),
      RotateService.rotatePoint(line.p2, angular, p0)
    );
  }
}
