import { ForceFactory } from "./ForceFactory";
import { EntitySet } from "../EntitySet/EntitySet";
import { EntityIntersectionService } from "../Entity/EntityIntersectionService";
import { Entity } from "../Entity/Entity";
import { Rectangle } from "../Geometry/Rectangle";
import { Circle } from "../Geometry/Circle";

export class FrictionForceFactory implements ForceFactory {
  constructor(private intersectionService: EntityIntersectionService) {}

  setForceToEachEntity(entitySet: EntitySet): void {
    for (const entity of entitySet) {
      this.setForceToEntity(entity);
    }
  }

  private setForceToEntity(entity: Entity) {
    const intersections = this.intersectionService.getEntityIntersections(
      entity
    );

    for (const intersection of intersections) {
      const ownGeometry = entity.geometry;
      const targetGeometry = intersection.target.geometry;
      if (
        targetGeometry instanceof Rectangle &&
        ownGeometry instanceof Circle
      ) {
        const force = entity.getResultingForceVector();
        const interactionForceModule = intersection.normal
          .multiplyScalar(-1)
          .dotProduct(force);
        if (interactionForceModule > 0) {
          const positiveRotateAxes = intersection.normal.getRightNormal();

          const rotatePointSpeedModule =
            entity.speed.angular * ownGeometry.radius;
          const linearPointSpeedModule = positiveRotateAxes.dotProduct(
            entity.speed.linear
          );
          const fullSpeed = rotatePointSpeedModule + linearPointSpeedModule;

          const forceDirection =
            fullSpeed > 0
              ? positiveRotateAxes.multiplyScalar(-1)
              : positiveRotateAxes;

          entity.setForce({
            forcePoint: intersection.forcePoint,
            vector: forceDirection
              .multiplyScalar(interactionForceModule)
              .multiplyScalar(entity.material.frictionCoif)
          });

          // intersection.normal.getRightNormal().dotProduct(entity.speed.linear)
        }
      }
    }
  }
}
