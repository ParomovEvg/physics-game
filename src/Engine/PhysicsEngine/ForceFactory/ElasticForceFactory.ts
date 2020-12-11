import { ForceFactory } from "./ForceFactory";
import { EntitySet } from "../EntitySet/EntitySet";
import { EntityIntersectionService } from "../Entity/EntityIntersectionService";
import { Rectangle } from "../Geometry/Rectangle";

export class ElasticForceFactory implements ForceFactory {
  constructor(private intersectionService: EntityIntersectionService) {}

  static CONSTANT = 10e5;

  static K = 1;

  setForceToEachEntity(entitySet: EntitySet): void {
    const list = Array.from(entitySet);
    list.forEach(entity => {
      const geometry = entity.geometry;
      if (geometry instanceof Rectangle) return;
      const intersections = this.intersectionService.getEntityIntersections(
        entity
      );
      intersections.forEach(intersection => {
        const targetEntity = intersection.target;
        const targetGeometry = intersection.target.geometry;
        if (targetGeometry instanceof Rectangle) {
          const vDiffModule =
            Math.abs(entity.speed.linear.dotProduct(intersection.normal)) * 0.8;
          const vDiff = intersection.normal
            .multiplyScalar(vDiffModule)
            .multiplyScalar(2);
          const newV = entity.speed.linear.addVector(vDiff);
          entity.setSpeed({
            linear: newV,
            angular: entity.speed.angular
          });
          const positionDiff = intersection.normal.multiplyScalar(
            geometry.radius -
              geometry.center.getDistance(intersection.forcePoint)
          );
          entity.setPosition({
            rotate: entity.position.rotate,
            center: positionDiff.addToPoint(entity.position.center)
          });
        } else {
          const v1 = entity.speed.linear.dotProduct(intersection.normal);
          const v2 = targetEntity.speed.linear.dotProduct(intersection.normal);
          const m1 = entity.mass;
          const m2 = targetEntity.mass;
          const vDiffModule =
            Math.abs((2 * m2 * v2 + (m1 - m2) * v1) / (m1 + m2)) * 0.7;
          const vDiff = intersection.normal.multiplyScalar(vDiffModule);
          const newV = entity.speed.linear.addVector(vDiff);
          entity.setSpeed({
            linear: newV,
            angular: entity.speed.angular
          });

          const positionDiff = intersection.normal.multiplyScalar(
            geometry.radius -
              geometry.center.getDistance(intersection.forcePoint)
          );
          entity.setPosition({
            rotate: entity.position.rotate,
            center: positionDiff.addToPoint(entity.position.center)
          });
        }
      });
    });
  }
}
