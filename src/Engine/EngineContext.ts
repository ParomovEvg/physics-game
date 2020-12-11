import React from "react";
import { Maybe } from "../Maybe/Maybe";
import { Engine } from "./Engine";
import { Empty } from "../Maybe/Empty";

export const EngineContext = React.createContext<Maybe<Engine>>(Empty.get());
