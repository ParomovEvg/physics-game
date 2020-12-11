import { WithCollider } from "../WithColider/WithCollider";
import { Well } from "./Well";

export const WellContainer = WithCollider(Well, {
  frictionCoif: 0.5,
  mass: 10,
  static: false
});
export const BigWell = WithCollider(Well, {
  frictionCoif: 0.5,
  mass: 40,
  static: false
});
