export function memo<T extends (arg: any) => any>(fn: T): T;
export function memo(fn: any): any {
  const argumentsMap = new Map();
  return (arg: any) => {
    if (argumentsMap.has(arg)) {
      return argumentsMap.get(arg);
    } else {
      const res = fn(arg);
      argumentsMap.set(arg, res);
      return res;
    }
  };
}
