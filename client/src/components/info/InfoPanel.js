import React from "react";
import TurnCounter from "./TurnCounter";
import ScoreCounter from "./ScoreCounter";
import StatusText from "./StatusText";

const ControlPanel = () => {
  const countersStyle = {
    padding: "1rem 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
  };

  return (
    <div>
      <div style={countersStyle}>
        <TurnCounter />
        <ScoreCounter />
      </div>
      <StatusText />
    </div>
  );
};

export default ControlPanel;
