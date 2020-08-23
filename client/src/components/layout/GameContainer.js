import React, { useContext, useEffect } from "react";
import InfoPanel from "../info/InfoPanel";
import CanvasMap from "../map/CanvasMap";
import ControlPanel from "../controls/ControlPanel";
import GameContext from "../../context/game/gameContext";
import Modal from "../modals/Modal";
import ModalContext from "../../context/modal/modalContext";

const GameContainer = () => {
  const modalContext = useContext(ModalContext);
  const { isShown, showModal } = modalContext;

  const gameContext = useContext(GameContext);
  const { isGameStarted, turns, maxTurns, endGame } = gameContext;

  useEffect(() => {
    if (!isGameStarted) {
      showModal("welcome");
    }
  }, []);

  useEffect(() => {
    if (turns > maxTurns) {
      showModal("endGame");
      endGame();
    }
  }, [turns]);

  const containerStyle = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <InfoPanel />
      {isShown && <Modal />}
      <CanvasMap />
      <ControlPanel />
    </div>
  );
};

export default GameContainer;
