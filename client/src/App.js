import React from "react";
import "./App.css";
import GameState from "./context/game/GameState";
import Field from "./components/field/Field";

function App() {
  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <GameState>
      <div style={containerStyle}>
        <Field />
      </div>
    </GameState>
  );
}

export default App;
