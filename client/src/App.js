import React, { useContext } from "react";
import "./App.css";
import GameState from "./context/game/GameState";
import MapState from "./context/map/MapState";
import ModalState from "./context/modal/ModalState";
import InfoPanel from "./components/info/InfoPanel";
import Map from "./components/map/Map";
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
        <MapState>
          <div style={containerStyle}>
            <InfoPanel />

            <Map />
            <ControlPanel />
          </div>
        </MapState>
      </GameState>
    </ModalState>
  );
};

export default App;
