import { EntitySet } from "../EntitySet/EntitySet";

export interface ForceFactory {
  setForceToEachEntity(entitySet: EntitySet): void;
}
