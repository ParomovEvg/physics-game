import { MutableRefObject, useContext, useEffect, useRef } from "react";
import { EngineContext } from "../../Engine/EngineContext";
import { mergeObject } from "../../Maybe/MergeObject";
import { createMaybe } from "../../Maybe/Maybe";

export const useColliderViewStyle = (
  id: string,
  ref: MutableRefObject<HTMLElement | null>
) => {
  const context = useContext(EngineContext);
  const lastDataRef = useRef({});

  useEffect(() => {
    mergeObject({
      engine: context,
      element: createMaybe(ref.current)
    }).map(({ engine, element }) => {
      const { x: initialX, y: initialY } = element.getBoundingClientRect();
      engine.subscribeRerender(id, (data, dimensions) => {
        const dy = dimensions.h / 2;
        const dx = dimensions.w / 2;
        const cos = Math.abs(Math.cos(data.rotate));
        const sin = Math.abs(Math.sin(data.rotate));
        let translateX;
        let translateY;
        if (dimensions.isCircle) {
          translateX = data.center.x - dx - initialX;
          translateY = data.center.y - dy - initialY;
        } else {
          translateX = data.center.x + (-sin * dy - cos * dx) + -initialX;
          translateY = data.center.y - (cos * dy + sin * dx) - initialY;
        }
        if (!dimensions.isCircle && data.rotate !== 0) {
          // console.log(Math.sin(data.rotate), Math.cos(data.rotate));
        }
        if (!firstLevelEqual(lastDataRef.current, data)) {
          element.style.transform = `translate(${translateX}px,${translateY}px) rotate(${data.rotate}rad)`;
        }
        lastDataRef.current = data;
      });
    });
  }, [context]);
};

export function firstLevelEqual(
  obj1: Record<string, any>,
  obj2: Record<string, any>
) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  return (
    keys1.length === keys2.length && keys1.every(key => obj1[key] === obj2[key])
  );
}
