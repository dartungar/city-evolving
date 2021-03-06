import React from "react";
import NextTurnButton from "./NextTurnButton";

const ControlPanel = () => {
  const style = {
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  };

  return (
    <div style={style}>
      <NextTurnButton />
    </div>
  );
};

export default ControlPanel;
