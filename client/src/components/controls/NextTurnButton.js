import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";
import MapContext from "../../context/map/mapContext";

const NextTurnButton = () => {
  const gameContext = useContext(GameContext);
  const { updateGameScore, incrementTurnCounter } = gameContext;

  const mapContext = useContext(MapContext);
  const { tiles, recalculateMap, isFirstTileChosen } = mapContext;

  // update game state for next turn
  const handleClick = () => {
    recalculateMap(tiles);
    updateGameScore(tiles);
    incrementTurnCounter();
  };

  const buttonStyle = {
    fontSize: "3rem",
    color: isFirstTileChosen ? "royalblue" : "grey",
    cursor: "pointer",
    margin: "1rem",
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={!isFirstTileChosen}
        style={buttonStyle}
      >
        <i className="fas fa-arrow-alt-circle-right"></i>
      </button>
    </div>
  );
};

export default NextTurnButton;
