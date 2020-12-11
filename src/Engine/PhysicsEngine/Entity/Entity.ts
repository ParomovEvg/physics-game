import { Collider } from "../../Collider/Collider";
import { Updatable } from "../../../Updatable";
import { Force } from "./Force";
import { Vector } from "../Geometry/Vector";
import { EntityGeometry, EntityGeometryFactory } from "./EntityGeometryFactory";
import { PositionData } from "../../Collider/PositionData";

interface Speed {
  linear: Vector;
  angular: number;
}

interface Acceleration {
  linear: Vector;
  angular: number;
}

/**
 * Линейная скорость измеряется пиксель в секунду,
 * Угловая скорость измеряется радиан в секунду
 */
export class Entity implements Updatable {
  private _speed: Speed = {
    angular: 0,
    linear: new Vector(0, 0)
  };
  private forceSet = new Set<Force>();

  constructor(
    private collider: Collider,
    private geometryFactory: EntityGeometryFactory = new EntityGeometryFactory(
      collider
    )
  ) {}

  get speed() {
    return this._speed;
  }

  setSpeed(s: Speed) {
    this._speed = s;
  }
  setPosition(p: PositionData) {
    this.collider.setPosition(p);
  }

  get position() {
    return this.collider.getPosition();
  }

  get dimensions() {
    return this.collider.getDimensions();
  }

  get material() {
    return this.collider.getMaterial();
  }

  get mass() {
    return this.collider.getMass();
  }

  get momentInertial() {
    return this.collider.getMomentInertial();
  }

  get geometry(): EntityGeometry {
    return this.geometryFactory.getGeometry();
  }

  getResultingForceVector(): Vector {
    let resForce = Vector.getZero();

    for (const force of this.forceSet) {
      resForce = force.vector.addVector(resForce);
    }
    return resForce;
  }

  setForce(force: Force) {
    this.forceSet.add(force);
  }

  update(fromPrev: number, time: number): void {
    this.updateSpeed(fromPrev, this.computeAcceleration());
    this.updateCollider(fromPrev);
    this.forceSet.clear();
  }

  private updateSpeed(fromPrev: number, acceleration: Acceleration) {
    const speedDiff = acceleration.linear.multiplyScalar(fromPrev);
    this._speed.linear = this._speed.linear.addVector(speedDiff);
    this._speed.angular += acceleration.angular * fromPrev;
  }

  private updateCollider(fromPrev: number) {
    const { rotate, center } = this.collider.getPosition();
    const positionDiff = this._speed.linear.multiplyScalar(fromPrev);
    this.collider.setPosition({
      center: positionDiff.addToPoint(center),
      rotate: rotate + this._speed.angular * fromPrev
    });
  }

  private computeAcceleration(): Acceleration {
    if (this.collider.getMaterial().static)
      return { angular: 0, linear: Vector.getZero() };

    let angularAcceleration = 0;
    let linearAcceleration = Vector.getZero();

    for (const force of this.forceSet) {
      linearAcceleration = force.vector
        .multiplyScalar(1 / this.mass)
        .addVector(linearAcceleration);

      const radiusVector = Vector.fromPoints(
        this.collider.getPosition().center,
        force.forcePoint
      );
      const forceAngularAcceleration =
        radiusVector.vectorProductModule(force.vector) / this.momentInertial;
      const direction = radiusVector.getLeftNormal().dotProduct(force.vector);
      if (direction > 0) {
        angularAcceleration += forceAngularAcceleration;
      } else {
        angularAcceleration -= forceAngularAcceleration;
      }
    }

    if (angularAcceleration > 0) {
    }

    return {
      linear: linearAcceleration,
      angular: isNaN(angularAcceleration) ? 0 : angularAcceleration
    };
  }
}
