import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Field } from "./Field";
import { EngineProvider } from "./EngineProvider/EngineProvider";
import { Engine } from "./Engine/Engine";
import {Vector} from "./Engine/PhysicsEngine/Geometry/Vector";
const engine = new Engine();

const vector = new Vector(0,4)
console.log(vector.getLeftNormal(), vector.getRightNormal())

ReactDOM.render(
  <React.StrictMode>
    <EngineProvider engine={engine}>
      <Field />
    </EngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
