import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";
import MapContext from "../../context/map/mapContext";
import ModalContext from "../../context/modal/modalContext";

const WelcomeModal = () => {
  const gameContext = useContext(GameContext);
  const {
    score: { population, development, wealth },
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
        Population: {Math.ceil(population)} Development:
        {Math.ceil(development)}
        Wealth: {Math.ceil(wealth)}
      </p>
      <button onClick={handleClickYes}>Restart Game</button>
    </div>
  );
};

export default WelcomeModal;
