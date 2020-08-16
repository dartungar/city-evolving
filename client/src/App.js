import React from "react";
import "./App.css";
import GameState from "./context/game/GameState";
import InfoPanel from "./components/info/InfoPanel";
import Field from "./components/field/Field";
import ControlPanel from "./components/controls/ControlPanel";

function App() {
  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <GameState>
      <div style={containerStyle}>
        <InfoPanel />
        <Field />
        <ControlPanel />
      </div>
    </GameState>
  );
}

export default App;
