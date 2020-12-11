import { ForceFactory } from "./ForceFactory";
import { EntitySet } from "../EntitySet/EntitySet";
import { Vector } from "../Geometry/Vector";

export class WallForce implements ForceFactory {
  static CONSTANT = 1000;
  static BUFFER = 10;

  setForceToEachEntity(entitySet: EntitySet): void {
    const leftLimit = WallForce.BUFFER;
    const rightLimit = window.innerWidth - WallForce.BUFFER;
    const topLimit = WallForce.BUFFER;
    const bottomLimit = window.innerHeight - WallForce.BUFFER;

    for (const entity of entitySet) {
      const leftLimitExiting =
        leftLimit - (entity.position.center.x - entity.dimensions.w / 2);
      const rightLimitExiting =
        entity.position.center.x + entity.dimensions.w / 2 - rightLimit;
      const topLimitExiting =
        topLimit - (entity.position.center.y - entity.dimensions.h / 2);
      const bottomLimitExiting =
        entity.position.center.y + entity.dimensions.h / 2 - bottomLimit + 50;

      let x = 0;
      let y = 0;

      if (leftLimitExiting > 0) {
        x = leftLimitExiting;
      }
      if (rightLimitExiting > 0) {
        x = -rightLimitExiting;
      }
      if (topLimitExiting > 0) {
        y = topLimitExiting;
      }
      if (bottomLimitExiting > 0) {
        y = -bottomLimitExiting;
      }

      entity.setForce({
        vector: new Vector(x, y)
          .multiplyScalar(entity.mass)
          .multiplyScalar(WallForce.CONSTANT),
        forcePoint: entity.position.center
      });
    }
  }
}
