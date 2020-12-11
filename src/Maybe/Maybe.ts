import { Result } from "./Result";
import { Empty } from "./Empty";

export interface Maybe<T> {
  unwrap(): T | undefined;
  map<N>(fn: (e: T) => N): Maybe<N>;
  chain<N>(fn: (e: T) => Maybe<N>): Maybe<N>;
  default<N>(d: N): N | T;
}

export type InferMaybeValue<T extends Maybe<any>> = T extends Maybe<infer F>
  ? F
  : never;

export const createMaybe = <T>(v: T | undefined | null): Maybe<T> => {
  if (v === null || v === undefined) {
    return Empty.get();
  } else {
    return Result.of(v);
  }
};
