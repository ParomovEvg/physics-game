import { Point } from "../Geometry/Point";
import { Vector } from "../Geometry/Vector";

export interface Force {
  forcePoint: Point;
  vector: Vector;
}
