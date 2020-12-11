import "./Well.scss";
import { CSSProperties, FunctionComponent, MutableRefObject } from "react";
import { WithColliderProps } from "../WithColider/WithCollider";

export interface WellProps {
  style?: CSSProperties;
}
type Props = WellProps & WithColliderProps;

export const Well: FunctionComponent<Props> = ({ elementRef, style }) => {
  return (
    <div
      className="Well"
      ref={elementRef as MutableRefObject<HTMLDivElement>}
      style={style}
    >
      <div className="Well__stick" />
      <div className="Well__stick" />
      <div className="Well__stick" />
      <div className="Well__stick" />
      <div className="Well__stick" />
      <div className="Well__stick" />
    </div>
  );
};
