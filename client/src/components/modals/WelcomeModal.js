import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";
import MapContext from "../../context/map/mapContext";
import ModalContext from "../../context/modal/modalContext";

const WelcomeModal = () => {
  const gameContext = useContext(GameContext);
  const { startGame } = gameContext;

  const mapContext = useContext(MapContext);
  const { initMap } = mapContext;

  const modalContext = useContext(ModalContext);
  const { hideModal } = modalContext;

  const handleClickYes = () => {
    startGame();
    hideModal();
  };

  const handleClickNo = () => {
    initMap();
  };

  return (
    <div>
      <h3>Welcome to City Evolving!</h3>
      <p>
        In this game, you choose a place to settle, then help your city grow.
      </p>
      <button onClick={handleClickYes}>Start the game</button>{" "}
      <button onClick={handleClickNo}>Generate new map</button>
    </div>
  );
};

export default WelcomeModal;
