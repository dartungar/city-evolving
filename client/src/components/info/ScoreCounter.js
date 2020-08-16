import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";

const ScoreCounter = () => {
  const gameContext = useContext(GameContext);
  const {
    score: { population, development, wealth },
  } = gameContext;

  const style = {
    padding: "1rem",
  };

  return (
    <div style={style}>
      Population: {population} Development: {development} Wealth: {wealth}
    </div>
  );
};

export default ScoreCounter;
