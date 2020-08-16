import React from "react";
import TurnCounter from "./TurnCounter";
import ScoreCounter from "./ScoreCounter";

const ControlPanel = () => {
  const style = {
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
  };

  return (
    <div style={style}>
      <TurnCounter />
      <ScoreCounter />
    </div>
  );
};

export default ControlPanel;
