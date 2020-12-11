import { EntitySet } from "../EntitySet/EntitySet";
import { memo } from "../Memo";
import { Force } from "../Entity/Force";
import { Entity } from "../Entity/Entity";
import { Vector } from "../Geometry/Vector";
import { ForceFactory } from "./ForceFactory";

export class GravityForceFactory implements ForceFactory {
  static G = 2000;
  setForceToEachEntity(entitySet: EntitySet) {
    for (const entity of entitySet) {
      entity.setForce(this.calculateGravityForce(entity));
    }
  }

  private calculateGravityForce = (entity: Entity): Force => {
    return {
      vector: this.calculateGravityForceMassVector(entity.mass),
      forcePoint: entity.position.center
    };
  };

  private calculateGravityForceMassVector = memo(
    (mass: number): Vector => {
      return new Vector(0, GravityForceFactory.G * mass);
    }
  );
}
