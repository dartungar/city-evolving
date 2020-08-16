import React, { useContext } from "react";
import GameContext from "../../context/game/gameContext";

const NextTurnButton = () => {
  const gameContext = useContext(GameContext);
  const { recalculateField, tiles } = gameContext;

  const style = {
    fontSize: "3rem",
    color: "royalblue",
    cursor: "pointer",
  };
  return (
    <div style={style}>
      {" "}
      <a role="button" onClick={() => recalculateField(tiles)}>
        <i class="fas fa-arrow-alt-circle-right"></i>
      </a>
    </div>
  );
};

export default NextTurnButton;
