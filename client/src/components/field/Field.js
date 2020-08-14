import React, { useEffect, useContext } from "react";
import GameContext from "../../context/game/gameContext";
import Tile from "../tile/Tile";

const Field = () => {
  const gameContext = useContext(GameContext);
  const { size, setSize, tiles, initTiles } = gameContext;

  useEffect(() => {
    if (size === null) {
      setSize(10);
    }

    if (size !== null && tiles.length === 0) {
      initTiles(size);
    }

    // eslint-disable-next-line
  }, [size, tiles]);

  const fieldStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${size}, 4rem)`,
    gridTemplateColumns: `repeat(${size}, 4rem)`,
    gridGap: "3px",
    justifyContent: "center",
    alignContent: "center",
  };

  return (
    <div style={fieldStyle}>
      {tiles && tiles.map((tile) => <Tile tile={tile} />)}
    </div>
  );
};

export default Field;
