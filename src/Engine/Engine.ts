import { GameLoop } from "./GameLoop";
import { PositionData } from "./Collider/PositionData";
import { ColliderRegistry } from "./ColliderRegistry/ColliderRegistry";
import { MaterialData } from "./Collider/MaterialData";
import { DimensionsData } from "./Collider/DimensionsData";
import { Collider } from "./Collider/Collider";
import { PhysicsEngine } from "./PhysicsEngine/PhysicsEngine";

export class Engine {
  constructor(
    private loop = new GameLoop(),
    private colliders = new ColliderRegistry(),
    private physicsEngine = new PhysicsEngine()
  ) {}

  start() {
    this.loop.subscribe(this.physicsEngine.update);
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }

  registerCollider(
    token: string,
    position: PositionData,
    dimensions: DimensionsData,
    material: MaterialData
  ) {
    const collider = new Collider(position, dimensions, material);
    this.colliders.register(token, collider);
    this.physicsEngine.addCollider(collider);
  }

  subscribeRerender(
    token: string,
    fn: (position: PositionData, dimensions: DimensionsData) => void
  ) {
    const collider = this.colliders.getCollider(token);
    if (collider) {
      this.loop.subscribe(() => {
        fn(collider.getPosition(), collider.getDimensions());
      });
    }
  }
}
