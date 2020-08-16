import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";

const TurnCounter = () => {
  const gameContext = useContext(GameContext);
  const { turns } = gameContext;

  return <div>Turns: {turns}</div>;
};

export default TurnCounter;
