import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";
import MapContext from "../../context/map/mapContext";
import ModalContext from "../../context/modal/modalContext";

const WelcomeModal = () => {
  const gameContext = useContext(GameContext);
  const {
    score: { population, materials, gold },
    restartGame,
    setStatusText,
  } = gameContext;

  const mapContext = useContext(MapContext);
  const { initMap } = mapContext;

  const modalContext = useContext(ModalContext);
  const { hideModal } = modalContext;

  const handleClickYes = () => {
    restartGame();
    initMap();
    hideModal();
  };

  return (
    <div>
      <h3>The Times Have Ended.</h3>
      <p>Your city has lived through ages, and now it is time to let it go.</p>
      <p>Your score is: </p>
      <p>
        Population: {Math.ceil(population)} Materials: {Math.ceil(materials)}
        Gold: {Math.ceil(gold)}
      </p>
      <button onClick={handleClickYes}>Restart Game</button>
    </div>
  );
};

export default WelcomeModal;
