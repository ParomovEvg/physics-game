import { Line } from "./Line";
import { Point } from "./Point";
import { Circle } from "./Circle";
import { squareComparison } from "../../../squareComparison";
import { LineSegment } from "./LineSegment";

export class IntersectionService {
  static lineLineIntersectionPoints(l1: Line, l2: Line) {
    if (IntersectionService.isParallelLines(l1, l2)) {
      return [];
    }
    const A1 = l1.A;
    const B1 = l1.B;
    const C1 = l1.C;
    const A2 = l2.A;
    const B2 = l2.B;
    const C2 = l2.C;
    return [
      new Point(
        (B1 * C2 - B2 * C1) / (A1 * B2 - A2 * B1),
        (C1 * A2 - C2 * A1) / (A1 * B2 - A2 * B1)
      )
    ];
  }

  static lineSegmentLineSegmentIntersectionPoints(
    ls1: LineSegment,
    ls2: LineSegment
  ) {
    const points = IntersectionService.lineLineIntersectionPoints(
      ls1.line,
      ls2.line
    );
    return points.filter(
      p => ls1.isPointInPointsRectangle(p) && ls2.isPointInPointsRectangle(p)
    );
  }

  static lineCircleIntersectionPoints(l: Line, c: Circle) {
    const A = l.A;
    const B = l.B;
    const C = l.C;
    const x0 = c.center.x;
    const y0 = c.center.y;
    const R = c.radius;

    if (A === 0) {
      const a = 1;
      const b = -1 * 2 * x0;
      const c = x0 ** 2 + (C / B + y0) ** 2 - R ** 2;
      const y = (-1 * C) / B;
      return squareComparison(a, b, c).map(x => new Point(x, y));
    } else {
      const a = B ** 2 / A ** 2 + 1;
      const b = (2 * B * C) / A ** 2 + (2 * B * x0) / A - 2 * y0;
      const c = C ** 2 / A ** 2 + x0 ** 2 + (2 * C * x0) / A + y0 ** 2 - R ** 2;
      const computeX = (y: number) => (-1 * (B * y + C)) / A;
      const yList = squareComparison(a, b, c);
      return yList.map(y => new Point(computeX(y), y));
    }
  }

  static lineSegmentCircleIntersectionPoints(ls: LineSegment, c: Circle) {
    const intersectionPoints = IntersectionService.lineCircleIntersectionPoints(
      ls.line,
      c
    );
    return intersectionPoints.filter(point => {
      return ls.isPointInPointsRectangle(point);
    });
  }

  static isParallelLines(l1: Line, l2: Line) {
    return l1.normal.isCollinearVector(l2.normal);
  }
}
