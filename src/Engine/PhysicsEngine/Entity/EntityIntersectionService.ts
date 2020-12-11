import { EntitySet } from "../EntitySet/EntitySet";
import { Point } from "../Geometry/Point";
import { Vector } from "../Geometry/Vector";
import { Entity } from "./Entity";
import { Circle } from "../Geometry/Circle";
import { Maybe } from "../../../Maybe/Maybe";
import { Empty } from "../../../Maybe/Empty";
import { Result } from "../../../Maybe/Result";
import { Rectangle } from "../Geometry/Rectangle";
import { IntersectionService } from "../Geometry/IntersectionService";
import { LineSegment } from "../Geometry/LineSegment";

interface EntityIntersection {
  normal: Vector;
  forcePoint: Point;
  target: Entity;
}

export class EntityIntersectionService {
  private intersections = new Map<Entity, EntityIntersection[]>();
  constructor(private entitySet: EntitySet) {}

  getEntityIntersections(entity: Entity): EntityIntersection[] {
    return this.intersections.get(entity) ?? [];
  }

  computeEntityIntersections() {
    this.intersections.clear();
    const entityArray = Array.from(this.entitySet);

    for (const entity of entityArray) {
      const intersectionsArray: EntityIntersection[] = [];

      entityArray.forEach(outerEntity => {
        if (outerEntity === entity) return;
        const geometry1 = entity.geometry;
        const geometry2 = outerEntity.geometry;

        if (geometry1 instanceof Circle && geometry2 instanceof Circle) {
          this.circleCircleIntersection(
            geometry1,
            geometry2,
            outerEntity
          ).map(e => intersectionsArray.push(e));
        }
        if (geometry1 instanceof Rectangle && geometry2 instanceof Circle) {
          this.rectangleCircleIntersection(
            geometry1,
            geometry2,
            outerEntity
          ).map(e => intersectionsArray.push(e));
        }
        if (geometry1 instanceof Circle && geometry2 instanceof Rectangle) {
          this.circleRectangleIntersection(
            geometry1,
            geometry2,
            outerEntity
          ).map(e => intersectionsArray.push(e));
        }
        if (geometry1 instanceof Rectangle && geometry2 instanceof Rectangle) {
          this.rectangleRectangleIntersection(
            geometry1,
            geometry2,
            outerEntity
          ).map(e => intersectionsArray.push(e));
        }
      });

      this.intersections.set(entity, intersectionsArray);
    }
  }

  private rectangleRectangleIntersection(
    r1: Rectangle,
    r2: Rectangle,
    target: Entity
  ): Maybe<EntityIntersection> {
    const [x1, x2] = r1.lineSegments
      .map(l1 =>
        r2.lineSegments.map(l2 =>
          IntersectionService.lineSegmentLineSegmentIntersectionPoints(l1, l2)
        )
      )
      .flat(2);

    if (x1 && x2) {
      const forcePoint = new LineSegment(x1, x2).getCenter();
      const normal = Vector.fromPoints(forcePoint, r1.center).singularLength();
      return Result.of<EntityIntersection>({
        normal,
        forcePoint,
        target
      });
    } else {
      return Empty.get();
    }
  }

  private circleRectangleIntersection(
    c: Circle,
    r: Rectangle,
    target: Entity
  ): Maybe<EntityIntersection> {
    const [x1, x2] = r.lineSegments
      .map(l => IntersectionService.lineSegmentCircleIntersectionPoints(l, c))
      .flat();

    if (x1 && x2) {
      const forcePoint = new LineSegment(x1, x2).getCenter();
      const normal = Vector.fromPoints(forcePoint, c.center).singularLength();
      return Result.of<EntityIntersection>({
        normal,
        forcePoint,
        target
      });
    } else {
      return Empty.get();
    }
  }

  private rectangleCircleIntersection(r: Rectangle, c: Circle, target: Entity) {
    return this.circleRectangleIntersection(c, r, target).map<
      EntityIntersection
    >(i => ({
      forcePoint: i.forcePoint,
      normal: new Vector(-i.normal.i, -i.normal.j),
      target
    }));
  }

  private circleCircleIntersection(
    c1: Circle,
    c2: Circle,
    target: Entity
  ): Maybe<EntityIntersection> {
    const distance = c1.center.getDistance(c2.center);
    if (distance > c1.radius + c2.radius) return Empty.get();

    const radiusVector = Vector.fromPoints(c2.center, c1.center);
    const normal = radiusVector.singularLength();
    const forcePoint = radiusVector
      .multiplyScalar(c1.radius / (c1.radius + c2.radius))
      .addToPoint(c1.center);

    return Result.of<EntityIntersection>({
      forcePoint,
      normal,
      target
    });
  }
}
