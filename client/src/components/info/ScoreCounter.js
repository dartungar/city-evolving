import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";

const ScoreCounter = () => {
  const gameContext = useContext(GameContext);
  const {
    score: { population, materials, gold },
  } = gameContext;

  const style = {
    padding: "1rem",
  };

  return (
    <div style={style}>
      Population: {Math.ceil(population)} Materials: {Math.ceil(materials)}
      Gold: {Math.ceil(gold)}
    </div>
  );
};

export default ScoreCounter;
