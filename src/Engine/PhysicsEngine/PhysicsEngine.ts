import { EntitySet } from "./EntitySet/EntitySet";
import { Collider } from "../Collider/Collider";
import { Entity } from "./Entity/Entity";
import { ForceFactory } from "./ForceFactory/ForceFactory";
import { EntityIntersectionService } from "./Entity/EntityIntersectionService";
import { ElasticForceFactory } from "./ForceFactory/ElasticForceFactory";
import { GravityForceFactory } from "./ForceFactory/GravityForceFactory";
import { MediumResistance } from "./ForceFactory/MediumResistance";
import { FrictionForceFactory } from "./ForceFactory/FrictionForceFactory";

const toSeconds = (milliseconds: number): number => milliseconds / 1000;

export class PhysicsEngine {
  private lastUpdate: number = 0;
  constructor(
    private entitySet = new EntitySet(),
    private intersectionService = new EntityIntersectionService(entitySet),
    private forceList: ForceFactory[] = [
      new ElasticForceFactory(intersectionService),
      new GravityForceFactory(),
      new MediumResistance(),
      new FrictionForceFactory(intersectionService)
    ]
  ) {}

  addCollider(collider: Collider) {
    this.entitySet.addEntity(new Entity(collider));
  }

  update: FrameRequestCallback = time => {
    this.preparedUpdate(toSeconds(time - this.lastUpdate), toSeconds(time));
    this.lastUpdate = time;
  };

  private preparedUpdate(fromPrev: number, total: number) {
    fromPrev = fromPrev > 0.1 ? 0 : fromPrev;
    this.intersectionService.computeEntityIntersections();

    for (const forceFactory of this.forceList) {
      forceFactory.setForceToEachEntity(this.entitySet);
    }

    this.entitySet.update(fromPrev, total);
  }
}
