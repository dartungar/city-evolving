import React, { useContext } from "react";
import "./App.css";
import GameState from "./context/game/GameState";
import ModalState from "./context/modal/ModalState";
import InfoPanel from "./components/info/InfoPanel";
import Field from "./components/field/Field";
import ControlPanel from "./components/controls/ControlPanel";

const App = () => {
  const containerStyle = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <ModalState>
      <GameState>
        <div style={containerStyle}>
          <InfoPanel />

          <Field />
          <ControlPanel />
        </div>
      </GameState>
    </ModalState>
  );
};

export default App;
