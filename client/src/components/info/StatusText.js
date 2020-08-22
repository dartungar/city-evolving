import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";

const StatusText = () => {
  const gameContext = useContext(GameContext);
  const { statusText } = gameContext;

  const style = {
    textAlign: "center",
  };

  return (
    <div style={style}>
      <p>{statusText}</p>
    </div>
  );
};

export default StatusText;
