import React from "react";
import "./App.css";
import GameState from "./context/game/GameState";
import Field from "./components/field/Field";
import ControlPanel from "./components/controls/ControlPanel";

function App() {
  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <GameState>
      <div style={containerStyle}>
        <Field />
        <ControlPanel />
      </div>
    </GameState>
  );
}

export default App;
