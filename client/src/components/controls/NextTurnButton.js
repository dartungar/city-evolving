import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";

const NextTurnButton = () => {
  const gameContext = useContext(GameContext);
  const { onChangeTurn, tiles, incrementTurnCounter } = gameContext;

  const style = {
    fontSize: "3rem",
    color: "royalblue",
    cursor: "pointer",
    margin: "1rem",
  };

  const handleClick = () => {
    onChangeTurn(tiles);
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
