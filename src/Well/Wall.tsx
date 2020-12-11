import React, { CSSProperties, FunctionComponent } from "react";
import { WithCollider, WithColliderProps } from "../WithColider/WithCollider";
import "./Wall.scss";

interface OwnProps {
  style?: CSSProperties;
}

type Props = OwnProps & WithColliderProps;

const Wall: FunctionComponent<Props> = ({ style, elementRef }) => {
  return <div ref={elementRef as any} style={style} className={"Wall"} />;
};

export default WithCollider(Wall, {
  mass: 1000,
  static: true,
  frictionCoif: 0.3
});
