import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";
import MapContext from "../../context/map/mapContext";

const NextTurnButton = () => {
  const gameContext = useContext(GameContext);
  const { updateGameScore, incrementTurnCounter } = gameContext;

  const mapContext = useContext(MapContext);
  const { tiles, recalculateMap } = mapContext;

  const style = {
    fontSize: "3rem",
    color: "royalblue",
    cursor: "pointer",
    margin: "1rem",
  };

  const handleClick = () => {
    recalculateMap(tiles);
    updateGameScore(tiles);
    incrementTurnCounter();
  };

  return (
    <div style={style}>
      <a role="button" onClick={handleClick} href="#?">
        <i className="fas fa-arrow-alt-circle-right"></i>
      </a>
    </div>
  );
};

export default NextTurnButton;
