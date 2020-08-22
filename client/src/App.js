import React, { useContext } from "react";
import "./App.css";
import GameContainer from "./components/layout/GameContainer";
import GameState from "./context/game/GameState";
import MapState from "./context/map/MapState";
import ModalState from "./context/modal/ModalState";

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
        <MapState>
          <GameContainer />
        </MapState>
      </GameState>
    </ModalState>
  );
};

export default App;
