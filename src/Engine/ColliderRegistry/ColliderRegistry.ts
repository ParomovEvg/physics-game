import { Collider } from "../Collider/Collider";

export class ColliderRegistry {
  private collidersList = new Map<string, Collider>();

  register(token: string, collider: Collider) {
    this.collidersList.set(token, collider);
  }

  getCollider(token: string) {
    return this.collidersList.get(token);
  }

  getAll() {
    return Array.from(this.collidersList.values());
  }
}
