import { Point } from "./Point";
import { RotateService } from "./RotateService";

export class Vector {
  constructor(public readonly i: number, public readonly j: number) {}

  static getZero() {
    return new Vector(0, 0);
  }

  static fromPoints(startPoint: Point, endPoint: Point) {
    return new Vector(endPoint.x - startPoint.x, endPoint.y - startPoint.y);
  }

  addToPoint(p: Point): Point {
    return new Point(p.x + this.i, p.y + this.j);
  }

  addVector(v: Vector) {
    return new Vector(this.i + v.i, this.j + v.j);
  }

  multiplyScalar(coif: number) {
    return new Vector(this.i * coif, this.j * coif);
  }

  module() {
    return Math.sqrt(this.i ** 2 + this.j ** 2);
  }

  dotProduct(v: Vector) {
    return v.i * this.i + v.j * this.j;
  }

  angleVectors(v: Vector) {
    return Math.acos(this.dotProduct(v) / (v.module() * this.module()));
  }

  vectorProductModule(v: Vector) {
    const res = this.module() * v.module() * Math.sin(this.angleVectors(v));
    if (isNaN(res)) {
      return 0;
    } else {
      return res;
    }
  }

  getLeftNormal(): Vector {
    if (this.i === 0 && this.j === 0) {
      return Vector.getZero();
    }
    if (this.i === 0) {
      return new Vector(this.j > 0 ? -1 : 1, 0);
    }
    if (this.j === 0) {
      return new Vector(0, this.i > 0 ? 1 : -1);
    }
    const rotated = RotateService.rotateVector(this, Math.PI / 2);
    return rotated.singularLength();
  }

  getRightNormal(): Vector {
    return this.getLeftNormal().multiplyScalar(-1);
  }

  singularLength() {
    return this.multiplyScalar(1 / this.module());
  }

  isCollinearVector(vector: Vector) {
    if (vector.i === 0 || vector.j === 0 || this.i === 0 || this.j === 0) {
      if (vector.i === 0 && this.i === 0) {
        return true;
      }
      return vector.j === 0 && this.j === 0;

    } else {
      return (
        Math.abs(Math.floor((vector.i / vector.j) * 1000)) ===
        Math.abs(Math.floor((this.i / this.j) * 1000))
      );
    }
  }
}
