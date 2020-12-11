import React, { FunctionComponent } from "react";
import { WellContainer } from "./Well/WellContainer";
import Wall from "./Well/Wall";

interface FieldProps {}

export const Field: FunctionComponent<FieldProps> = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "20px 1fr 20px",
        gridTemplateRows: "20px 1fr 20px ",
        height: "100vh",
        position: "relative"
      }}
    >
      <Wall />
      <Wall />
      <Wall />

      <Wall />
      <div style={{ display: "flex" }}>
        <WellContainer
          style={{ height: 100, width: 100, borderRadius: "50%" }}
        />
        <WellContainer style={{ height: 50, width: 50, borderRadius: "50%" }} />
        <Wall
          style={{
            position: "absolute",
            top: 300,
            left: -10,
            transform: "rotate(2deg)",
            width: 1000,
            height: 30
          }}
        />
        <Wall
          style={{
            position: "absolute",
            top: 500,
            right: -10,
            transform: "rotate(-5deg)",
            width: 1000,
            height: 30
          }}
        />
        <Wall
          style={{
            position: "absolute",
            top: 700,
            left: -10,
            transform: "rotate(2deg)",
            width: 1000,
            height: 30
          }}
        />
        <Wall
          style={{
            position: "absolute",
            top: 800,
            right: -10,
            transform: "rotate(-30deg)",
            width: 1000,
            height: 30
          }}
        />
      </div>
      <Wall />

      <Wall />
      <Wall />
      <Wall />
    </div>
  );
};
