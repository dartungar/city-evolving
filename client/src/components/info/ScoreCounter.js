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
      Population: {Math.ceil(population)} Development: {Math.ceil(development)}{" "}
      Wealth: {Math.ceil(wealth)}
    </div>
  );
};

export default ScoreCounter;
