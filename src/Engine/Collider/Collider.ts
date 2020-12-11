import { MaterialData } from "./MaterialData";
import { DimensionsData } from "./DimensionsData";
import { PositionData } from "./PositionData";

export class Collider {
  private readonly momentInertial: number;
  constructor(
    private position: PositionData,
    private dimensions: DimensionsData,
    private material: MaterialData
  ) {
    this.momentInertial = this.computeMomentInertial();
  }

  getPosition() {
    return this.position;
  }

  getDimensions() {
    return this.dimensions;
  }

  getMass() {
    return this.material.mass;
  }
  getMomentInertial() {
    return this.momentInertial;
  }

  getMaterial() {
    return this.material;
  }

  setPosition(p: PositionData) {
    this.position = p;
  }

  private computeMomentInertial() {
    const { h, w, isCircle } = this.dimensions;
    if (isCircle) {
      const R = w / 2;
      return 0.5 * R ** 2 * this.material.mass;
    } else {
      return ((h ** 2 + w ** 2) / 12) * this.material.mass;
    }
  }
}
