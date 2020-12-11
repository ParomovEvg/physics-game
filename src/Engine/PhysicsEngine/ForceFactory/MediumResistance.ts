import { ForceFactory } from "./ForceFactory";
import {EntitySet} from "../EntitySet/EntitySet";

export class MediumResistance implements ForceFactory {
  setForceToEachEntity(entitySet: EntitySet): void {
    for(const entity of entitySet){
      entity.setForce({
        vector: entity.speed.linear.multiplyScalar(-1).multiplyScalar(0.3),
        forcePoint: entity.position.center
      })
    }
  }
}
