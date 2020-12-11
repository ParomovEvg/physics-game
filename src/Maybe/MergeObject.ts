import { InferMaybeValue, Maybe } from "./Maybe";
import { Empty } from "./Empty";
import { Result } from "./Result";

export function mergeObject<T extends Record<string, Maybe<any>>>(
  obj: T
): Maybe<{ [K in keyof T]: InferMaybeValue<T[K]> }>;
export function mergeObject(obj: any): any {
  const keys = Object.keys(obj);
  const res: any = {};
  for (const key of keys) {
    const value = obj[key];
    if (value instanceof Empty) {
      return Empty.get();
    } else {
      res[key] = value.unwrap();
    }
  }
  return Result.of(res);
}
