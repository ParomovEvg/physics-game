import React, { useEffect, useMemo } from "react";
import { EngineContext } from "../Engine/EngineContext";
import { Engine } from "../Engine/Engine";
import { Result } from "../Maybe/Result";

export interface EngineProviderProps {
  engine: Engine;
}

export const EngineProvider: React.FC<EngineProviderProps> = ({
  engine,
  children
}) => {
  useEffect(() => {
    setTimeout(() => {
      engine.start();
    }, 1000)
    return () => engine.stop();
  }, [engine]);
  return (
    <EngineContext.Provider value={useMemo(() => Result.of(engine), [engine])}>
      {children}
    </EngineContext.Provider>
  );
};
