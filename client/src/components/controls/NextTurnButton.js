import React, { useContext, useEffect } from "react";
import GameContext from "../../context/game/gameContext";
import MapContext from "../../context/map/mapContext";

const NextTurnButton = () => {
  const gameContext = useContext(GameContext);
  const { updateGameScore, incrementTurnCounter, isGameActive } = gameContext;

  const mapContext = useContext(MapContext);
  const { tiles, recalculateMap, isFirstTileChosen } = mapContext;

  const handleClick = () => {
    nextTurn();
  };

  // update game state for next turn
  const nextTurn = () => {
    recalculateMap(tiles);
    updateGameScore(tiles);
    incrementTurnCounter();
  };

  const buttonStyle = {
    fontSize: "3rem",
    color: isGameActive ? "royalblue" : "grey",
    cursor: "pointer",
    margin: "1rem",
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={!isGameActive}
        style={buttonStyle}
      >
        <i className="fas fa-arrow-alt-circle-right"></i>
      </button>
    </div>
  );
};

export default NextTurnButton;
