import { Collider } from "../../Collider/Collider";
import { Circle } from "../Geometry/Circle";
import { Rectangle } from "../Geometry/Rectangle";

export type EntityGeometry = Circle | Rectangle;

export class EntityGeometryFactory {
  constructor(private collider: Collider) {}

  getGeometry(): EntityGeometry {
    if (this.collider.getDimensions().isCircle) {
      return this.getCircle();
    } else {
      return this.getRectangle();
    }
  }

  private getCircle() {
    const R = this.collider.getDimensions().w / 2;
    return new Circle(R, this.collider.getPosition().center);
  }

  private getRectangle() {
    const { center, rotate } = this.collider.getPosition();
    const { w, h } = this.collider.getDimensions();
    return new Rectangle(center, w, h, rotate);
  }
}
