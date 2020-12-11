import { ComponentType,  RefObject } from "react";
import { useCollider } from "./useCollider/useCollider";
import { MaterialData } from "../Engine/Collider/MaterialData";

export interface ColliderOptions extends MaterialData {}

export interface WithColliderProps {
  elementRef: RefObject<HTMLElement | null>;
}

export function WithCollider<T extends WithColliderProps>(
  Component: ComponentType<T>,
  options: ColliderOptions
) {
  const ResultComponent: ComponentType<Omit<
    T,
    keyof WithColliderProps
  >> = props => {
    const colliderProps = useCollider(options);
    return <Component {...(props as T)} {...colliderProps} />;
  };
  ResultComponent.displayName = Component.displayName;
  return ResultComponent;
}
