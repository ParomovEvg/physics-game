import { Point } from "./Point";
import { RotateService } from "./RotateService";
import { Vector } from "./Vector";
import { LineSegment } from "./LineSegment";

export class Rectangle {
  readonly tops: Point[];
  readonly lineSegments: LineSegment[];
  constructor(
    readonly center: Point,
    readonly w: number,
    readonly h: number,
    readonly rotate: number
  ) {
    this.tops = [
      new Vector(-w / 2, h / 2),
      new Vector(w / 2, h / 2),
      new Vector(w / 2, -h / 2),
      new Vector(-w / 2, -h / 2)
    ]
      .map(v => v.addToPoint(center))
      .map(p => RotateService.rotatePoint(p, rotate, center));

    this.lineSegments = [
      new LineSegment(this.tops[0], this.tops[1]),
      new LineSegment(this.tops[1], this.tops[2]),
      new LineSegment(this.tops[2], this.tops[3]),
      new LineSegment(this.tops[3], this.tops[0])
    ];
  }
}
