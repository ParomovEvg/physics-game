import { MutableRefObject, useContext, useEffect } from "react";
import { mergeObject } from "../../Maybe/MergeObject";
import { createMaybe } from "../../Maybe/Maybe";
import { PositionData } from "../../Engine/Collider/PositionData";
import { DimensionsData } from "../../Engine/Collider/DimensionsData";
import { EngineContext } from "../../Engine/EngineContext";
import { ColliderOptions } from "../WithCollider";
import { Point } from "../../Engine/PhysicsEngine/Geometry/Point";
const exp = /matrix\((.*), (.*), (.*), (.*), (.*), (.*)\)/g;

const getAngularFromTransform = (s: string) => {
  if (s === "none") {
    return 0;
  }
  const [[, cos, sin]] = Array.from(s.matchAll(exp));

  const pCos = parseFloat(cos);
  const pSin = parseFloat(sin);

  let r = 0;
  if (pSin > 0 && pCos > 0) {
    r = Math.asin(pSin);
  }
  if (pSin < 0 && pCos > 0) {
    r = Math.asin(pSin);
  }
  if (pCos < 0 && pSin < 0) {
    r = -Math.acos(pCos);
  }
  if (pCos < 0 && pSin > 0) {
    r = Math.acos(pCos);
  }
  if (r < 0) {
    return r + (2 * Math.PI);
  } else {
    return r;
  }
};

export const useRegisterColliderEffect = (
  id: string,
  ref: MutableRefObject<HTMLElement | null>,
  options: ColliderOptions
) => {
  const context = useContext(EngineContext);
  useEffect(() => {
    mergeObject({
      element: createMaybe(ref.current),
      engine: context
    }).map(({ engine, element }) => {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      const transform = style.transform;
      const position: PositionData = {
        center: new Point(
          (rect.left + rect.right) / 2,
          (rect.top + rect.bottom) / 2
        ),
        rotate: getAngularFromTransform(transform)
      };
      const dimensions: DimensionsData = {
        h: element.offsetHeight,
        w: element.offsetWidth,
        isCircle:
          style.borderRadius === "50%" &&
          element.offsetHeight === element.offsetWidth
      };
      engine.registerCollider(id, position, dimensions, options);
    });
  }, [context, ref]);
};
