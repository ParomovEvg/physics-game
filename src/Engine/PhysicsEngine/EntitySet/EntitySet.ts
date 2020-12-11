import { Entity } from "../Entity/Entity";
import { Updatable } from "../../../Updatable";

export class EntitySet implements Updatable {
  private readonly set: Set<Entity>;

  constructor(arr?: Entity[]) {
    this.set = new Set<Entity>(arr);
  }

  addEntity(e: Entity) {
    this.set.add(e);
  }

  update(fromPrev: number, time: number): void {
    for (const entity of this.set) {
      entity.update(fromPrev, time);
    }
  }

  [Symbol.iterator]() {
    return this.set[Symbol.iterator]();
  }
}
