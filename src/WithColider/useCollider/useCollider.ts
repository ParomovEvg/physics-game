import { ColliderOptions, WithColliderProps } from "../WithCollider";
import { useRef } from "react";
import { useColliderId } from "../useColliderId";
import { useRegisterColliderEffect } from "./useRegisterColliderEffect";
import { useColliderViewStyle } from "./useColliderViewStyle";

export const useCollider = (options: ColliderOptions): WithColliderProps => {
  const id = useColliderId("collider-");
  const elementRef = useRef<HTMLElement | null>(null);
  useRegisterColliderEffect(id, elementRef, options);
  useColliderViewStyle(id, elementRef);

  return {
    elementRef
  };
};
