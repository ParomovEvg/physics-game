import { useMemo } from "react";

let lastId = 0;

export const useColliderId = (prefix = "", postfix = ""): string => {
  return useMemo(() => `${prefix}${lastId++}${postfix}`, []);
};
