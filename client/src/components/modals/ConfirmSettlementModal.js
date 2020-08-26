import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";
import MapContext from "../../context/map/mapContext";
import ModalContext from "../../context/modal/modalContext";

const ConfirmSettlementModal = () => {
  const gameContext = useContext(GameContext);
  const {
    updateGameScore,
    incrementTurnCounter,
    clearStatusText,
  } = gameContext;

  const mapContext = useContext(MapContext);
  const {
    tiles,
    targetTile,
    clearTargetTile,
    populateFirstTile,
    recalculateMap,
  } = mapContext;

  const modalContext = useContext(ModalContext);
  const { hideModal } = modalContext;

  const handleClickYes = () => {
    populateFirstTile(targetTile);
    hideModal();
    clearTargetTile();
    clearStatusText();
    recalculateMap(tiles);
    updateGameScore(tiles);
    incrementTurnCounter();
  };

  const handleClickNo = () => {
    hideModal();
    clearTargetTile();
  };

  return (
    <div>
      <h3>Settle in the {targetTile.terrain}?</h3>
      <button onClick={handleClickYes}>Yes</button>{" "}
      <button onClick={handleClickNo}>No</button>
    </div>
  );
};

export default ConfirmSettlementModal;
