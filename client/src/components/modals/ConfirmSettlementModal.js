import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";
import ModalContext from "../../context/modal/modalContext";

const ConfirmSettlementModal = () => {
  const gameContext = useContext(GameContext);
  const {
    targetTile,
    clearTargetTile,
    populateFirstTile,
    onChangeTurn,
    tiles,
  } = gameContext;

  const modalContext = useContext(ModalContext);
  const { hideModal } = modalContext;

  const handleClickYes = () => {
    populateFirstTile(targetTile);
    hideModal();
    clearTargetTile();
    onChangeTurn(tiles);
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
